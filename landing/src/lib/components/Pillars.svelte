<script lang="ts">
  // Fases Comerciales y Resultados — Ecosistemas de IA Agnóstica

  type Phase = {
    glyph: '◎' | '⬡' | '✦';
    glow: 'violet' | 'teal' | 'rose';
    code: string;
    name: string;
    summary: string;
    detail: string;
  };

  const phases: Phase[] = [
    {
      glyph: '◎',
      glow: 'teal',
      code: 'FASE 01',
      name: 'Spark',
      summary: 'Consultoría inicial y arquitectura de sistemas.',
      detail: 'Diagnóstico profundo, mapa del ecosistema de IA, oportunidades, análisis de riesgos y diseño de la ruta tecnológica a seguir.'
    },
    {
      glyph: '✦',
      glow: 'rose',
      code: 'FASE 02',
      name: 'Kickstart',
      summary: 'Implementación acelerada en 90 días.',
      detail: 'Construimos e integramos la primera versión operativa del ecosistema personalizado de IA, listo para automatizar tus operaciones.'
    },
    {
      glyph: '⬡',
      glow: 'violet',
      code: 'FASE 03',
      name: 'Ecosystem',
      summary: 'Acompañamiento continuo y evolución.',
      detail: 'Mantenimiento del sistema vivo, actualizaciones continuas de modelos, optimización de prompts/flujos y expansión según tu escala.'
    }
  ];
</script>

