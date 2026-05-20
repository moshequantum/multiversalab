window.Benchmark = function Benchmark() {
  const rows = [
    ['Brand DNA Scan','Basic','Full Scan','Enterprise','Sovereign'],
    ['AI Orchestration','Exploratory','Lead Gen & Sales','Multi-Channel','Full Hydra Pool'],
    ['Memory Layers','Local (7 days)','Hybrid','L1+L2+L3','L1–L4 Complete'],
    ['Strategic CTO','Not included','Not included','Monthly Sync','Weekly'],
    ['Support Level','FAQ / Bot','Direct Support','Priority','Dedicated'],
    ['Delivery Speed','Instant Access','10-15 Days','30 Days','Custom']
  ];
  return (
    <section className="mv-section" style={{paddingTop:0}}>
      <div className="mv-container">
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <h3 className="mv-h3" style={{fontFamily:'var(--font-serif)',fontSize:'28px',color:'var(--mv-ivory)'}}>Tier Benchmarking</h3>
          <div style={{height:2,width:96,background:'rgba(189,235,52,.3)',margin:'16px auto 0',borderRadius:999}}/>
        </div>
        <div className="mv-bench-wrap">
          <table className="mv-bench">
            <thead>
              <tr>
                <th className="mv-bench-head-feat">Feature</th>
                <th>Nano</th>
                <th className="mv-bench-head-spark">Spark</th>
                <th>Pulse</th>
                <th>Cortex</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td className="mv-bench-feat">{r[0]}</td>
                  <td>{r[1]}</td>
                  <td className="mv-bench-spark">{r[2]}</td>
                  <td>{r[3]}</td>
                  <td>{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
