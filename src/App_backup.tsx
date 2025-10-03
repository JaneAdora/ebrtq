import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ResourceLink } from "./components/ResourceLink";
import { Footer } from "./components/Footer";
import { RealContentEditor } from "./components/RealContentEditor";
import { 
  Heart, 
  Home, 
  Users, 
  Phone, 
  BookOpen, 
  Activity,
  Briefcase,
  GraduationCap,
  Shield,
  Mail,
  ChevronDown,
  ChevronUp,
  Calendar,
  Download
} from "lucide-react";
// Dynamic loading - no static import

// Page content animation
const pageAnimation = `
  @keyframes pageContentFadeIn {
    0% { 
      opacity: 0;
      transform: translateY(20px);
    }
    100% { 
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

type ViewMode = 'provider' | 'type';

interface Resource {
  id: string;
  title: string;
  url: string;
  provider: string;
  type: string;
  icon: any;
  color: 'blue' | 'pink' | 'white' | 'purple' | 'magenta' | 'cyan' | 'green';
  description?: string;
}

// Icon mapping for JSON string to React component
const iconMap = {
  Heart,
  Home,
  Users,
  Phone,
  BookOpen,
  Activity,
  Briefcase,
  GraduationCap,
  Shield
};

// Resources will be loaded dynamically

type EventsViewMode = 'month' | 'organization';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('provider');
  const [eventsViewMode, setEventsViewMode] = useState<EventsViewMode>('month');
  const [showAdmin, setShowAdmin] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [collapsedEventsSections, setCollapsedEventsSections] = useState<Set<string>>(new Set());
  const [expandedEventDetails, setExpandedEventDetails] = useState<Set<string>>(new Set());
  const [expandedResourceDetails, setExpandedResourceDetails] = useState<Set<string>>(new Set());
  
  // Check current route
  const currentPath = window.location.pathname;
  const isEventsPage = currentPath === '/events';
  
  // Toggle section collapse
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };
  
  // Toggle events section collapse
  const toggleEventsSection = (sectionId: string) => {
    setCollapsedEventsSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };
  
  // Toggle event details expansion
  const toggleEventDetails = (eventId: string) => {
    setExpandedEventDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  const toggleResourceDetails = (resourceId: string) => {
    setExpandedResourceDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  // Helper function to convert 12-hour time to 24-hour time
  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  // Generate calendar links
  const generateGoogleCalendarLink = (event: any) => {
    console.log('Generating Google Calendar link for:', event);
    try {
      // Parse time format like "6:00 PM - 8:00 PM"
      const timeParts = event.time.split(' - ');
      if (timeParts.length !== 2) {
        throw new Error('Invalid time format');
      }
      
      const startTime12h = timeParts[0].trim();
      const endTime12h = timeParts[1].trim();
      
      // Convert to 24-hour format
      const startTime24h = convertTo24Hour(startTime12h);
      const endTime24h = convertTo24Hour(endTime12h);
      
      // Parse date components
      const [year, month, day] = event.date.split('-');
      
      // Create proper UTC timestamps by adding 6 hours to Central time
      const formatDateForGoogle = (time24h: string) => {
        const [hours, minutes] = time24h.split(':');
        let utcHours = parseInt(hours) + 6; // Add 6 hours for Central to UTC
        let utcDay = parseInt(day);
        
        // Handle day overflow
        if (utcHours >= 24) {
          utcHours -= 24;
          utcDay += 1;
        }
        
        return `${year}${month}${String(utcDay).padStart(2, '0')}T${String(utcHours).padStart(2, '0')}${minutes}00Z`;
      };
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${formatDateForGoogle(startTime24h)}/${formatDateForGoogle(endTime24h)}`,
        details: event.description || '',
        location: event.location
      });
      
      return `https://calendar.google.com/calendar/render?${params}`;
    } catch (error) {
      console.error('Error generating Google Calendar link:', error);
      return '#';
    }
  };

  const generateICalLink = (event: any) => {
    try {
      // Parse time format like "6:00 PM - 8:00 PM"
      const timeParts = event.time.split(' - ');
      if (timeParts.length !== 2) {
        throw new Error('Invalid time format');
      }
      
      const startTime12h = timeParts[0].trim();
      const endTime12h = timeParts[1].trim();
      
      // Convert to 24-hour format
      const startTime24h = convertTo24Hour(startTime12h);
      const endTime24h = convertTo24Hour(endTime12h);
      
      // Parse date components
      const [year, month, day] = event.date.split('-');
      
      // Format dates for iCal (YYYYMMDDTHHMMSS) - local time format
      const formatDateForICal = (time24h: string) => {
        const [hours, minutes] = time24h.split(':');
        return `${year}${month}${day}T${hours}${minutes}00`;
      };
      
      // Get current timestamp for DTSTAMP
      const now = new Date();
      const nowFormatted = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      
      const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EBRTQ//Event//EN
BEGIN:VEVENT
UID:${event.id}@ebrtq.com
DTSTAMP:${nowFormatted}
DTSTART:${formatDateForICal(startTime24h)}
DTEND:${formatDateForICal(endTime24h)}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([ical], { type: 'text/calendar' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating iCal link:', error);
      return '#';
    }
  };
  
  // Load resources dynamically
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/src/data/resources.json?v=${Date.now()}`);
        if (!response.ok) {
          throw new Error('Failed to load resources');
        }
        const data = await response.json();
        
        // Map icons and set resources
        const mappedResources: Resource[] = data.resources.map((resource: any) => ({
          ...resource,
          icon: iconMap[resource.icon as keyof typeof iconMap] || Users
        }));
        
        console.log('Loaded resources:', mappedResources);
        console.log('First resource description:', mappedResources[0]?.description);
        
        setResources(mappedResources);
        setError(null);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Check if we're in admin mode via URL hash
  const isAdminMode = window.location.hash === '#admin' || showAdmin;
  
  // Sample events data - this could be loaded from a separate JSON file later
  const events = [
    {
      id: "1",
      title: "Community Gathering",
      date: "2025-10-14",
      time: "6:00 PM - 8:00 PM",
      location: "EBRTQ Community Center",
      description: "Monthly community gathering for support and connection. This event brings together members of the LGBTQ+ community for networking, resource sharing, and mutual support. We'll have refreshments, activities, and opportunities to connect with local organizations and service providers.",
      type: "Community",
      organization: "EBRTQ",
      color: "pink",
      url: "https://www.ebrtq.com/community-gathering"
    },
    {
      id: "2", 
      title: "Workshop: Health Resources",
      date: "2025-11-02",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      type: "Educational",
      organization: "Louisiana Trans Advocates",
      color: "cyan",
      url: "https://www.latransadvocates.org/health-workshop"
    },
    {
      id: "3",
      title: "Support Group Meeting",
      date: "2025-10-21",
      time: "7:00 PM - 9:00 PM",
      location: "Community Center",
      description: "Weekly support group for trans and queer individuals. This safe space provides peer support, discussion of current events affecting our community, and sharing of personal experiences. All identities and experiences are welcome. Confidentiality is maintained, and refreshments are provided.",
      type: "Support",
      organization: "Louisiana Trans Advocates",
      color: "purple",
      url: "https://www.latransadvocates.org/support-group"
    },
    {
      id: "4",
      title: "Pride Planning Committee",
      date: "2025-11-15",
      time: "6:30 PM - 8:30 PM",
      location: "EBRTQ Office",
      type: "Planning",
      organization: "EBRTQ",
      color: "green",
      url: "https://www.ebrtq.com/pride-planning"
    }
  ];
  
  // Group resources by provider
  const byProvider = resources.reduce((acc, resource) => {
    if (!acc[resource.provider]) {
      acc[resource.provider] = [];
    }
    acc[resource.provider].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);
  
  // Group resources by type
  const byType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);
  
  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthKey = `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getFullYear()}`;
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);
  
  // Group events by organization
  const eventsByOrganization = events.reduce((acc, event) => {
    if (!acc[event.organization]) {
      acc[event.organization] = [];
    }
    acc[event.organization].push(event);
    return acc;
  }, {} as Record<string, typeof events>);
  
  // Show admin interface if in admin mode
  if (isAdminMode) {
    return <RealContentEditor />;
  }
  
  // Show events page if on /events route
  if (isEventsPage) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center px-4 py-8"
        style={{
          background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1f3d 25%, #1f2937 50%, #1e3a5f 75%, #1e1e2e 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pageContentFadeIn {
            0% { 
              opacity: 0;
              transform: translateY(20px);
            }
            100% { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div className="w-full max-w-2xl">
          <style>{pageAnimation}</style>
          <Header />
          
          {/* Events View Toggle */}
          <div 
            className="flex gap-4 mb-8 justify-center"
            style={{
              animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
            }}
          >
            <button
              onClick={() => setEventsViewMode('month')}
              className={`px-6 py-3 border-4 transition-all duration-300 ${
                eventsViewMode === 'month' ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-110'
              }`}
              style={{
                borderColor: eventsViewMode === 'month' ? '#00F5FF' : 'rgba(0, 245, 255, 0.3)',
                boxShadow: eventsViewMode === 'month' ? '4px 4px 0 0 #00F5FF, 0 0 25px rgba(0, 245, 255, 0.6)' : 'none',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                letterSpacing: '0.1em',
                imageRendering: 'pixelated',
                backgroundColor: 'rgba(42, 45, 58, 0.7)',
                backdropFilter: 'blur(10px)',
                cursor: eventsViewMode === 'month' ? 'default' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (eventsViewMode !== 'month') {
                  e.currentTarget.style.borderColor = '#00F5FF';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
                  e.currentTarget.style.color = '#00F5FF';
                }
              }}
              onMouseLeave={(e) => {
                if (eventsViewMode !== 'month') {
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.color = '';
                }
              }}
            >
              BY MONTH
            </button>
            
            <button
              onClick={() => setEventsViewMode('organization')}
              className={`px-6 py-3 border-4 transition-all duration-300 ${
                eventsViewMode === 'organization' ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-110'
              }`}
              style={{
                borderColor: eventsViewMode === 'organization' ? '#FF69B4' : 'rgba(255, 105, 180, 0.3)',
                boxShadow: eventsViewMode === 'organization' ? '4px 4px 0 0 #FF69B4, 0 0 25px rgba(255, 105, 180, 0.6)' : 'none',
                fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
                letterSpacing: '0.1em',
                imageRendering: 'pixelated',
                backgroundColor: 'rgba(42, 45, 58, 0.7)',
                backdropFilter: 'blur(10px)',
                cursor: eventsViewMode === 'organization' ? 'default' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (eventsViewMode !== 'organization') {
                  e.currentTarget.style.borderColor = '#FF69B4';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.5)';
                  e.currentTarget.style.color = '#FF69B4';
                }
              }}
              onMouseLeave={(e) => {
                if (eventsViewMode !== 'organization') {
                  e.currentTarget.style.borderColor = 'rgba(255, 105, 180, 0.3)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.color = '';
                }
              }}
            >
              BY ORGANIZATION
            </button>
          </div>
          
          {/* Events Display */}
          <div 
            className="space-y-8"
            style={{
              animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
            }}
          >
            {eventsViewMode === 'month' ? (
              Object.entries(eventsByMonth).map(([month, monthEvents]) => {
                const sectionId = `month-${month}`;
                const isCollapsed = collapsedEventsSections.has(sectionId);
                
                return (
                  <div key={month}>
                    <h2 
                      className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                      onClick={() => toggleEventsSection(sectionId)}
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: '1.75rem',
                        letterSpacing: '0.15em',
                        borderColor: '#00F5FF',
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(0, 245, 255, 0.8)',
                        cursor: 'pointer'
                      }}
                    >
                      <span 
                        style={{ 
                          color: '#00F5FF',
                          transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                          display: 'inline-block',
                          transition: 'transform 0.3s ease',
                          fontSize: '1.5em',
                          marginRight: '0.5em'
                        }}
                      >
                        ▸
                      </span> {month}
                    </h2>
                    {!isCollapsed && (
                      <div className="space-y-3 mt-3">
                        {monthEvents.map((event) => {
                          const date = new Date(event.date);
                          const day = date.getDate();
                          const monthAbbr = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                          
                          return (
                            <div 
                              key={event.id}
                              className="border-4 p-4 rounded-lg transition-all duration-300 hover:scale-105"
                              style={{
                                borderColor: event.color === 'pink' ? '#F5A9B8' : 
                                            event.color === 'cyan' ? '#5BCEFA' :
                                            event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                backgroundColor: event.color === 'pink' ? 'rgba(245, 169, 184, 0.1)' : 
                                              event.color === 'cyan' ? 'rgba(91, 206, 250, 0.1)' :
                                              event.color === 'purple' ? 'rgba(187, 134, 252, 0.1)' : 'rgba(57, 255, 20, 0.1)',
                                backdropFilter: 'blur(10px)'
                              }}
                            >
                              <div className="flex items-start gap-4">
                                <a 
                                  href={event.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-20 border-4 rounded-lg flex flex-col items-start justify-start px-4 cursor-pointer transition-all duration-200 hover:scale-105 flex-shrink-0 pt-0"
                                  style={{
                                    height: '50px',
                                    borderColor: event.color === 'pink' ? '#F5A9B8' : 
                                                event.color === 'cyan' ? '#5BCEFA' :
                                                event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                    backgroundColor: event.color === 'pink' ? 'rgba(245, 169, 184, 0.2)' : 
                                                  event.color === 'cyan' ? 'rgba(91, 206, 250, 0.2)' :
                                                  event.color === 'purple' ? 'rgba(187, 134, 252, 0.2)' : 'rgba(57, 255, 20, 0.2)'
                                  }}
                                >
                                  <span 
                                    className="text-white font-bold text-lg"
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace"
                                    }}
                                  >
                                    {day}
                                  </span>
                                  <span 
                                    className="text-xs"
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace",
                                      color: event.color === 'pink' ? '#F5A9B8' : 
                                             event.color === 'cyan' ? '#5BCEFA' :
                                             event.color === 'purple' ? '#BB86FC' : '#39FF14'
                                    }}
                                  >
                                    {monthAbbr}
                                  </span>
                                </a>
                                <div className="flex-1">
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <h3 
                                      className="text-2xl font-bold mb-2 cursor-pointer transition-colors hover:text-gray-200"
                                      style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: '#FFFFFF',
                                        textShadow: event.color === 'pink' ? '0 0 10px rgba(245, 169, 184, 0.6)' : 
                                                  event.color === 'cyan' ? '0 0 10px rgba(91, 206, 250, 0.6)' :
                                                  event.color === 'purple' ? '0 0 10px rgba(187, 134, 252, 0.6)' : '0 0 10px rgba(57, 255, 20, 0.6)'
                                      }}
                                    >
                                      {event.title}
                                    </h3>
                                  </a>
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <p className="text-gray-300 text-sm mb-1 cursor-pointer transition-colors hover:text-white">{event.time}</p>
                                  </a>
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <p className="text-gray-400 text-sm mb-2 cursor-pointer transition-colors hover:text-gray-200">{event.location}</p>
                                  </a>
                                  
                                  {/* Event Description */}
                                  <div 
                                    className="text-gray-300 text-sm transition-colors hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleEventDetails(event.id);
                                    }}
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace",
                                      lineHeight: '1.4',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {(() => {
                                      const isExpanded = expandedEventDetails.has(event.id);
                                      const description = event.description || '';
                                      const truncated = description.length > 140 ? description.substring(0, 140) + '...' : description;
                                      
                                      return (
                                        <>
                                          <span>{isExpanded ? description : truncated}</span>
                                          {description.length > 140 && (
                     <span 
                       className="ml-1 font-bold"
                       style={{
                         color: event.color === 'pink' ? '#F5A9B8' : 
                                event.color === 'cyan' ? '#5BCEFA' :
                                event.color === 'purple' ? '#BB86FC' : '#39FF14'
                       }}
                     >
                                              {isExpanded ? 'Show less' : 'Read more'}
                                            </span>
                                          )}
                                        </>
                                      );
                                    })()}
                                  </div>
                                  
                                  {/* Calendar Links - always show */}
                                  <div className="flex justify-start gap-3 mt-3">
                                    <a
                                      href={generateGoogleCalendarLink(event)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                                      style={{
                                        color: event.color === 'pink' ? '#F5A9B8' : 
                                               event.color === 'cyan' ? '#5BCEFA' :
                                               event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                        fontFamily: "'JetBrains Mono', monospace"
                                      }}
                                    >
                                      <Calendar className="w-4 h-4" />
                                      Google
                                    </a>
                                    <a
                                      href={generateICalLink(event)}
                                      download={`${event.title}.ics`}
                                      className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                                      style={{
                                        color: event.color === 'pink' ? '#F5A9B8' : 
                                               event.color === 'cyan' ? '#5BCEFA' :
                                               event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                        fontFamily: "'JetBrains Mono', monospace"
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                      iCal
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              Object.entries(eventsByOrganization).map(([organization, orgEvents]) => {
                const sectionId = `org-${organization}`;
                const isCollapsed = collapsedEventsSections.has(sectionId);
                
                return (
                  <div key={organization}>
                    <h2 
                      className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                      onClick={() => toggleEventsSection(sectionId)}
                      style={{
                        fontFamily: "'Orbitron', monospace",
                        fontSize: '1.75rem',
                        letterSpacing: '0.15em',
                        borderColor: '#FF69B4',
                        color: '#FFFFFF',
                        textShadow: '0 0 20px rgba(255, 105, 180, 0.9)',
                        cursor: 'pointer'
                      }}
                    >
                      <span 
                        style={{ 
                          color: '#FF69B4',
                          transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                          display: 'inline-block',
                          transition: 'transform 0.3s ease',
                          fontSize: '1.5em',
                          marginRight: '0.5em'
                        }}
                      >
                        ▸
                      </span> {organization}
                    </h2>
                    {!isCollapsed && (
                      <div className="space-y-3 mt-3">
                        {orgEvents.map((event) => {
                          const date = new Date(event.date);
                          const day = date.getDate();
                          const monthAbbr = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                          
                          return (
                            <div 
                              key={event.id}
                              className="border-4 p-4 rounded-lg transition-all duration-300 hover:scale-105"
                              style={{
                                borderColor: event.color === 'pink' ? '#F5A9B8' : 
                                            event.color === 'cyan' ? '#5BCEFA' :
                                            event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                backgroundColor: event.color === 'pink' ? 'rgba(245, 169, 184, 0.1)' : 
                                              event.color === 'cyan' ? 'rgba(91, 206, 250, 0.1)' :
                                              event.color === 'purple' ? 'rgba(187, 134, 252, 0.1)' : 'rgba(57, 255, 20, 0.1)',
                                backdropFilter: 'blur(10px)'
                              }}
                            >
                              <div className="flex items-start gap-4">
                                <a 
                                  href={event.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-20 border-4 rounded-lg flex flex-col items-start justify-start px-4 cursor-pointer transition-all duration-200 hover:scale-105 flex-shrink-0 pt-0"
                                  style={{
                                    height: '50px',
                                    borderColor: event.color === 'pink' ? '#F5A9B8' : 
                                                event.color === 'cyan' ? '#5BCEFA' :
                                                event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                    backgroundColor: event.color === 'pink' ? 'rgba(245, 169, 184, 0.2)' : 
                                                  event.color === 'cyan' ? 'rgba(91, 206, 250, 0.2)' :
                                                  event.color === 'purple' ? 'rgba(187, 134, 252, 0.2)' : 'rgba(57, 255, 20, 0.2)'
                                  }}
                                >
                                  <span 
                                    className="text-white font-bold text-lg"
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace"
                                    }}
                                  >
                                    {day}
                                  </span>
                                  <span 
                                    className="text-xs"
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace",
                                      color: event.color === 'pink' ? '#F5A9B8' : 
                                             event.color === 'cyan' ? '#5BCEFA' :
                                             event.color === 'purple' ? '#BB86FC' : '#39FF14'
                                    }}
                                  >
                                    {monthAbbr}
                                  </span>
                                </a>
                                <div className="flex-1">
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <h3 
                                      className="text-2xl font-bold mb-2 cursor-pointer transition-colors hover:text-gray-200"
                                      style={{
                                        fontFamily: "'JetBrains Mono', monospace",
                                        color: '#FFFFFF',
                                        textShadow: event.color === 'pink' ? '0 0 10px rgba(245, 169, 184, 0.6)' : 
                                                  event.color === 'cyan' ? '0 0 10px rgba(91, 206, 250, 0.6)' :
                                                  event.color === 'purple' ? '0 0 10px rgba(187, 134, 252, 0.6)' : '0 0 10px rgba(57, 255, 20, 0.6)'
                                      }}
                                    >
                                      {event.title}
                                    </h3>
                                  </a>
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <p className="text-gray-300 text-sm mb-1 cursor-pointer transition-colors hover:text-white">{event.time}</p>
                                  </a>
                                  <a 
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <p className="text-gray-400 text-sm mb-2 cursor-pointer transition-colors hover:text-gray-200">{event.location}</p>
                                  </a>
                                  
                                  {/* Event Description */}
                                  <div 
                                    className="text-gray-300 text-sm transition-colors hover:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleEventDetails(event.id);
                                    }}
                                    style={{
                                      fontFamily: "'JetBrains Mono', monospace",
                                      lineHeight: '1.4',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    {(() => {
                                      const isExpanded = expandedEventDetails.has(event.id);
                                      const description = event.description || '';
                                      const truncated = description.length > 140 ? description.substring(0, 140) + '...' : description;
                                      
                                      return (
                                        <>
                                          <span>{isExpanded ? description : truncated}</span>
                                          {description.length > 140 && (
                     <span 
                       className="ml-1 font-bold"
                       style={{
                         color: event.color === 'pink' ? '#F5A9B8' : 
                                event.color === 'cyan' ? '#5BCEFA' :
                                event.color === 'purple' ? '#BB86FC' : '#39FF14'
                       }}
                     >
                                              {isExpanded ? 'Show less' : 'Read more'}
                                            </span>
                                          )}
                                        </>
                                      );
                                    })()}
                                  </div>
                                  
                                  {/* Calendar Links - always show */}
                                  <div className="flex justify-start gap-3 mt-3">
                                    <a
                                      href={generateGoogleCalendarLink(event)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                                      style={{
                                        color: event.color === 'pink' ? '#F5A9B8' : 
                                               event.color === 'cyan' ? '#5BCEFA' :
                                               event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                        fontFamily: "'JetBrains Mono', monospace"
                                      }}
                                    >
                                      <Calendar className="w-4 h-4" />
                                      Google
                                    </a>
                                    <a
                                      href={generateICalLink(event)}
                                      download={`${event.title}.ics`}
                                      className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                                      style={{
                                        color: event.color === 'pink' ? '#F5A9B8' : 
                                               event.color === 'cyan' ? '#5BCEFA' :
                                               event.color === 'purple' ? '#BB86FC' : '#39FF14',
                                        fontFamily: "'JetBrains Mono', monospace"
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                      iCal
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          <div
            style={{
              animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
            }}
          >
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Resources...</h2>
          <p className="text-gray-600">Please wait while we load the latest resources.</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load Resources</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center px-4 py-8"
      style={{
        background: 'linear-gradient(135deg, #1e1e2e 0%, #2a1f3d 25%, #1f2937 50%, #1e3a5f 75%, #1e1e2e 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite'
      }}
    >
          <style>{`
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              25% { background-position: 100% 50%; }
              50% { background-position: 100% 100%; }
              75% { background-position: 0% 100%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes glowPulse {
              0% { text-shadow: 0 0 20px rgba(245, 169, 184, 0.8), 0 0 30px rgba(187, 134, 252, 0.6); }
              50% { text-shadow: 0 0 30px rgba(245, 169, 184, 1), 0 0 40px rgba(187, 134, 252, 0.8), 0 0 50px rgba(91, 206, 250, 0.6); }
              100% { text-shadow: 0 0 20px rgba(245, 169, 184, 0.8), 0 0 30px rgba(187, 134, 252, 0.6); }
            }
          `}</style>
      <div className="w-full max-w-2xl">
        <style>{pageAnimation}</style>
        <Header />
        
        
        {/* View Toggle */}
        <div 
          className="flex gap-4 mb-8 justify-center"
          style={{
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
          }}
        >
          <button
            onClick={() => setViewMode('provider')}
            className={`px-6 py-3 border-4 transition-all duration-300 ${
              viewMode === 'provider' ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-110'
            }`}
            style={{
              borderColor: viewMode === 'provider' ? '#00F5FF' : 'rgba(0, 245, 255, 0.3)',
              boxShadow: viewMode === 'provider' ? '4px 4px 0 0 #00F5FF, 0 0 25px rgba(0, 245, 255, 0.6)' : 'none',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              letterSpacing: '0.1em',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(42, 45, 58, 0.7)',
              backdropFilter: 'blur(10px)',
              cursor: viewMode === 'provider' ? 'default' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'provider') {
                e.currentTarget.style.borderColor = '#00F5FF';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
                e.currentTarget.style.color = '#00F5FF';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'provider') {
                e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '';
              }
            }}
          >
            BY PROVIDER
          </button>
          
          <button
            onClick={() => setViewMode('type')}
            className={`px-6 py-3 border-4 transition-all duration-300 ${
              viewMode === 'type' ? 'scale-105' : 'opacity-60 hover:opacity-100 hover:scale-110'
            }`}
            style={{
              borderColor: viewMode === 'type' ? '#FF69B4' : 'rgba(255, 105, 180, 0.3)',
              boxShadow: viewMode === 'type' ? '4px 4px 0 0 #FF69B4, 0 0 25px rgba(255, 105, 180, 0.6)' : 'none',
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              letterSpacing: '0.1em',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(42, 45, 58, 0.7)',
              backdropFilter: 'blur(10px)',
              cursor: viewMode === 'type' ? 'default' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (viewMode !== 'type') {
                e.currentTarget.style.borderColor = '#FF69B4';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.5)';
                e.currentTarget.style.color = '#FF69B4';
              }
            }}
            onMouseLeave={(e) => {
              if (viewMode !== 'type') {
                e.currentTarget.style.borderColor = 'rgba(255, 105, 180, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.color = '';
              }
            }}
          >
            BY RESOURCE
          </button>
        </div>
        
        {/* Resources Display */}
        <div 
          className="space-y-8"
          style={{
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
          }}
        >
          {viewMode === 'provider' ? (
            Object.entries(byProvider).map(([provider, providerResources]) => {
              const sectionId = `provider-${provider}`;
              const isCollapsed = collapsedSections.has(sectionId);
              
              return (
                <div key={provider}>
                  <h2 
                    className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                    onClick={() => toggleSection(sectionId)}
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '1.75rem',
                      letterSpacing: '0.15em',
                      borderColor: '#BB86FC',
                      color: '#FFFFFF',
                      textShadow: '0 0 20px rgba(187, 134, 252, 0.8)',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        color: '#BB86FC',
                        transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                        display: 'inline-block',
                        transition: 'transform 0.3s ease',
                        fontSize: '1.5em',
                        marginRight: '0.5em'
                      }}
                    >
                      ▸
                    </span> {provider}
                  </h2>
                  {!isCollapsed && (
                    <div className="space-y-3 mt-3">
                      {(providerResources as Resource[]).map((resource) => (
                        <ResourceLink
                          key={resource.id}
                          title={resource.title}
                          url={resource.url}
                          icon={resource.icon}
                          color={resource.color}
                          description={resource.description}
                          isExpanded={expandedResourceDetails.has(resource.id)}
                          onToggleDetails={() => toggleResourceDetails(resource.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            Object.entries(byType).map(([type, typeResources]) => {
              const sectionId = `type-${type}`;
              const isCollapsed = collapsedSections.has(sectionId);
              
              return (
                <div key={type}>
                  <h2 
                    className="mb-4 pb-2 border-b-4 cursor-pointer transition-all duration-300 hover:opacity-80"
                    onClick={() => toggleSection(sectionId)}
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '1.75rem',
                      letterSpacing: '0.15em',
                      borderColor: '#FF69B4',
                      color: '#FFFFFF',
                      textShadow: '0 0 20px rgba(255, 105, 180, 0.9)',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{ 
                        color: '#FF69B4',
                        transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                        display: 'inline-block',
                        transition: 'transform 0.3s ease',
                        fontSize: '1.5em',
                        marginRight: '0.5em'
                      }}
                    >
                      ▸
                    </span> {type}
                  </h2>
                  {!isCollapsed && (
                    <div className="space-y-3 mt-3">
                      {(typeResources as Resource[]).map((resource) => (
                        <ResourceLink
                          key={resource.id}
                          title={resource.title}
                          url={resource.url}
                          icon={resource.icon}
                          color={resource.color}
                          description={resource.description}
                          isExpanded={expandedResourceDetails.has(resource.id)}
                          onToggleDetails={() => toggleResourceDetails(resource.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        
        {/* Resource Suggestion Button */}
        <div 
          className="text-center mb-8 mt-12 px-4"
          style={{
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
          }}
        >
          <a 
            href="mailto:jane@repcap.com,cassiegresham97@gmail.com?subject=Resource Suggestion for EBRTQ&body=Hi! I know of a resource that should be added to EBRTQ..."
            className="inline-block transition-all duration-300 ease-in-out hover:scale-105 text-xs sm:text-sm relative spark-container"
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
              color: '#5BCEFA',
              textDecoration: 'underline',
              fontWeight: '500',
              lineHeight: '1.4',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'center',
              textUnderlineOffset: '4px',
              textDecorationThickness: '2px',
              background: 'linear-gradient(45deg, #5BCEFA, #F5A9B8, #BB86FC, #5BCEFA)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 3s ease-in-out infinite',
              textShadow: '0 0 10px rgba(91, 206, 250, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animation = 'gradientShift 0.8s ease-in-out infinite, glowPulse 0.6s ease-in-out infinite';
              e.currentTarget.style.textDecorationThickness = '3px';
              e.currentTarget.style.textShadow = '0 0 20px rgba(245, 169, 184, 0.8), 0 0 30px rgba(187, 134, 252, 0.6)';
              e.currentTarget.style.transform = 'scale(1.05)';
              
              // Update icon color and glow on hover
              const mailIcon = e.currentTarget.querySelector('svg');
              if (mailIcon) {
                mailIcon.style.color = '#F5A9B8';
                mailIcon.style.filter = 'drop-shadow(0 0 8px rgba(245, 169, 184, 0.8))';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animation = 'gradientShift 3s ease-in-out infinite';
              e.currentTarget.style.textDecorationThickness = '2px';
              e.currentTarget.style.textShadow = '0 0 10px rgba(91, 206, 250, 0.5)';
              e.currentTarget.style.transform = 'scale(1)';
              
              // Reset icon color and glow
              const mailIcon = e.currentTarget.querySelector('svg');
              if (mailIcon) {
                mailIcon.style.color = '#5BCEFA';
                mailIcon.style.filter = 'drop-shadow(0 0 3px rgba(91, 206, 250, 0.5))';
              }
            }}
          >
            Know a resource we should add?<br />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', lineHeight: '1.2' }}>
              <Mail 
                size={14} 
                style={{ 
                  display: 'inline-block',
                  color: '#5BCEFA',
                  filter: 'drop-shadow(0 0 3px rgba(91, 206, 250, 0.5))',
                  transition: 'color 0.3s ease, filter 0.3s ease'
                }} 
              />
              Message us!
            </span>
          </a>
        </div>
        
        <div
          style={{
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
