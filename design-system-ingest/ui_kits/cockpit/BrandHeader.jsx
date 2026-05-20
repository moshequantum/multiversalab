window.BrandHeader = function BrandHeader({ brand, user, model, onModelChange }) {
  const models = [
    { id: 'auto', name: 'Neural Router' },
    { id: 'gemini', name: 'Gemini 1.5 Pro' },
    { id: 'mistral', name: 'Mistral Large' },
    { id: 'groq', name: 'Groq Llama 3' }
  ];
  return (
    <header className="mv-brand-header">
      <div className="mv-bh-left">
        <img src="../../assets/favicon.svg" alt="" className="mv-bh-mark"/>
        <div>
          <div className="mv-mono-label" style={{color:'rgba(250,252,232,.5)',fontSize:9}}>Cockpit · {brand}</div>
          <div style={{fontFamily:'var(--font-serif)',fontSize:18,color:'var(--mv-ivory)',letterSpacing:'-.02em'}}>
            Welcome, <em style={{fontStyle:'italic',color:'var(--mv-primary)',opacity:.8}}>{user}</em>
          </div>
        </div>
      </div>
      <div className="mv-bh-right">
        <div className="mv-status-pill">
          <span className="mv-dot"/><span className="mv-mono-label" style={{fontSize:9}}>Hydra Pool · Live</span>
        </div>
        <div className="mv-model-switch">
          {models.map(m => (
            <button key={m.id} onClick={()=>onModelChange(m.id)} className={`mv-model-pill ${m.id===model?'mv-model-active':''}`}>{m.name}</button>
          ))}
        </div>
      </div>
    </header>
  );
};
