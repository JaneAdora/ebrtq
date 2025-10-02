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
        <div 
          className="opacity-90 px-4 sm:px-8"
          style={{
            maxWidth: '50vw',
            width: '50vw',
            margin: '0 auto',
            padding: '0 16px'
          }}
        >
          <p 
            style={{ 
              fontFamily: 'monospace', 
              fontSize: '0.7rem',
              color: '#00F5FF',
              textShadow: '0 0 5px rgba(0, 245, 255, 0.3)',
              margin: 0,
              padding: 0,
              textAlign: 'center'
            }}
          >
            Made with <span style={{ color: '#5BCEFA' }}>💙</span><span style={{ color: '#F5A9B8' }}>💗</span><span style={{ color: '#FFFFFF' }}>🤍</span><br />from The Baton Rouge Chapter<br />of Louisiana Trans Advocates
          </p>
        </div>
      </div>
    </footer>
  );
}
