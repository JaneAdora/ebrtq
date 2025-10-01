import { LucideIcon } from "lucide-react";

interface ResourceLinkProps {
  title: string;
  url: string;
  icon: LucideIcon;
  color: 'blue' | 'pink' | 'white' | 'purple' | 'magenta' | 'cyan' | 'green';
}

export function ResourceLink({ title, url, icon: Icon, color }: ResourceLinkProps) {
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
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 border-4 transition-all duration-200 hover:scale-105"
      style={{
        borderColor: colors[color],
        boxShadow: `4px 4px 0 0 ${colors[color]}, 0 0 15px rgba(${glowRgba[color]}, 0.3)`,
        imageRendering: 'pixelated',
        backgroundColor: 'rgba(42, 45, 58, 0.6)',
        backdropFilter: 'blur(10px)'
      }}
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
  );
}
