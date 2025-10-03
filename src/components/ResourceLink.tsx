import { LucideIcon } from "lucide-react";

interface ResourceLinkProps {
  title: string;
  url: string;
  icon: LucideIcon;
  color: 'blue' | 'pink' | 'white' | 'purple' | 'magenta' | 'cyan' | 'green';
  description?: string;
  isExpanded?: boolean;
  onToggleDetails?: () => void;
}

export function ResourceLink({ title, url, icon: Icon, color, description, isExpanded, onToggleDetails }: ResourceLinkProps) {
  const colors = {
    blue: '#5BCEFA',
    pink: '#F5A9B8',
    white: '#FFFFFF',
    purple: '#BB86FC',
    magenta: '#FF006E',
    cyan: '#00F5FF',
    green: '#39FF14'
  };
  
  const glowRgba = {
    blue: '91, 206, 250',
    pink: '245, 169, 184',
    white: '255, 255, 255',
    purple: '187, 134, 252',
    magenta: '255, 0, 110',
    cyan: '0, 245, 255',
    green: '57, 255, 20'
  };
  
  return (
    <div
      className="border-4 transition-all duration-200 hover:scale-105"
      style={{
        borderColor: colors[color],
        boxShadow: `6px 6px 0 0 rgba(${glowRgba[color]}, 0.4), 0 0 15px rgba(128, 128, 128, 0.12)`,
        imageRendering: 'pixelated',
        backgroundColor: 'rgba(42, 45, 58, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <a
        href={url}
        className="flex items-center gap-4 p-4"
      >
        <div 
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2"
          style={{
            borderColor: colors[color]
          }}
        >
          <Icon className="w-5 h-5" style={{ color: colors[color] }} />
        </div>
        <span 
          className="flex-1"
          style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}
        >
          {title}
        </span>
        <div 
          className="flex-shrink-0 text-xs opacity-75"
          style={{ fontFamily: 'monospace' }}
        >
          →
        </div>
      </a>
      
      {description && (
        <div 
          className="text-gray-300 text-sm transition-colors hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onToggleDetails?.();
          }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: '1.4',
            cursor: 'pointer',
            paddingLeft: '64px', // 16px container + 32px icon + 16px gap
            paddingRight: '32px', // More space on the right
            paddingBottom: '24px' // More space below description
          }}
        >
          {(() => {
            const truncated = description.length > 140 ? description.substring(0, 140) + '...' : description;
            
            return (
              <>
                <span>{isExpanded ? description : truncated}</span>
                {description.length > 140 && (
                  <span 
                    className="ml-1 font-bold"
                    style={{
                      color: colors[color]
                    }}
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </span>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
