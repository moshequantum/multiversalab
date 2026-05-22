<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import FooterSignature from '$lib/components/FooterSignature.svelte';
</script>

<svelte:head>
  <title>Gracias · Diagnóstico Spark | Multiversa Group</title>
  <meta
    name="description"
    content="Gracias por solicitar tu diagnóstico Spark. Reservá tu llamada con Multiversa Group para revisar tu contexto y diseñar el próximo paso."
  />
</svelte:head>

<Nav />
<main class="thanks-page">
  <section class="thanks-hero">
    <div class="aurora" aria-hidden="true"></div>
    <div class="grid-pattern" aria-hidden="true"></div>

    <div class="site thanks-stack">
      <div class="mv-liquid-glass-pro thanks-card">
        <span class="mv-mono-label">Contexto recibido · Próximo paso</span>
        <h1 class="mv-two-beat">Gracias.<em>Reservá tu Spark.</em></h1>
        <p class="lead">
          Ya recibimos tu contexto. Ahora reservá tu llamada Spark para revisar tu operación, detectar el punto de mayor fricción y definir el primer mapa de implementación.
        </p>
      </div>

      <div class="mv-liquid-glass-pro calendar-card">
        <iframe
          title="Reservar diagnóstico Spark en Cal.com"
          src="https://cal.com/multiversa-group/30min?embed=true&theme=dark"
          loading="lazy"
          allow="camera; microphone; fullscreen; display-capture; autoplay"
        ></iframe>
      </div>
    </div>
  </section>
</main>
<FooterSignature />

<style>
  .thanks-page {
    display: block;
  }

  .thanks-hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding: clamp(96px, 12vh, 140px) var(--space-4) clamp(64px, 10vh, 110px);
  }

  .thanks-stack {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.18fr);
    gap: clamp(24px, 4vw, 48px);
    align-items: stretch;
    position: relative;
    z-index: 2;
  }

  .thanks-card,
  .calendar-card {
    border-radius: var(--radius-xl);
    padding: clamp(28px, 4vw, 44px);
  }

  .thanks-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  :global(.thanks-card .mv-two-beat) {
    font-size: clamp(2.6rem, 6vw, 5rem);
    margin: 18px 0;
  }

  .lead {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.55vw, 1.28rem);
    line-height: 1.6;
    color: rgba(250, 252, 232, 0.72);
    max-width: 58ch;
    margin: 0;
  }

  .calendar-card {
    min-height: 720px;
    padding: 0;
    overflow: hidden;
  }

  .calendar-card iframe {
    width: 100%;
    height: 100%;
    min-height: 720px;
    border: 0;
    background: rgba(0, 0, 0, 0.25);
  }

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

  @media (max-width: 980px) {
    .thanks-stack {
      grid-template-columns: 1fr;
    }

    .calendar-card,
    .calendar-card iframe {
      min-height: 680px;
    }
  }
</style>
