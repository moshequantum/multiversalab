const { useState } = React;

window.Hero = function Hero() {
  return (
    <section className="mv-hero">
      <div className="mv-hero-bg" />
      <div className="mv-hero-scrim-top" />
      <div className="mv-hero-scrim-bot" />
      <div className="mv-container mv-hero-inner">
        <div className="mv-pill" style={{marginBottom:'32px'}}>
          <span className="mv-dot" /><span className="mv-mono-label">Multiversa: Growth & Scalability Lab</span>
        </div>
        <h1 className="mv-h1-hero">
          Your business, orchestrated.<br/>
          <em>Activate your Cortex.</em>
        </h1>
        <p className="mv-lead" style={{maxWidth:'640px',marginBottom:'32px'}}>
          CortexOS is your command Cockpit + agent team, designed to think and operate your business with you — not just another app in your bookmarks.
        </p>
        <ul className="mv-bullets">
          <li><span className="mv-bullet-dot"/>Fleet of agents for less than the monthly cost of a senior employee.</li>
          <li><span className="mv-bullet-dot"/>4-layer memory: your brand, your operations, and your decisions — always present.</li>
          <li><span className="mv-bullet-dot"/>AI orchestration, integrations, and workflows with human oversight.</li>
        </ul>
        <div className="mv-hero-ctas">
          <button className="mv-btn-primary">
            Try Cockpit Nano · 7 days
            <i data-lucide="arrow-right" style={{width:18,height:18}}></i>
          </button>
          <button className="mv-btn-glass">
            <i data-lucide="terminal" style={{width:18,height:18,color:'var(--mv-primary)'}}></i>
            Talk about Spark / Pulse
          </button>
        </div>
      </div>
    </section>
  );
};
