const AGENTS = [
  { id:'astursadeth', sym:'◎', name:'Astursadeth', role:'Orchestrator · Solution Architect', desc:'Decides which agents intervene, in what order, and with what context. Coordinates tasks between humans, AI, and integrations.', status:'Orchestrating', color:'violet'},
  { id:'aureon', sym:'⬡', name:'Auréon', role:'Ecosystem Builder · Backend', desc:'Ensures every decision makes technical and business sense: integrations, workflows, risks, scalability.', status:'Building', color:'teal'},
  { id:'runa', sym:'✦', name:'Runa', role:'Communication · Visual Coherence', desc:'Ensures everything communicated (copy, UX, content, visuals) is coherent with your brand DNA.', status:'Active', color:'rose'}
];

window.Triad = function Triad() {
  return (
    <section className="mv-section">
      <div className="mv-container">
        <div className="mv-pill"><span className="mv-dot"/><span className="mv-mono-label">The Triad</span></div>
        <h2 className="mv-h-section" style={{marginTop:'24px'}}>
          The Intelligence<br/>
          <em>Behind Your Business.</em>
        </h2>
        <p className="mv-lead" style={{maxWidth:'640px',marginTop:'24px',marginBottom:'64px'}}>
          At the core of CortexOS lives the Triad: three intelligences that orchestrate every sub-agent working for your business.
        </p>
        <div className="mv-triad-grid">
          {AGENTS.map(a => (
            <div key={a.id} className={`mv-agent-card mv-agent-${a.color}`}>
              <div className="mv-agent-sym">{a.sym}</div>
              <h3 className="mv-agent-name">{a.name}</h3>
              <div className="mv-agent-role">{a.role}</div>
              <p className="mv-agent-desc">{a.desc}</p>
              <div className="mv-agent-status">
                <span className="mv-agent-dot"/><span className="mv-mono-meta">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'48px'}}>
          <span className="mv-principle">AI proposes, you decide. We guarantee the system stays coherent, secure, and aligned with your strategy.</span>
        </div>
      </div>
    </section>
  );
};
