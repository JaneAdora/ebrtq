export function Footer() {
  return (
    <footer 
      className="w-full mt-12 py-6 border-t-2" 
      style={{ 
        borderColor: '#BB86FC',
        boxShadow: '0 0 15px rgba(187, 134, 252, 0.3)'
      }}
    >
      <div className="text-center">
        <div className="mb-4">
          <a 
            href="mailto:jane@repcap.com,cassiegresham97@gmail.com?subject=Resource Suggestion for EBRTQ&body=Hi! I know of a resource that should be added to EBRTQ..."
            className="inline-block px-6 py-3 border-2 transition-all hover:scale-105"
            style={{
              borderColor: '#5BCEFA',
              boxShadow: '4px 4px 0 0 #5BCEFA, 0 0 15px rgba(91, 206, 250, 0.3)',
              imageRendering: 'pixelated',
              backgroundColor: 'rgba(91, 206, 250, 0.1)',
              fontFamily: 'monospace',
              color: '#5BCEFA',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            <span style={{ color: '#5BCEFA' }}>💡</span> Know a resource we should add? Shoot us a message!
          </a>
        </div>
        <div className="opacity-75">
          <p 
            style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.875rem',
              color: '#00F5FF',
              textShadow: '0 0 5px rgba(0, 245, 255, 0.3)'
            }}
          >
            <span style={{ color: '#BB86FC' }}>©</span> 2025 EBRTQ <span style={{ color: '#BB86FC' }}>·</span> Made with <span style={{ color: '#5BCEFA' }}>💙</span><span style={{ color: '#F5A9B8' }}>💗</span><span style={{ color: '#FFFFFF' }}>🤍</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
