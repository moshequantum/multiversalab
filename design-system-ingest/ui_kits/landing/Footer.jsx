window.Footer = function Footer() {
  return (
    <footer className="mv-footer-wrap">
      <div className="mv-container">
        <div className="mv-footer-grid">
          <div style={{gridColumn:'span 2'}}>
            <img src="../../assets/Logotipo.svg" alt="Multiversa" style={{height:40,marginBottom:24}}/>
            <p style={{color:'#71717A',fontFamily:'var(--font-serif)',fontSize:18,lineHeight:1.6,maxWidth:360,marginBottom:32}}>
              Experimenta como Lab. Entrega como Boutique. Piensa como Consultoría.
            </p>
            <div style={{display:'flex',gap:12}}>
              {['twitter','linkedin','instagram','github'].map(s => (
                <a key={s} className="mv-social"><i data-lucide={s} style={{width:16,height:16}}/></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mv-footer-h">Product</h4>
            <ul className="mv-footer-links">
              <li><a>Features</a></li><li><a>Integrations</a></li><li><a>Pricing</a></li><li><a>Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mv-footer-h">Company</h4>
            <ul className="mv-footer-links">
              <li><a>About</a></li><li><a>Careers</a></li><li><a>Blog</a></li><li><a>Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mv-footer-bar">
          <span>© 2026 Multiversa Group. All Rights Reserved.</span>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            <span style={{display:'flex',alignItems:'center',gap:6}}>
              <span className="mv-dot"/>All systems operational
            </span>
            <span>SOC 2 · GDPR</span>
          </div>
        </div>
        <div className="mv-chrome-strip">MULTIVERSA</div>
      </div>
    </footer>
  );
};
