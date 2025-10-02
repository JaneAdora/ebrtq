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
        {/* Circular logo with H1 text layered above it */}
        <div className="mb-4 flex justify-center relative">
          {/* H1 text positioned centered over the circle */}
          <h1 
            className="absolute z-10"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: '3rem',
              fontWeight: 900,
              letterSpacing: '0.3em',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(91, 206, 250, 1), 0 0 15px rgba(0, 0, 0, 1), 3px 3px 6px rgba(0, 0, 0, 1)',
              lineHeight: '1.0',
              whiteSpace: 'nowrap',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%) translateX(8px)',
              filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.8))'
            }}
          >
            {siteSettings?.h1 || 'EBRTQ'}
          </h1>
          
          {/* Circular logo */}
          <div 
            className="w-28 h-28 flex items-center justify-center relative"
            style={{
              borderRadius: '50%',
              border: '4px solid #5BCEFA',
              boxShadow: '0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6)',
              backgroundColor: '#2A2D3A',
              position: 'relative'
            }}
          >
            {/* Solid dark center - no gradient */}
            <div 
              className="absolute inset-2"
              style={{
                borderRadius: '50%',
                backgroundColor: '#1A1D2A',
                border: '2px solid #2A2D3A'
              }}
            />
          </div>
        </div>
        
        <p 
          className="opacity-90"
          style={{
            fontFamily: 'monospace',
            color: '#00F5FF',
            letterSpacing: '0.1em',
            textShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
            marginTop: '2.5rem'
          }}
        >
          {siteSettings?.tagline || '→ Connecting Our Community to Resources ←'}
        </p>
      </div>
    </header>
  );
}
