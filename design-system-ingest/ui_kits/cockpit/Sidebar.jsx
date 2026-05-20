window.Sidebar = function Sidebar({ collapsed, onToggle, selected, onSelect, assets }) {
  const tabs = [
    { id:'dashboard', label:'Dashboard', icon:'layout-dashboard' },
    { id:'assets', label:'Assets', icon:'boxes' },
    { id:'agents', label:'Agents', icon:'bot' },
    { id:'memory', label:'Memory Layers', icon:'database' },
    { id:'integrations', label:'Integrations', icon:'link-2' },
    { id:'settings', label:'Settings', icon:'settings' }
  ];
  return (
    <aside className={`mv-sidebar ${collapsed?'mv-sb-collapsed':''}`}>
      <div className="mv-sb-top">
        <button className="mv-sb-toggle" onClick={onToggle} aria-label="Toggle">
          <i data-lucide={collapsed?'panel-left-open':'panel-left-close'} style={{width:16,height:16}}/>
        </button>
      </div>
      <nav className="mv-sb-nav">
        {tabs.map(t => (
          <button key={t.id} onClick={()=>onSelect(t.id)} className={`mv-sb-item ${selected===t.id?'mv-sb-active':''}`}>
            <i data-lucide={t.icon} style={{width:18,height:18,flexShrink:0}}/>
            {!collapsed && <span>{t.label}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div className="mv-sb-assets">
          <div className="mv-mono-label" style={{color:'rgba(250,252,232,.4)',padding:'0 4px 12px'}}>Live Assets</div>
          {assets.map(a => (
            <div key={a.id} className="mv-sb-asset">
              <span className="mv-sb-asset-dot" style={{background:a.color}}/>
              <span style={{flex:1,minWidth:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.name}</span>
              <span className="mv-mono-meta" style={{fontSize:8}}>{a.status}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mv-sb-foot">
        {!collapsed && <div className="mv-mono-meta">Node · NANOBANANA</div>}
        <div className="mv-pill" style={{padding:'4px 10px'}}>
          <span className="mv-dot"/>{!collapsed && <span className="mv-mono-label" style={{fontSize:9}}>L1–L4 Ready</span>}
        </div>
      </div>
    </aside>
  );
};
