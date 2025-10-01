import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";

export function Header() {
  return (
    <header className="w-full mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="w-10" /> {/* Spacer */}
        <div className="flex-1" />
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 hover:scale-110 transition-transform" aria-label="Open navigation menu">
              <Menu className="w-6 h-6" style={{ color: 'var(--trans-pink)' }} />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="border-l-4 border-[#BB86FC]"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 45, 58, 0.95) 0%, rgba(42, 31, 61, 0.95) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 30px rgba(187, 134, 252, 0.4)'
            }}
          >
            <SheetHeader>
              <SheetTitle style={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                Navigation
              </SheetTitle>
              <SheetDescription style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                Navigate to different sections
              </SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <a 
                href="#" 
                className="p-4 border-2 hover:scale-105 transition-transform"
                style={{
                  borderColor: '#5BCEFA',
                  boxShadow: '4px 4px 0 0 #5BCEFA, 0 0 15px rgba(91, 206, 250, 0.3)',
                  imageRendering: 'pixelated',
                  backgroundColor: 'rgba(91, 206, 250, 0.1)',
                  fontFamily: 'monospace'
                }}
              >
                <span style={{ color: '#5BCEFA' }}>▸</span> Home
              </a>
              <a 
                href="#events" 
                className="p-4 border-2 opacity-50 cursor-not-allowed"
                style={{
                  borderColor: '#F5A9B8',
                  boxShadow: '4px 4px 0 0 #F5A9B8',
                  imageRendering: 'pixelated',
                  backgroundColor: 'rgba(245, 169, 184, 0.05)',
                  fontFamily: 'monospace'
                }}
              >
                <span style={{ color: '#F5A9B8' }}>▸</span> Events (Coming Soon)
              </a>
            </nav>
          </SheetContent>
        </Sheet>
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
          EBRTQ
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
          → Connecting Our Community to Resources ←
        </p>
      </div>
    </header>
  );
}
