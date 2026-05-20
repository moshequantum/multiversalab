const NEXUS = [
  { id:'astursadeth', sym:'◎', name:'Astursadeth', role:'Orchestrator', status:'Orchestrating', load:78, color:'violet' },
  { id:'aureon', sym:'⬡', name:'Auréon', role:'Ecosystem', status:'Building', load:54, color:'teal' },
  { id:'runa', sym:'✦', name:'Runa', role:'Communication', status:'Active', load:33, color:'rose' },
];

window.AgentNexus = function AgentNexus() {
  return (
    <section className="mv-nexus">
      <header className="mv-nexus-head">
        <div>
          <div className="mv-mono-label" style={{color:'rgba(250,252,232,.5)'}}>The Triad · Agent Status Nexus</div>
          <h2 className="mv-nexus-title">Your team<em> is online.</em></h2>
        </div>
        <div className="mv-nexus-principle">AI proposes, you decide.</div>
      </header>
      <div className="mv-nexus-grid">
        {NEXUS.map(a => (
          <div key={a.id} className={`mv-nexus-card mv-nexus-${a.color}`}>
            <div className="mv-nexus-row">
              <div className="mv-nexus-sym">{a.sym}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--font-serif)',fontSize:20,color:'var(--mv-ivory)'}}>{a.name}</div>
                <div className="mv-mono-meta">{a.role}</div>
              </div>
              <div className="mv-nexus-status">
                <span className="mv-nexus-dot"/>
                <span className="mv-mono-label" style={{fontSize:9}}>{a.status}</span>
              </div>
            </div>
            <div className="mv-nexus-bar-track">
              <div className="mv-nexus-bar" style={{width:`${a.load}%`}}/>
            </div>
            <div className="mv-nexus-foot">
              <span className="mv-mono-meta">Load · {a.load}%</span>
              <span className="mv-mono-meta">0 conflicts</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
