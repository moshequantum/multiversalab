window.AssetCard = function AssetCard({ asset }) {
  return (
    <article className="mv-asset-card">
      <div className="mv-asset-head">
        <div className="mv-asset-chip" style={{color:asset.color,borderColor:`${asset.color}33`,background:`${asset.color}14`}}>
          <i data-lucide={asset.icon} style={{width:20,height:20}}/>
        </div>
        <span className={`mv-asset-status ${asset.status==='Active'?'mv-asset-live':''}`}>
          <span className="mv-dot" style={{background:asset.status==='Active'?'var(--mv-primary)':'#71717A'}}/>
          <span className="mv-mono-label" style={{fontSize:9,color:asset.status==='Active'?'var(--mv-primary)':'#71717A'}}>{asset.status}</span>
        </span>
      </div>
      <h3 className="mv-asset-name">{asset.name}</h3>
      <div className="mv-mono-meta">{asset.type}</div>
      <div className="mv-asset-meta-row">
        <div><div className="mv-mono-meta" style={{fontSize:8}}>Sessions · 24h</div><div style={{fontFamily:'var(--font-serif)',fontSize:22,color:'var(--mv-ivory)'}}>{asset.sessions}</div></div>
        <div><div className="mv-mono-meta" style={{fontSize:8}}>Conversion</div><div style={{fontFamily:'var(--font-serif)',fontSize:22,color:'var(--mv-primary)'}}>{asset.conv}</div></div>
      </div>
      <button className="mv-asset-cta">Open · {asset.name}<i data-lucide="arrow-up-right" style={{width:14,height:14}}/></button>
    </article>
  );
};
