<script lang="ts">
  // Hero — canonical copy from DNA Brand slide 35 (MultiversaLab banner)
</script>

<section class="hero">
  <div class="site stack">

    <div class="meta">
      <span class="mv-pill" style="background: rgba(189, 235, 52, 0.15); color: var(--mv-primary); border-color: rgba(189, 235, 52, 0.3);">Multiversa Group</span>
      <span class="mv-label-muted">IA Agnóstica · Ecosistemas Operativos</span>
    </div>

    <h1 class="mv-two-beat" style="font-size: clamp(3rem, 8vw, 6rem); margin-bottom: 12px;">
      Multiversa<em>Group.</em>
    </h1>

    <p class="lead" style="font-size: clamp(1.25rem, 2.2vw, 1.85rem); font-family: var(--font-serif); font-style: italic; color: var(--mv-ivory); max-width: 48ch; line-height: 1.35; margin-bottom: 8px;">
      Consultoría, arquitectura e implementación de ecosistemas de IA agnóstica.
    </p>

    <p class="lead" style="max-width: 68ch;">
      Creamos ecosistemas operativos donde la IA no reemplaza al humano: <strong>lo amplifica, organiza su conocimiento</strong> y convierte su forma de trabajar en infraestructura.
    </p>

    <blockquote class="frase-madre" style="border-left: 2px solid var(--mv-primary); padding-left: 20px; font-family: var(--font-serif); font-style: italic; font-size: clamp(1.1rem, 1.8vw, 1.35rem); color: rgba(250, 252, 232, 0.85); max-width: 58ch; line-height: 1.45; margin: 12px 0;">
      “Multiversa Group diseña e implementa ecosistemas de IA agnóstica para convertir conocimiento, procesos y criterio humano en operación real.”
    </blockquote>

    <div class="ctas">
      <a class="mv-btn mv-btn-primary" href="#spark-form">
        Solicitar diagnóstico Spark
      </a>
      <a class="mv-btn mv-btn-ghost"
         href="https://github.com/moshequantum/multiversalab"
         target="_blank" rel="noopener">
        Open Source Lab ↗
      </a>
    </div>

    <div class="chips">
      <span class="mv-label-muted">Spark</span>
      <span class="mv-label-muted">Kickstart</span>
      <span class="mv-label-muted">Ecosystem</span>
      <span class="mv-label-muted" style="color: var(--mv-primary);">PulseOS</span>
      <span class="mv-label-muted" style="color: var(--mv-primary);">ElevatOS</span>
      <span class="mv-label-muted">Brain (Invisible Engine)</span>
    </div>
  </div>

  <!-- aurora layer (chartreuse drift) -->
  <div class="aurora" aria-hidden="true"></div>
  <div class="grid-pattern" aria-hidden="true"></div>
</section>

<style>
  .hero {
    min-height: 88vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: clamp(80px, 12vh, 140px);
    padding-bottom: clamp(80px, 12vh, 140px);
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 36px;
    position: relative;
    z-index: 2;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  :global(.hero .mv-two-beat) {
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    max-width: 18ch;
  }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.6vw, 1.375rem);
    line-height: 1.55;
    color: rgba(250, 252, 232, 0.72);
    max-width: 56ch;
    margin: 0;
  }
  .lead strong {
    color: var(--mv-ivory);
    font-weight: 400;
  }

  .ctas {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .chips {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* aurora chartreuse drift inspired by the DNA Brand deck */
  @keyframes aurora-drift {
    0%   { transform: translate3d(-6%, -4%, 0) scale(1);    opacity: 0.6; }
    50%  { transform: translate3d( 6%,  3%, 0) scale(1.12); opacity: 0.85; }
    100% { transform: translate3d(-6%, -4%, 0) scale(1);    opacity: 0.6; }
  }
  .aurora {
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(ellipse 40% 55% at 15% 110%, rgba(189, 235, 52, 0.22), transparent 65%),
      radial-gradient(ellipse 42% 50% at 100% -10%, rgba(189, 235, 52, 0.10), transparent 70%);
    filter: blur(60px);
    animation: aurora-drift 28s ease-in-out infinite;
    mix-blend-mode: screen;
    z-index: 0;
    pointer-events: none;
  }

  .grid-pattern {
    position: absolute;
    inset: 0;
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(189, 235, 52, 0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(189, 235, 52, 0.025) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 30%, black 30%, transparent 75%);
    z-index: 1;
    pointer-events: none;
  }
</style>
