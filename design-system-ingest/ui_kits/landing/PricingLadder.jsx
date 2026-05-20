const TIERS = [
  { id:'nano', icon:'globe', step:'Step 00', name:'Nano', price:'$0 · 7 days free', desc:'For 7 days, play with a Cockpit demo using sample data. See how your business would look running on CortexOS.', features:['Guided walkthrough','Pre-configured use cases','Agents in action (demo)'], cta:'Try Nano 7 days', accent:'neutral'},
  { id:'spark', icon:'zap', step:'Step 01', name:'Spark', price:'$199 · Lifetime', jtbd:'I want a landing page that sells and a minimum system behind it, without wasting weeks between templates, prompts, and a thousand tools.', desc:'Your first live system to capture and organize opportunity.', features:['Landing page + copy from your brand DNA','AI prospecting: Tavily + Apollo → Google Sheet','Minimal follow-up automation'], cta:'Join the Circle', accent:'primary', scarcity:'Only 20 spots · Founder Circle', priceAfter:'Then $799', highlight:true},
  { id:'pulse', icon:'link-2', step:'Step 02', name:'Pulse', price:'$399 · Monthly', jtbd:'I already have traction, too many tools, and I need everything to talk to each other.', desc:'Optimized shared infrastructure. Every high-impact action in "Review required" mode.', features:['Ecosystem integration (GWS, Notion, GHL, etc.)','Automated workflows with n8n and APIs','1 monthly strategic session'], cta:'Activate Pulse', accent:'teal'},
  { id:'cortex', icon:'terminal', step:'Step 03', name:'Cortex', price:'From $599 · Monthly', jtbd:'I want a permanent ops team that can learn from my business and execute at scale.', desc:"You don't pay for prompts or tokens. You pay for a complete agent team + dedicated node, for less than the cost of a senior employee.", features:['Dedicated node (VPS, Docker, Sentry)','4-layer memory (L1-L4)','Weekly sync with strategic CTO'], cta:'Scale to Cortex', accent:'violet'},
];

window.PricingLadder = function PricingLadder() {
  return (
    <section className="mv-section">
      <div className="mv-container" style={{textAlign:'center'}}>
        <div className="mv-pill"><span className="mv-dot"/><span className="mv-mono-label">Investment</span></div>
        <h2 className="mv-h-section" style={{marginTop:'24px'}}>From Vision<br/><em>to Execution.</em></h2>
        <p className="mv-lead" style={{maxWidth:'560px',margin:'24px auto 0'}}>
          Four levels of depth. You choose how far to go. We design the bridge.
        </p>
      </div>
      <div className="mv-tier-scroll">
        <div className="mv-tier-row">
          {TIERS.map(t => (
            <div key={t.id} className={`mv-tier-card mv-tier-${t.accent}${t.highlight?' mv-tier-highlight':''}`}>
              {t.highlight && <div className="mv-tier-badge">Founder Circle</div>}
              <div className="mv-tier-head">
                <div className={`mv-chip mv-chip-${t.accent}`}><i data-lucide={t.icon} style={{width:20,height:20}}/></div>
                <span className="mv-mono-meta">{t.step}</span>
              </div>
              <h3 className="mv-tier-name">{t.name}</h3>
              <div className="mv-tier-price">{t.price}</div>
              {t.scarcity && (
                <div style={{marginTop:'10px',marginBottom:'16px'}}>
                  <div className="mv-mono-label" style={{fontSize:10,display:'flex',alignItems:'center',gap:8}}>
                    <span className="mv-dot"/>{t.scarcity}
                  </div>
                  <div className="mv-mono-meta" style={{marginTop:4}}>{t.priceAfter}</div>
                </div>
              )}
              {t.jtbd && <div className="mv-jtbd">&ldquo;{t.jtbd}&rdquo;</div>}
              <p className="mv-tier-desc">{t.desc}</p>
              <ul className="mv-feature-list">
                {t.features.map((f,i) => <li key={i}><span className="mv-bullet-dot"/>{f}</li>)}
              </ul>
              <button className={`mv-btn-tier ${t.highlight?'mv-btn-tier-primary':''}`}>{t.cta}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="mv-container" style={{textAlign:'center',marginTop:'48px'}}>
        <span className="mv-mono-label" style={{color:'rgba(189,235,52,.6)'}}>Your first Quick Win in 10-15 days · We don't create logos · We receive your brand and orchestrate it</span>
      </div>
    </section>
  );
};
