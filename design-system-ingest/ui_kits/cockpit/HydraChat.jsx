const { useState } = React;

window.HydraChat = function HydraChat({ model }) {
  const [messages, setMessages] = useState([
    { role:'assistant', content:'The DNA nexus has been established correctly. All nodes online and Runa is processing the latest engagement metrics.', model:'gemini' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const send = () => {
    if (!input.trim() || typing) return;
    const userMsg = { role:'user', content:input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, {role:'assistant', content:'Routed through ' + model + '. Drafting the Spark onboarding copy in your brand voice — Auréon is cross-checking with L2 operations memory.', model}]);
      setTyping(false);
    }, 1400);
  };

  return (
    <aside className="mv-hydra">
      <header className="mv-hydra-head">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{fontFamily:'var(--font-serif)',fontSize:16,color:'var(--mv-ivory)'}}>Hydra Pool</div>
          <span className="mv-pill" style={{padding:'3px 10px'}}><span className="mv-dot"/><span className="mv-mono-label" style={{fontSize:9}}>{model}</span></span>
        </div>
        <button className="mv-icon-btn" aria-label="More"><i data-lucide="more-horizontal" style={{width:16,height:16}}/></button>
      </header>
      <div className="mv-hydra-body">
        {messages.map((m,i)=>(
          <div key={i} className={`mv-msg mv-msg-${m.role}`}>
            {m.role==='assistant' && <div className="mv-msg-avatar">⬡</div>}
            <div className="mv-msg-bubble">
              {m.role==='assistant' && <div className="mv-mono-meta" style={{marginBottom:4,fontSize:8}}>{m.model}</div>}
              {m.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="mv-msg mv-msg-assistant">
            <div className="mv-msg-avatar">⬡</div>
            <div className="mv-msg-bubble mv-typing"><span/><span/><span/></div>
          </div>
        )}
      </div>
      <div className="mv-hydra-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask the Triad…"/>
        <button className="mv-send" onClick={send} aria-label="Send"><i data-lucide="arrow-up" style={{width:16,height:16}}/></button>
      </div>
    </aside>
  );
};
