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
  
  @keyframes coinSpinClockwise {
    0% { 
      transform: rotateY(0deg);
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
    }
    25% { 
      transform: rotateY(90deg);
      box-shadow: 0 0 0 6px #F5A9B8, 0 0 0 12px #FFFFFF, 0 0 40px rgba(91, 206, 250, 0.8);
    }
    50% { 
      transform: rotateY(180deg);
      box-shadow: 0 0 0 8px #F5A9B8, 0 0 0 16px #FFFFFF, 0 0 50px rgba(91, 206, 250, 1);
    }
    75% { 
      transform: rotateY(270deg);
      box-shadow: 0 0 0 6px #F5A9B8, 0 0 0 12px #FFFFFF, 0 0 40px rgba(91, 206, 250, 0.8);
    }
    100% { 
      transform: rotateY(360deg);
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
    }
  }
  
  @keyframes coinSpinCounterClockwise {
    0% { 
      transform: rotateY(0deg);
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
    }
    25% { 
      transform: rotateY(-90deg);
      box-shadow: 0 0 0 6px #F5A9B8, 0 0 0 12px #FFFFFF, 0 0 40px rgba(91, 206, 250, 0.8);
    }
    50% { 
      transform: rotateY(-180deg);
      box-shadow: 0 0 0 8px #F5A9B8, 0 0 0 16px #FFFFFF, 0 0 50px rgba(91, 206, 250, 1);
    }
    75% { 
      transform: rotateY(-270deg);
      box-shadow: 0 0 0 6px #F5A9B8, 0 0 0 12px #FFFFFF, 0 0 40px rgba(91, 206, 250, 0.8);
    }
    100% { 
      transform: rotateY(-360deg);
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
    }
  }
  
  @keyframes textZoom {
    0% { 
      transform: translateY(0) translateX(-50%) translateX(8px) scale(1);
    }
    50% { 
      transform: translateY(0) translateX(-50%) translateX(8px) scale(1.05);
    }
    100% { 
      transform: translateY(0) translateX(-50%) translateX(8px) scale(1);
    }
  }
  
  @keyframes spinToStopClockwise {
    0% { 
      transform: rotateY(var(--current-rotation, 0deg));
      box-shadow: 0 0 0 8px #F5A9B8, 0 0 0 16px #FFFFFF, 0 0 50px rgba(91, 206, 250, 1);
      animation-timing-function: ease-out;
    }
    100% { 
      transform: rotateY(calc(var(--current-rotation, 0deg) + 180deg));
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
    }
  }
  
  @keyframes spinToStopCounterClockwise {
    0% { 
      transform: rotateY(var(--current-rotation, 0deg));
      box-shadow: 0 0 0 8px #F5A9B8, 0 0 0 16px #FFFFFF, 0 0 50px rgba(91, 206, 250, 1);
      animation-timing-function: ease-out;
    }
    100% { 
      transform: rotateY(calc(var(--current-rotation, 0deg) - 180deg));
      box-shadow: 0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6);
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
            className="absolute z-10 cursor-pointer"
            style={{
              fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', sans-serif",
              fontSize: '3rem',
              fontWeight: 900,
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(91, 206, 250, 1), 0 0 15px rgba(0, 0, 0, 1), 3px 3px 6px rgba(0, 0, 0, 1)',
              lineHeight: '1.0',
              whiteSpace: 'nowrap',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%) translateX(8px)',
              filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.8))',
              animation: 'textSlideIn 1.2s ease-out 0.3s both',
              transition: 'transform 0.6s ease-out'
            }}
            onMouseEnter={(e) => {
              // Get both elements
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
              if (logo) {
                // Store initial mouse position for direction tracking
                logo.dataset.initialX = e.clientX.toString();
                logo.dataset.spinning = 'true';
                
                // Clear transitions and start spinning clockwise
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
              }
              text.style.transition = 'none';
              text.style.animation = 'textZoom 2s ease-in-out infinite';
            }}
            onMouseMove={(e) => {
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
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
            }}
            onMouseLeave={(e) => {
              // Get both elements
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
              if (logo) {
                // Stop tracking
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
                
                // Use smooth animation to gradually slow down
                logo.style.animation = stopAnimation;
              }
              text.style.animation = 'textZoom 1.2s ease-out forwards';
            }}
            onTouchStart={(e) => {
              // Get both elements
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
              if (logo) {
                // Store initial touch position for direction tracking
                const touch = e.touches[0];
                logo.dataset.initialX = touch.clientX.toString();
                logo.dataset.spinning = 'true';
                
                // Clear transitions and start spinning clockwise
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
              }
              text.style.transition = 'none';
              text.style.animation = 'textZoom 2s ease-in-out infinite';
            }}
            onTouchMove={(e) => {
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
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
            }}
            onTouchEnd={(e) => {
              // Get both elements
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
              if (logo) {
                // Stop tracking
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
                
                // Use smooth animation to gradually slow down
                logo.style.animation = stopAnimation;
              }
              text.style.animation = 'textZoom 1.2s ease-out forwards';
            }}
            onClick={(e) => {
              // Get both elements
              const text = e.currentTarget;
              const logo = e.currentTarget.parentElement?.querySelector('div[class*="w-28"]');
              
              // Start spinning and zooming for 3 seconds
              if (logo) {
                logo.style.animation = 'coinSpin 2s linear infinite';
              }
              text.style.animation = 'textZoom 2s ease-in-out infinite';
              
              // Stop after 3 seconds
              setTimeout(() => {
                if (logo) {
                  logo.style.animation = 'none';
                }
                text.style.animation = 'none';
              }, 3000);
            }}
          >
            {siteSettings?.h1 || 'EBRTQ'}
          </h1>
          
          {/* Circular logo - Fidget Spinner with larger clickable area */}
          <div 
            className="w-40 h-40 flex items-center justify-center relative cursor-pointer"
            style={{
              position: 'relative',
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              // Get both elements - target the inner logo
              const logo = e.currentTarget.querySelector('div[class*="w-28"]');
              const text = e.currentTarget.parentElement?.querySelector('h1');
              
              if (logo) {
                // Store initial mouse position for direction tracking
                logo.dataset.initialX = e.clientX.toString();
                logo.dataset.spinning = 'true';
                
                // Clear any existing transitions and start spinning clockwise
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
              }
              
              if (text) {
                text.style.transition = 'none';
                text.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }}
            onMouseMove={(e) => {
              const logo = e.currentTarget.querySelector('div[class*="w-28"]');
              if (!logo || logo.dataset.spinning !== 'true') return;
              
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
            }}
            onMouseLeave={(e) => {
              // Get both elements
              const logo = e.currentTarget;
              const text = e.currentTarget.parentElement?.querySelector('h1');
              
              // Stop tracking
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
              
              // Use smooth animation to gradually slow down
              logo.style.animation = stopAnimation;
              
              if (text) {
                text.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }}
            onTouchStart={(e) => {
              // Get both elements - target the inner logo
              const logo = e.currentTarget.querySelector('div[class*="w-28"]');
              const text = e.currentTarget.parentElement?.querySelector('h1');
              
              if (logo) {
                // Store initial touch position for direction tracking
                const touch = e.touches[0];
                logo.dataset.initialX = touch.clientX.toString();
                logo.dataset.spinning = 'true';
                
                // Clear transitions and start spinning clockwise
                logo.style.transition = 'none';
                logo.style.animation = 'coinSpinClockwise 2s linear infinite';
              }
              
              if (text) {
                text.style.transition = 'none';
                text.style.animation = 'textZoom 2s ease-in-out infinite';
              }
            }}
            onTouchMove={(e) => {
              const logo = e.currentTarget.querySelector('div[class*="w-28"]');
              if (!logo || logo.dataset.spinning !== 'true') return;
              
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
            }}
            onTouchEnd={(e) => {
              // Get both elements
              const logo = e.currentTarget;
              const text = e.currentTarget.parentElement?.querySelector('h1');
              
              // Stop tracking
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
              
              // Use smooth animation to gradually slow down
              logo.style.animation = stopAnimation;
              
              if (text) {
                text.style.animation = 'textZoom 1.2s ease-out forwards';
              }
            }}
            onClick={(e) => {
              // Get both elements - target the inner logo
              const logo = e.currentTarget.querySelector('div[class*="w-28"]');
              const text = e.currentTarget.parentElement?.querySelector('h1');
              
              // Start spinning and zooming for 3 seconds
              if (logo) {
                logo.style.animation = 'coinSpin 2s linear infinite';
              }
              if (text) {
                text.style.animation = 'textZoom 2s ease-in-out infinite';
              }
              
              // Stop after 3 seconds
              setTimeout(() => {
                if (logo) {
                  logo.style.animation = 'none';
                }
                if (text) {
                  text.style.animation = 'none';
                }
              }, 3000);
            }}
          >
            {/* Visual logo - same size as before but centered in larger clickable area */}
            <div 
              className="w-28 h-28 flex items-center justify-center relative"
              style={{
                borderRadius: '50%',
                border: '4px solid #5BCEFA',
                boxShadow: '0 0 0 4px #F5A9B8, 0 0 0 8px #FFFFFF, 0 0 30px rgba(91, 206, 250, 0.6)',
                backgroundColor: '#2A2D3A',
                position: 'relative',
                animation: 'logoGlow 1.5s ease-out 0s both',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s ease-out'
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
