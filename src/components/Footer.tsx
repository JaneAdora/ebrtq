export function Footer() {
  return (
    <footer 
      className="w-full mt-12 py-6 border-t-2" 
      style={{ 
        borderColor: '#BB86FC',
        boxShadow: '0 0 15px rgba(187, 134, 252, 0.3)'
      }}
    >
      <div className="text-center opacity-75">
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
    </footer>
  );
}
