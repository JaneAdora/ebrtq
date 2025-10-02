interface HeaderProps {
  siteSettings?: {
    h1?: string;
    tagline?: string;
  };
}

// Animation keyframes
const logoAnimation = `
  @keyframes logoGlow {
    0% { 
      transform: scale(0.8) rotate(0deg);
      opacity: 0;
      filter: drop-shadow(0 0 0px rgba(91, 206, 250, 0));
    }
    50% { 
      transform: scale(1.05) rotate(180deg);
      opacity: 0.8;
      filter: drop-shadow(0 0 20px rgba(91, 206, 250, 0.6));
    }
    100% { 
      transform: scale(1) rotate(360deg);
      opacity: 1;
      filter: drop-shadow(0 0 30px rgba(91, 206, 250, 0.8));
    }
  }
  
  @keyframes textSlideIn {
    0% { 
      transform: translateY(-50px) translateX(-50%) translateX(8px);
      opacity: 0;
      filter: blur(10px);
    }
    60% { 
      transform: translateY(10px) translateX(-50%) translateX(8px);
      opacity: 0.8;
      filter: blur(2px);
    }
    100% { 
      transform: translateY(0) translateX(-50%) translateX(8px);
      opacity: 1;
      filter: blur(0px);
    }
  }
  
  @keyframes ringPulse {
    0% { 
      transform: scale(0.9);
      opacity: 0;
    }
    50% { 
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% { 
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes taglineFadeIn {
    0% { 
      opacity: 0;
      transform: translateY(20px);
    }
    100% { 
      opacity: 0.9;
      transform: translateY(0);
    }
  }
`;

export function Header({ siteSettings }: HeaderProps) {
  return (
    <>
      <style>{logoAnimation}</style>
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
              filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.8))',
              animation: 'textSlideIn 1.2s ease-out 0.3s both'
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
              position: 'relative',
              animation: 'logoGlow 1.5s ease-out 0s both'
            }}
          >
            {/* Solid dark center - no gradient */}
            <div 
              className="absolute inset-2"
              style={{
                borderRadius: '50%',
                backgroundColor: '#1A1D2A',
                border: '2px solid #2A2D3A',
                animation: 'ringPulse 1.8s ease-out 0.2s both'
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
            marginTop: '2.5rem',
            animation: 'taglineFadeIn 1s ease-out 1.2s both'
          }}
        >
          {siteSettings?.tagline || '→ Connecting Our Community to Resources ←'}
        </p>
      </div>
    </header>
    </>
  );
}
