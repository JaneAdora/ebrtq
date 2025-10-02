interface HeaderProps {
  siteSettings?: {
    h1?: string;
    tagline?: string;
  };
}

export function Header({ siteSettings }: HeaderProps) {
  return (
    <header className="w-full mb-8">
      {/* Hamburger menu hidden for now */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
      
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div 
            className="w-28 h-28 border-4 flex items-center justify-center relative"
            style={{
              borderRadius: '50%',
              borderColor: '#5BCEFA',
              boxShadow: '0 0 0 4px #F5A9B8, 0 0 30px rgba(91, 206, 250, 0.6)',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(42, 45, 58, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div 
              className="absolute inset-2 opacity-20"
              style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #5BCEFA 0%, #F5A9B8 50%, #BB86FC 100%)'
              }}
            />
            <span 
              className="relative z-10"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(91, 206, 250, 0.8)'
              }}
            >
              EBRTQ
            </span>
          </div>
        </div>
        
        <h1 
          className="mb-2"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '2.5rem',
            fontWeight: 900,
            letterSpacing: '0.3em',
            color: '#FFFFFF',
            textShadow: '0 0 30px rgba(91, 206, 250, 0.8)'
          }}
        >
          {siteSettings?.h1 || 'EBRTQ'}
        </h1>
        
        <p 
          className="opacity-90"
          style={{
            fontFamily: 'monospace',
            color: '#00F5FF',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px rgba(0, 245, 255, 0.5)'
          }}
        >
          {siteSettings?.tagline || '→ Connecting Our Community to Resources ←'}
        </p>
      </div>
    </header>
  );
}