<section id="fases" class="pillars">
  <div class="site">

    <div class="mv-chrome-top">
      <span class="mv-label">Cap II · Metodología · Fases Comerciales</span>
      <span class="mv-label-muted">03 / 06</span>
    </div>

    <div class="head">
      <h2 class="mv-two-beat">
        Nuestras Fases —
        <em>cómo construimos tu ecosistema.</em>
      </h2>
      <p class="lead">
        El viaje hacia la automatización real comienza en la consultoría y evoluciona en sistemas vivos adaptados a tu escala y necesidades.
      </p>
    </div>

    <!-- Commercial Phases Grid -->
    <div class="grid">
      {#each phases as p}
        <article class="mv-card pillar glow-{p.glow}">
          <header>
            <span class="glyph glyph-{p.glow}">{p.glyph}</span>
            <div class="codes">
              <span class="mv-label">{p.code}</span>
              <span class="status status-ready">Fase Activa</span>
            </div>
          </header>

          <h3 class="name">
            {p.name}
          </h3>

          <p class="summary">{p.summary}</p>

          <p class="detail">{p.detail}</p>
        </article>
      {/each}
    </div>

    <!-- Results Section (PulseOS vs ElevatOS) -->
    <div class="results-container">
      <div class="mv-chrome-top">
        <span class="mv-label">El Destino · La Decisión Correcta</span>
        <span class="mv-label-muted">Resultado de Spark</span>
      </div>

      <div class="results-grid">
        <div class="mv-card result glow-teal">
          <h4 class="result-title">Pulse<em>OS.</em></h4>
          <span class="result-badge">Para Individuos</span>
          <p class="result-text">
            Si eres un consultor, creador independiente, profesional o experto que busca amplificar su capacidad productiva, gestionar su conocimiento personal y automatizar sus canales.
          </p>
        </div>

        <div class="mv-card result glow-violet">
          <h4 class="result-title">Elevat<em>OS.</em></h4>
          <span class="result-badge badge-premium">Para Equipos</span>
          <p class="result-text">
            Si operas una agencia, un equipo en crecimiento, una empresa establecida o múltiples operaciones complejas que requieren seguridad de roles, RLS y semillado relacional.
          </p>
        </div>
      </div>
    </div>

    <!-- Invisible Infrastructure (Brain Notice) -->
    <div class="brain-notice">
      <div class="brain-card">
        <span class="mv-mono-label">Infraestructura Invisible</span>
        <h3>Multiversa<em>Brain.</em></h3>
        <p>
          <strong>Brain no se vende como un producto principal: es el motor interno del ecosistema.</strong> Desarrollado como un Gateway en Go y una aplicación multiplataforma con Tauri, actúa de forma silenciosa para infundir lógica persistente, memoria a largo plazo y tu criterio operativo en cada automatización.
        </p>
      </div>
    </div>

  </div>
</section>

<style>
  :global(.pillars .mv-two-beat) {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    max-width: 22ch;
  }

  .head { max-width: 880px; margin-bottom: 56px; }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.6);
    margin: 24px 0 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 64px;
  }
  @media (min-width: 768px)  { .grid { grid-template-columns: repeat(3, 1fr); } }

  .pillar {
    display: flex;
    flex-direction: column;
    gap: 18px;
    height: 100%;
    justify-content: space-between;
    padding: 36px 32px;
  }

  .pillar.glow-violet { box-shadow: 0 0 60px rgba(168, 148, 255, 0.04); }
  .pillar.glow-teal   { box-shadow: 0 0 60px rgba(78, 205, 196, 0.04); }
  .pillar.glow-rose   { box-shadow: 0 0 60px rgba(255, 107, 157, 0.04); }

  .pillar:hover.glow-violet { box-shadow: 0 0 80px rgba(168, 148, 255, 0.12); }
  .pillar:hover.glow-teal   { box-shadow: 0 0 80px rgba(78, 205, 196, 0.12); }
  .pillar:hover.glow-rose   { box-shadow: 0 0 80px rgba(255, 107, 157, 0.12); }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .glyph {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: 2.75rem;
    line-height: 1;
  }
  .glyph-violet { color: var(--mv-astursadeth); }
  .glyph-teal   { color: var(--mv-aureon); }
  .glyph-rose   { color: var(--mv-runa); }

  .codes { display: flex; flex-direction: column; gap: 6px; align-items: flex-end; }

  .status {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .status-ready { color: var(--mv-primary); border-color: rgba(189, 235, 52, 0.25); background: rgba(189, 235, 52, 0.06); }

  .name {
    margin: 0;
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: clamp(1.75rem, 2.5vw, 2.25rem);
    line-height: 1.1;
    color: var(--mv-ivory);
    letter-spacing: -0.02em;
  }

  .summary {
    font-family: var(--font-sans);
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.45;
    color: var(--mv-ivory);
    margin: 0;
  }

  .detail {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 0.95rem;
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.55);
    margin: 0;
    border-left: 2px solid rgba(255, 255, 255, 0.08);
    padding-left: 14px;
    flex-grow: 1;
  }

  /* Results Section Styling */
  .results-container {
    margin-top: 64px;
    padding-top: 48px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    margin-top: 32px;
  }
  @media (min-width: 768px) { .results-grid { grid-template-columns: 1fr 1fr; } }

  .result {
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }

  .result-title {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(2rem, 3.5vw, 3rem);
    line-height: 1;
    color: var(--mv-ivory);
    font-weight: 400;
  }
  .result-title em {
    font-style: italic;
    font-weight: 300;
    color: var(--mv-primary);
  }

  .result-badge {
    align-self: flex-start;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(78, 205, 196, 0.1);
    color: #4ecdc4;
    border: 1px solid rgba(78, 205, 196, 0.25);
  }
  .badge-premium {
    background: rgba(168, 148, 255, 0.1);
    color: #a894ff;
    border: 1px solid rgba(168, 148, 255, 0.25);
  }

  .result-text {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(250, 252, 232, 0.72);
    margin: 0;
  }

  /* Brain Notice notice card */
  .brain-notice {
    margin-top: 64px;
    padding-top: 32px;
  }

  .brain-card {
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 24px;
    padding: 48px;
    max-width: 880px;
    margin: 0 auto;
    text-align: center;
    box-shadow: var(--shadow-glass);
  }
  .brain-card h3 {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    margin: 16px 0;
    font-weight: 400;
    color: var(--mv-ivory);
  }
  .brain-card h3 em {
    font-style: italic;
    color: var(--mv-primary);
    font-weight: 300;
  }
  .brain-card p {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(250, 252, 232, 0.65);
    margin: 0;
  }
  .brain-card strong {
    color: var(--mv-ivory);
    font-weight: 400;
  }
</style>
