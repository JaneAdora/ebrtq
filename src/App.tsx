import { useState, useEffect } from "react";
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
  Shield
} from "lucide-react";
// Dynamic loading - no static import

type ViewMode = 'provider' | 'type';

interface Resource {
  id: string;
  title: string;
  url: string;
  provider: string;
  type: string;
  icon: any;
  color: 'blue' | 'pink' | 'white' | 'purple' | 'magenta' | 'cyan' | 'green';
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

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('provider');
  const [showAdmin, setShowAdmin] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load resources dynamically
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://raw.githubusercontent.com/JaneAdora/ebrtq/main/src/data/resources.json?v=${Date.now()}`);
        if (!response.ok) {
          throw new Error('Failed to load resources');
        }
        const data = await response.json();
        
        // Map icons and set resources
        const mappedResources: Resource[] = data.resources.map((resource: any) => ({
          ...resource,
          icon: iconMap[resource.icon as keyof typeof iconMap] || Users
        }));
        
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
  
  // Show admin interface if in admin mode
  if (isAdminMode) {
    return <RealContentEditor />;
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
      `}</style>
      <div className="w-full max-w-2xl">
        <Header />
        
        
        {/* View Toggle */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setViewMode('provider')}
            className={`px-6 py-3 border-4 transition-all ${
              viewMode === 'provider' ? 'scale-105' : 'opacity-60'
            }`}
            style={{
              borderColor: viewMode === 'provider' ? '#BB86FC' : 'rgba(255, 255, 255, 0.3)',
              boxShadow: viewMode === 'provider' ? '4px 4px 0 0 #BB86FC, 0 0 20px rgba(187, 134, 252, 0.3)' : 'none',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(42, 45, 58, 0.7)',
              backdropFilter: 'blur(10px)'
            }}
          >
            BY PROVIDER
          </button>
          
          <button
            onClick={() => setViewMode('type')}
            className={`px-6 py-3 border-4 transition-all ${
              viewMode === 'type' ? 'scale-105' : 'opacity-60'
            }`}
            style={{
              borderColor: viewMode === 'type' ? '#FF006E' : 'rgba(255, 255, 255, 0.3)',
              boxShadow: viewMode === 'type' ? '4px 4px 0 0 #FF006E, 0 0 20px rgba(255, 0, 110, 0.3)' : 'none',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(42, 45, 58, 0.7)',
              backdropFilter: 'blur(10px)'
            }}
          >
            BY TYPE
          </button>
        </div>
        
        {/* Resources Display */}
        <div className="space-y-8">
          {viewMode === 'provider' ? (
            Object.entries(byProvider).map(([provider, providerResources]) => (
              <div key={provider}>
                <h2 
                  className="mb-4 pb-2 border-b-4"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1.75rem',
                    letterSpacing: '0.15em',
                    borderColor: '#BB86FC',
                    color: '#FFFFFF',
                    textShadow: '0 0 20px rgba(187, 134, 252, 0.8)'
                  }}
                >
                  <span style={{ color: '#BB86FC' }}>▸</span> {provider}
                </h2>
                <div className="space-y-3">
                  {providerResources.map((resource) => (
                    <ResourceLink
                      key={resource.id}
                      title={resource.title}
                      url={resource.url}
                      icon={resource.icon}
                      color={resource.color}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            Object.entries(byType).map(([type, typeResources]) => (
              <div key={type}>
                <h2 
                  className="mb-4 pb-2 border-b-4"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: '1.75rem',
                    letterSpacing: '0.15em',
                    borderColor: '#FF006E',
                    color: '#FFFFFF',
                    textShadow: '0 0 20px rgba(255, 0, 110, 0.8)'
                  }}
                >
                  <span style={{ color: '#FF006E' }}>▸</span> {type}
                </h2>
                <div className="space-y-3">
                  {typeResources.map((resource) => (
                    <ResourceLink
                      key={resource.id}
                      title={resource.title}
                      url={resource.url}
                      icon={resource.icon}
                      color={resource.color}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
