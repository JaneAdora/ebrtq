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
  
  // Check current route and manage page state
  const currentPath = window.location.pathname;
  const isDemo = currentPath === '/demo';
  const [currentPage, setCurrentPage] = useState<'resources' | 'events'>(
    currentPath === '/events' ? 'events' : 'resources'
  );
  
  // Handle page navigation
  const handlePageChange = (page: 'resources' | 'events') => {
    setCurrentPage(page);
    if (page === 'events') {
      window.history.pushState({}, '', '/events');
    } else {
      window.history.pushState({}, '', '/');
    }
  };
  
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
    console.log('🔍 DEBUG: Generating Google Calendar link for:', event.title);
    console.log('📅 Original Event Data:', {
      date: event.date,
      time: event.time
    });
    
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
      
      console.log('🕐 24-Hour Format:', {
        startTime24h,
        endTime24h
      });
      
      // Parse date components
      const [year, month, day] = event.date.split('-');
      
      console.log('📆 Date Components:', {
        year,
        month,
        day,
        originalDate: event.date
      });
      
      // Format dates for Google Calendar - use local time with ctz parameter
      const formatDateForGoogle = (time24h: string, timeLabel: string) => {
        const [hours, minutes] = time24h.split(':');
        const result = `${year}${month}${day}T${hours}${minutes}00`;
        
        console.log(`✅ ${timeLabel} Final Result (Local Time):`, result);
        
        return result;
      };
      
      const startDateFormatted = formatDateForGoogle(startTime24h, 'START');
      const endDateFormatted = formatDateForGoogle(endTime24h, 'END');
      
      console.log('📋 Final Formatted Dates (Local Time):', {
        startDateFormatted,
        endDateFormatted
      });
      
      const datesParam = `${startDateFormatted}/${endDateFormatted}`;
      console.log('🔗 Dates Parameter:', datesParam);
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: datesParam,
        details: event.description || '',
        location: event.location,
        ctz: 'America/Chicago' // Tell Google Calendar this is Central time
      });
      
      const finalUrl = `https://calendar.google.com/calendar/render?${params}`;
      console.log('🌐 Final Google Calendar URL:', finalUrl);
      
      return finalUrl;
    } catch (error) {
      console.error('❌ Error generating Google Calendar link:', error);
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
    // Inject noindex for /demo but DO NOT return early (so resources still load)
    let meta: HTMLMetaElement | null = null;
    if (isDemo) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    const loadResources = async () => {
      setIsLoading(true);

      const mapResources = (data: any): Resource[] =>
        (data?.resources || []).map((resource: any) => ({
          ...resource,
          icon: iconMap[resource.icon as keyof typeof iconMap] || Users
        }));

      const fetchLocal = async () => {
        const response = await fetch(`/src/data/resources.json?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Local resources.json fetch failed: ${response.status}`);
        const data = await response.json();
        return mapResources(data);
      };

      const fetchFromGithubRaw = async () => {
        const url = `https://raw.githubusercontent.com/JaneAdora/ebrtq/main/src/data/resources.json?v=${Date.now()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`GitHub raw fetch failed: ${response.status}`);
        const data = await response.json();
        return mapResources(data);
      };

      try {
        // Try local first (served by Vercel). Some preview setups may return 401; fallback to GitHub raw.
        const mappedResources = await fetchLocal().catch(async (localError) => {
          console.warn('Local fetch failed, falling back to GitHub raw:', localError);
          return await fetchFromGithubRaw();
        });

        setResources(mappedResources);
        setError(null);
      } catch (err) {
        console.error('Error loading resources (after fallback):', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();

    return () => {
      if (meta) {
        document.head.removeChild(meta);
      }
    };
  }, []);

  // Check if we're in admin mode via URL hash
  const isAdminMode = window.location.hash === '#admin' || showAdmin;
  
  // Events data
  const events = [
    {
      id: "1",
      title: "QUUeer Fête Music Festival 2025",
      date: "2025-10-04",
      time: "4:30 PM - 8:30 PM",
      location: "Unitarian Church of Baton Rouge",
      description: "Join us at the Unitarian Church of Baton Rouge for the 2nd Annual QUUeer Fête Music Festival celebrating queer advocacy, liberation, and social justice. We are amplifying queer voices and fostering allyship for the entire community. Enjoy music, food, and community with us. Come one, come ALL to QUUeer Fête 2025! Featuring Crys Matthews, Gais Do Do Band, drag entertainment, spoken word, and the Queer-ish Choir.",
      type: "Arts & Culture",
      organization: "Unitarian Church of Baton Rouge",
      color: "magenta",
      url: "https://www.eventbrite.com/e/quueer-fete-music-festival-2025-tickets-1444319551659"
    }
  ];
  
  // Group resources by provider and sort alphabetically
  const byProvider = resources.reduce((acc, resource) => {
    if (!acc[resource.provider]) {
      acc[resource.provider] = [];
    }
    acc[resource.provider].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  // Sort resources within each provider alphabetically by title
  Object.keys(byProvider).forEach(provider => {
    byProvider[provider].sort((a, b) => a.title.localeCompare(b.title));
  });
  
  // Group resources by type and sort alphabetically
  const byType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  // Sort resources within each type alphabetically by title
  Object.keys(byType).forEach(type => {
    byType[type].sort((a, b) => a.title.localeCompare(b.title));
  });
  
  // Group events by month and sort by date
  const eventsByMonth = events.reduce((acc, event) => {
    // Parse date string directly to avoid timezone issues
    const [year, month] = event.date.split('-');
    const monthKey = `${new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { month: 'short' })} ${year}`;
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Sort events within each month by date (chronological order - oldest first)
  Object.keys(eventsByMonth).forEach(monthKey => {
    eventsByMonth[monthKey].sort((a, b) => {
      // Parse dates directly to avoid timezone issues
      const dateA = a.date.split('-').join('');
      const dateB = b.date.split('-').join('');
      return dateA.localeCompare(dateB); // Chronological order (ascending order)
    });
  });
  
  // Group events by organization and sort by date
  const eventsByOrganization = events.reduce((acc, event) => {
    if (!acc[event.organization]) {
      acc[event.organization] = [];
    }
    acc[event.organization].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Sort events within each organization by date (chronological order - oldest first)
  Object.keys(eventsByOrganization).forEach(organization => {
    eventsByOrganization[organization].sort((a, b) => {
      // Parse dates directly to avoid timezone issues
      const dateA = a.date.split('-').join('');
      const dateB = b.date.split('-').join('');
      return dateA.localeCompare(dateB); // Chronological order (ascending order)
    });
  });
  
  // Show admin interface if in admin mode
  if (isAdminMode) {
    return <RealContentEditor />;
  }
  
  // Show events page if current page is events
  if (currentPage === 'events') {
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
        <Header 
          siteSettings={isDemo ? { h1: 'demo' } : undefined}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        
        {/* Glowing Divider Line - Interactive Easter Egg */}
        <div 
          style={{
            width: '50%',
            height: '2px',
            margin: '0 auto 32px auto',
            background: 'linear-gradient(90deg, transparent 0%, #00F5FF 50%, transparent 100%)',
            boxShadow: '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)',
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'true';
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                
                h1.style.transition = 'none';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }
          }}
          onMouseLeave={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                
                // Get current animation to determine direction
                const currentAnimation = logo.style.animation;
                let stopAnimation = 'spinToStopClockwise 1.5s ease-out forwards';
                
                if (currentAnimation.includes('CounterClockwise')) {
                  stopAnimation = 'spinToStopCounterClockwise 1.5s ease-out forwards';
                }
                
                // Set current rotation for smooth continuation
                const computedStyle = window.getComputedStyle(logo);
                const matrix = computedStyle.transform;
                if (matrix && matrix !== 'none') {
                  const values = matrix.split('(')[1].split(')')[0].split(',');
                  const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
                  logo.style.setProperty('--current-rotation', `${angle}deg`);
                }
                
                logo.style.animation = stopAnimation;
                h1.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }
          }}
          onMouseMove={(e) => {
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              
              if (logo && logo.dataset.spinning === 'true') {
                const currentX = e.clientX;
                const logoRect = logo.getBoundingClientRect();
                const centerX = logoRect.left + logoRect.width / 2;
                
                // Determine spin direction based on mouse position relative to center
                const shouldSpinClockwise = currentX > centerX;
                const currentAnimation = logo.style.animation;
                
                // Change direction if needed
                if (shouldSpinClockwise && !currentAnimation.includes('Clockwise')) {
                  logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                } else if (!shouldSpinClockwise && !currentAnimation.includes('CounterClockwise')) {
                  logo.style.animation = 'coinSpinCounterClockwise 2s linear infinite';
                }
              }
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'true';
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                
                h1.style.transition = 'none';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              
              if (logo && logo.dataset.spinning === 'true') {
                const touch = e.touches[0];
                const currentX = touch.clientX;
                const logoRect = logo.getBoundingClientRect();
                const centerX = logoRect.left + logoRect.width / 2;
                
                // Determine spin direction based on touch position relative to center
                const shouldSpinClockwise = currentX > centerX;
                const currentAnimation = logo.style.animation;
                
                // Change direction if needed
                if (shouldSpinClockwise && !currentAnimation.includes('Clockwise')) {
                  logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                } else if (!shouldSpinClockwise && !currentAnimation.includes('CounterClockwise')) {
                  logo.style.animation = 'coinSpinCounterClockwise 2s linear infinite';
                }
              }
            }
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                
                // Get current animation to determine direction
                const currentAnimation = logo.style.animation;
                let stopAnimation = 'spinToStopClockwise 1.5s ease-out forwards';
                
                if (currentAnimation.includes('CounterClockwise')) {
                  stopAnimation = 'spinToStopCounterClockwise 1.5s ease-out forwards';
                }
                
                // Set current rotation for smooth continuation
                const computedStyle = window.getComputedStyle(logo);
                const matrix = computedStyle.transform;
                if (matrix && matrix !== 'none') {
                  const values = matrix.split('(')[1].split(')')[0].split(',');
                  const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
                  logo.style.setProperty('--current-rotation', `${angle}deg`);
                }
                
                logo.style.animation = stopAnimation;
                h1.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations immediately
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                logo.style.animation = 'none';
                h1.style.animation = 'none';
              }
            }
          }}
          onClick={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations for 3 seconds
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
                
                // Stop after 3 seconds
                setTimeout(() => {
                  divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
                  divider.style.transform = 'scaleY(1)';
                  logo.style.animation = 'none';
                  h1.style.animation = 'none';
                }, 3000);
              }
            }
          }}
        />
        
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
              Object.entries(eventsByMonth)
                .sort(([a], [b]) => {
                  // Extract year and month from the month key (e.g., "Oct 2025")
                  const getMonthYear = (monthKey: string) => {
                    const [monthName, year] = monthKey.split(' ');
                    const monthIndex = new Date(Date.parse(monthName + " 1, 2000")).getMonth();
                    return { year: parseInt(year), month: monthIndex };
                  };
                  
                  const aDate = getMonthYear(a);
                  const bDate = getMonthYear(b);
                  
                  // Compare by year first, then by month
                  if (aDate.year !== bDate.year) {
                    return aDate.year - bDate.year;
                  }
                  return aDate.month - bDate.month;
                })
                .map(([month, monthEvents]) => {
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
                          // Parse date string directly to avoid timezone issues
                          const [year, month, day] = event.date.split('-');
                          const monthAbbr = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                          
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
                                  <div className="flex justify-start" style={{ gap: '24px', marginTop: '12px' }}>
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
              Object.entries(eventsByOrganization)
                .sort(([a], [b]) => a.localeCompare(b)) // Sort H2 headings alphabetically
                .map(([organization, orgEvents]) => {
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
                          // Parse date string directly to avoid timezone issues
                          const [year, month, day] = event.date.split('-');
                          const monthAbbr = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                          
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
                                  <div className="flex justify-start" style={{ gap: '24px', marginTop: '12px' }}>
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
          
          {/* Event Suggestion Button */}
          <div 
            className="text-center mb-8 mt-12 px-4"
            style={{
              animation: 'pageContentFadeIn 1.5s ease-out 1.2s both'
            }}
          >
            <a 
              href="mailto:jane@repcap.com,cassiegresham97@gmail.com?subject=Event Suggestion for EBRTQ&body=Hi! I know of an event that should be added to EBRTQ..."
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
              Know an event we should add?<br />
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
        <Header 
          siteSettings={isDemo ? { h1: 'demo' } : undefined}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        
        {/* Glowing Divider Line - Interactive Easter Egg */}
        <div 
          style={{
            width: '50%',
            height: '2px',
            margin: '0 auto 32px auto',
            background: 'linear-gradient(90deg, transparent 0%, #00F5FF 50%, transparent 100%)',
            boxShadow: '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)',
            animation: 'pageContentFadeIn 1.5s ease-out 1.2s both',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'true';
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                
                h1.style.transition = 'none';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }
          }}
          onMouseLeave={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                
                // Get current animation to determine direction
                const currentAnimation = logo.style.animation;
                let stopAnimation = 'spinToStopClockwise 1.5s ease-out forwards';
                
                if (currentAnimation.includes('CounterClockwise')) {
                  stopAnimation = 'spinToStopCounterClockwise 1.5s ease-out forwards';
                }
                
                // Set current rotation for smooth continuation
                const computedStyle = window.getComputedStyle(logo);
                const matrix = computedStyle.transform;
                if (matrix && matrix !== 'none') {
                  const values = matrix.split('(')[1].split(')')[0].split(',');
                  const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
                  logo.style.setProperty('--current-rotation', `${angle}deg`);
                }
                
                logo.style.animation = stopAnimation;
                h1.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }
          }}
          onMouseMove={(e) => {
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              
              if (logo && logo.dataset.spinning === 'true') {
                const currentX = e.clientX;
                const logoRect = logo.getBoundingClientRect();
                const centerX = logoRect.left + logoRect.width / 2;
                
                // Determine spin direction based on mouse position relative to center
                const shouldSpinClockwise = currentX > centerX;
                const currentAnimation = logo.style.animation;
                
                // Change direction if needed
                if (shouldSpinClockwise && !currentAnimation.includes('Clockwise')) {
                  logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                } else if (!shouldSpinClockwise && !currentAnimation.includes('CounterClockwise')) {
                  logo.style.animation = 'coinSpinCounterClockwise 2s linear infinite';
                }
              }
            }
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'true';
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                
                h1.style.transition = 'none';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              
              if (logo && logo.dataset.spinning === 'true') {
                const touch = e.touches[0];
                const currentX = touch.clientX;
                const logoRect = logo.getBoundingClientRect();
                const centerX = logoRect.left + logoRect.width / 2;
                
                // Determine spin direction based on touch position relative to center
                const shouldSpinClockwise = currentX > centerX;
                const currentAnimation = logo.style.animation;
                
                // Change direction if needed
                if (shouldSpinClockwise && !currentAnimation.includes('Clockwise')) {
                  logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                } else if (!shouldSpinClockwise && !currentAnimation.includes('CounterClockwise')) {
                  logo.style.animation = 'coinSpinCounterClockwise 2s linear infinite';
                }
              }
            }
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations on header elements
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                
                // Get current animation to determine direction
                const currentAnimation = logo.style.animation;
                let stopAnimation = 'spinToStopClockwise 1.5s ease-out forwards';
                
                if (currentAnimation.includes('CounterClockwise')) {
                  stopAnimation = 'spinToStopCounterClockwise 1.5s ease-out forwards';
                }
                
                // Set current rotation for smooth continuation
                const computedStyle = window.getComputedStyle(logo);
                const matrix = computedStyle.transform;
                if (matrix && matrix !== 'none') {
                  const values = matrix.split('(')[1].split(')')[0].split(',');
                  const angle = Math.atan2(values[1], values[0]) * (180 / Math.PI);
                  logo.style.setProperty('--current-rotation', `${angle}deg`);
                }
                
                logo.style.animation = stopAnimation;
                h1.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
            divider.style.transform = 'scaleY(1)';
            
            // Stop fidget animations immediately
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.dataset.spinning = 'false';
                logo.style.animation = 'none';
                h1.style.animation = 'none';
              }
            }
          }}
          onClick={(e) => {
            const divider = e.currentTarget;
            divider.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.8), 0 0 50px rgba(0, 245, 255, 0.4)';
            divider.style.transform = 'scaleY(2)';
            
            // Trigger fidget animations for 3 seconds
            const header = document.querySelector('header');
            if (header) {
              const logo = header.querySelector('div[class*="w-28"]');
              const h1 = header.querySelector('h1');
              
              if (logo && h1) {
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
                h1.style.animation = 'textZoom 2s ease-in-out infinite';
                
                // Stop after 3 seconds
                setTimeout(() => {
                  divider.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4), 0 0 30px rgba(0, 245, 255, 0.2)';
                  divider.style.transform = 'scaleY(1)';
                  logo.style.animation = 'none';
                  h1.style.animation = 'none';
                }, 3000);
              }
            }
          }}
        />
        
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
            Object.entries(byProvider)
              .sort(([a], [b]) => a.localeCompare(b)) // Sort H2 headings alphabetically
              .map(([provider, providerResources]) => {
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
            Object.entries(byType)
              .sort(([a], [b]) => a.localeCompare(b)) // Sort H2 headings alphabetically
              .map(([type, typeResources]) => {
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
