<script lang="ts">
  import { fade } from 'svelte/transition';
  import { dnaTemplates } from './dnaTemplates';
  import { authStore, startDemo } from './stores/auth';
  import { fadeInBlur, scaleHover, staggerCards, slideIn } from './gsapTransitions';
  
  export let onComplete = () => {};

  let currentStep = 0;
  let totalSteps = 4;
  let isSubmitting = false;
  let showDemoSelector = false;

  // Real data structure for the Business Canvas
  let responses = {
    brandName: "",
    industry: "",
    tagline: "",
    mission: "",
    selectedTones: [] as string[],
    personaName: "",
    personaRole: ""
  };

  // Sync with authStore if demo is active
  authStore.subscribe(state => {
    if (state.isDemo && state.brandDNA) {
      responses = {
        brandName: state.brandDNA.name,
        industry: state.brandDNA.industry,
        tagline: state.brandDNA.tagline,
        mission: state.brandDNA.mission,
        selectedTones: state.brandDNA.tones,
        personaName: state.brandDNA.persona.name,
        personaRole: state.brandDNA.persona.role
      };
    }
  });
  
  const tones = ["Audaz", "Elegante", "Minimalista", "Hiper-Tecnológico", "Humano", "Hiper-Eficiente"];

  function handleDemoSelect(niche: string) {
    const template = dnaTemplates[niche];
    if (template) {
      startDemo(template);
      onComplete(); // Jump to Cockpit
    }
  }

  async function nextStep() {
    if (currentStep < totalSteps - 1) {
      currentStep++;
    } else {
      await finalizeOnboarding();
    }
  }

  async function finalizeOnboarding() {
    isSubmitting = true;
    try {
      // Map local state to Go Domain CanvasResponse
      const payload = [
        { question_id: "value_prop", answer: `${responses.brandName}: ${responses.mission}` },
        { question_id: "segments", answer: responses.personaRole },
        { question_id: "industry", answer: responses.industry },
        { question_id: "tone", answer: responses.selectedTones.join(', ') }
      ];

      const res = await fetch('http://localhost:4000/api/v1/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log("CORTEX_LOG: DNA Initialized successfully.");
        onComplete();
      }
    } catch (e) {
      console.error("CORTEX_ERROR: Gateway connection failed.", e);
    } finally {
      isSubmitting = false;
    }
  }

  function prevStep() {
    if (currentStep > 0) currentStep--;
  }

  function goToStep(step: number) {
    if (step < currentStep) currentStep = step;
  }

  function toggleTone(tone: string) {
    if (responses.selectedTones.includes(tone)) {
      responses.selectedTones = responses.selectedTones.filter(t => t !== tone);
    } else {
      responses.selectedTones = [...responses.selectedTones, tone];
    }
  }

  $: toneSample = responses.selectedTones.length > 0 
    ? `Imagina un asistente que es ${responses.selectedTones.join(' y ')}. Así es como Runa hablará por ti.`
    : "Selecciona algunos tonos para ver cómo Runa adaptará tu voz.";

</script>

<div class="onboarding-container grid-bg">
  <div class="wizard-panel">
    <!-- TOPBAR -->
    <div class="topbar">
      <div class="topbar-logo text-ivory">Mult <span class="text-primary italic">iversa</span></div>
      <div class="topbar-sep"></div>
      <div class="topbar-label">ADN de Marca — Onboarding</div>
      <div class="topbar-right">
        <div class="status-indicator">ONION_UI_ACTIVE</div>
      </div>
    </div>

    <div class="step-content">
      <!-- PROGRESS STEPS -->
      <div class="steps-nav">
        {#each Array(totalSteps) as _, i}
          <button 
            type="button"
            class="step-item" 
            class:active={currentStep === i} 
            class:completed={currentStep > i} 
            on:click={() => goToStep(i)}
            aria-label="Ir al paso {i + 1}: {['Identidad', 'Tono', 'Audiencia', 'Propuesta'][i]}"
          >
            <div class="step-dot">{currentStep > i ? '✓' : String(i + 1).padStart(2, '0')}</div>
            <div class="step-label font-mono">{['Identidad', 'Tono', 'Audiencia', 'Propuesta'][i]}</div>
          </button>
        {/each}
      </div>

      <div class="wizard-main">
        {#if currentStep === 0}
          <div use:fadeInBlur={{ delay: 0.05, blur: 14 }} class="step-pane">
            <div class="step-heading">
              <div class="step-eyebrow">Paso 01 de 04</div>
              <h1 class="step-title font-display">Identidad de tu <em class="text-primary">Marca</em></h1>
              <p class="step-desc">Cortex aprenderá quién eres. Runa usará esta información para generar todo tu contenido.</p>
              
              <div class="demo-cta mb-12">
                <button 
                  class="flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-[10px] font-mono uppercase tracking-widest text-primary"
                  on:click={() => showDemoSelector = !showDemoSelector}
                >
                  <span class="material-symbols-outlined text-sm">rocket_launch</span>
                  {showDemoSelector ? 'Cerrar Demos' : 'Explorar Demos por Nicho'}
                </button>
              </div>

              {#if showDemoSelector}
                <div use:staggerCards={{ stagger: 0.06 }} class="grid grid-cols-2 gap-4 mb-12" role="group" aria-label="Selección de Demo">
                  {#each Object.entries(dnaTemplates) as [key, dna]}
                    <button 
                      type="button"
                      use:scaleHover={{ scale: 1.03 }}
                      class="niche-card p-6 rounded-3xl border border-white/5 bg-surface/50 hover:border-primary/30 text-left transition-all" 
                      on:click={() => handleDemoSelect(key)}
                    >
                      <h3 class="text-xs font-medium text-white mb-2 uppercase tracking-tight">{key}</h3>
                      <p class="text-[9px] text-ivory/40 font-mono tracking-tighter leading-tight italic">"{dna.name}": {dna.tagline}</p>
                    </button>
                  {/each}
                </div>
              {/if}
            </div>

            <div class="form-grid">
              <div class="form-group span-2">
                <label for="brandName">Nombre Comercial</label>
                <input type="text" id="brandName" bind:value={responses.brandName} placeholder="Ej. Aurora Creative">
              </div>
              <div class="form-group">
                <label for="brandIndustry">Industria</label>
                <input type="text" id="brandIndustry" bind:value={responses.industry} placeholder="Marketing, Real Estate...">
              </div>
              <div class="form-group">
                <label for="brandTagline">Tagline / Eslogan</label>
                <input type="text" id="brandTagline" bind:value={responses.tagline} placeholder="Elevando el estándar...">
              </div>
              <div class="form-group span-2">
                <label for="brandMission">Misión en 1 frase</label>
                <textarea id="brandMission" bind:value={responses.mission} placeholder="Transformamos la manera en que..."></textarea>
              </div>
            </div>
          </div>
        {:else if currentStep === 1}
          <div use:fadeInBlur={{ delay: 0.05, blur: 14 }} class="step-pane">
            <div class="step-heading">
              <div class="step-eyebrow">Paso 02 de 04</div>
              <h1 class="step-title font-display">Tono de <em class="text-primary">Voz</em></h1>
              <p class="step-desc">Runa necesita saber cómo habla tu marca. Selecciona los atributos que mejor la describen.</p>
            </div>

            <div class="tone-grid">
              {#each tones as tone}
                <button use:scaleHover={{ scale: 1.04 }} class="tone-card" class:active={responses.selectedTones.includes(tone)} on:click={() => toggleTone(tone)}>
                  <span class="tone-name">{tone}</span>
                  {#if responses.selectedTones.includes(tone)}
                    <span class="tone-check" in:fade>✓</span>
                  {/if}
                </button>
              {/each}
            </div>
          </div>
        {:else if currentStep === 2}
          <div use:fadeInBlur={{ delay: 0.05, blur: 14 }} class="step-pane">
            <div class="step-heading">
              <div class="step-eyebrow">Paso 03 de 04</div>
              <h1 class="step-title font-display-normal">Tu <em class="text-primary italic">Audiencia</em> Ideal</h1>
              <p class="step-desc">Define a quién le estamos hablando. Auréon optimizará los flujos para estos perfiles.</p>
            </div>

            <div class="persona-card">
              <div class="persona-card-header">
                <div class="persona-avatar">👤</div>
                <input type="text" class="persona-name-input font-display-normal" bind:value={responses.personaName} placeholder="Nombre del perfil">
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label for="role">Cargo / Rol</label>
                  <input type="text" bind:value={responses.personaRole} placeholder="CEO, Inversionista...">
                </div>
                <div class="form-group">
                  <label for="pain">Dolor Principal</label>
                  <input type="text" placeholder="Falta de tiempo, poca escalabilidad...">
                </div>
              </div>
            </div>
          </div>
        {:else if currentStep === 3}
          <div use:fadeInBlur={{ delay: 0.05, blur: 14 }} class="step-pane">
             <div class="step-heading text-center">
                <div class="step-eyebrow">Paso 04 de 04</div>
                <h1 class="step-title font-display">¿Listo para <em class="text-primary">Desplegar</em>?</h1>
                <p class="step-desc mx-auto max-w-lg">Hemos capturado el ADN de tu negocio. Al confirmar, Auréon inicializará los nodos de IA y Runa comenzará la orquestación.</p>
             </div>
             
             <div class="summary-box liquid-glass-pro">
                <div class="summary-item">
                   <span>Marca</span>
                   <strong>{responses.brandName || 'Por definir'}</strong>
                </div>
                <div class="summary-item">
                   <span>Tono</span>
                   <strong>{responses.selectedTones.length} atributos activos</strong>
                </div>
                <div class="summary-item">
                   <span>Avatar</span>
                   <strong>{responses.personaName || 'Anónimo'}</strong>
                </div>
             </div>
          </div>
        {/if}

        <div class="wizard-nav">
          <button class="btn-prev" disabled={currentStep === 0} on:click={prevStep}>← Anterior</button>
          <button class="btn-next" on:click={nextStep} disabled={isSubmitting}>
            {isSubmitting ? 'Iniciando ADN...' : (currentStep === totalSteps - 1 ? 'Activar ADN ✦' : 'Continuar →')}
          </button>
          <div class="step-counter">{currentStep + 1} / {totalSteps}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="preview-panel liquid-glass-pro">
     <div class="preview-header">
       <div class="preview-title">Neural Engine Preview</div>
       <div class="preview-badge">Live</div>
     </div>

     <div class="preview-canvas">
        <div class="dna-strand">
           <div class="dna-node" style="--d: 0s"></div>
           <div class="dna-node" style="--d: 0.5s"></div>
           <div class="dna-node" style="--d: 1s"></div>
        </div>

        <div class="preview-content">
           <div class="brand-preview">
              <span class="font-mono text-[8px] uppercase tracking-widest text-sand-muted">OUTPUT_IDENTITY</span>
              <h2 class="font-heading text-4xl italic text-white mt-2">{responses.brandName || "Sin Nombre"}</h2>
              <p class="font-mono text-[10px] text-primary mt-1 tracking-widest uppercase">{responses.industry || "INDS_UNDEFINED"}</p>
           </div>

           <div class="mt-12 space-y-6">
               <div class="runa-card p-4">
                 <div class="text-[9px] font-mono text-sand-400 uppercase tracking-widest mb-2">MUESTRA DE TONO</div>
                 <div class="text-xs italic text-sand-100 leading-relaxed border-l-2 border-primary pl-3">
                   "{toneSample}"
                 </div>
               </div>

               <div class="grid grid-cols-2 gap-4">
                 <div class="stat-card">
                   <span class="stat-val">{responses.selectedTones.length * 15}%</span>
                   <span class="stat-label">Neural Match</span>
                 </div>
                 <div class="stat-card">
                   <span class="stat-val">Low</span>
                   <span class="stat-label">Entropy</span>
                 </div>
               </div>
           </div>
        </div>
     </div>
  </div>
</div>

<style>
  :root {
    --carbon-900: #0A0A0F;
    --carbon-800: #111116;
    --sand-50: #FAFCE8;
    --sand-100: #F0EDE6;
    --sand-200: #C8C4BC;
    --sand-300: #b8b4ac;
    --sand-400: #6e6b65;
    
    background: var(--color-background);
    color: var(--color-ivory);
    min-height: 100vh;
    font-family: var(--font-plus);
  }

  .grid-bg {
    background-image: 
      linear-gradient(rgba(189, 235, 52, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(189, 235, 52, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .onboarding-container {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    overflow-x: hidden;
  }

  /* WIZARD PANEL */
  .wizard-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem 4rem;
    position: relative;
    z-index: 10;
    min-height: 0;
  }

  .topbar {
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
  }
  .topbar-logo { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 500; }
  .topbar-sep { width: 1px; height: 1.2rem; background: rgba(255,255,255,0.1); margin: 0 1.5rem; }
  .topbar-label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.2rem; color: var(--sand-300); }
  .topbar-right { margin-left: auto; }
  .status-indicator { font-family: var(--font-mono); font-size: 9px; padding: 4px 12px; border: 1px solid var(--color-primary); border-radius: 100px; color: var(--color-primary); }

  .step-content { 
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    min-height: 0;
    padding-right: 1rem;
  }

  .step-content::-webkit-scrollbar { width: 4px; }
  .step-content::-webkit-scrollbar-track { background: transparent; }
  .step-content::-webkit-scrollbar-thumb { background: rgba(189, 235, 52, 0.2); border-radius: 10px; }

  .steps-nav { display: flex; gap: 3rem; margin-bottom: 5rem; }
  .step-item { display: flex; align-items: center; gap: 1rem; cursor: pointer; opacity: 0.4; transition: 0.3s; }
  .step-item.active { opacity: 1; }
  .step-item.completed { opacity: 0.8; color: var(--color-primary); }
  .step-dot { width: 2.2rem; height: 2.2rem; border: 1px solid currentColor; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 11px; }
  .step-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15rem; }

  .wizard-main { flex: 1; display: flex; flex-direction: column; max-width: 600px; min-height: 0; }
  .step-eyebrow { font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.2rem; color: var(--color-primary); margin-bottom: 1rem; }
  .step-title { font-family: var(--font-heading); font-size: 3.2rem; font-weight: 500; line-height: 1.05; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
  .step-desc { font-family: var(--font-body); font-size: 1rem; font-weight: 300; line-height: 1.7; color: var(--sand-200); margin-bottom: 3rem; }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .span-2 { grid-column: span 2; }
  .form-group label { display: block; font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; letter-spacing: 0.1rem; color: var(--sand-400); margin-bottom: 0.8rem; }
  .form-group input, .form-group textarea {
    width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    padding: 1.2rem; border-radius: 1rem; color: white; font-family: var(--font-plus); transition: 0.3s;
  }
  .form-group input:focus { outline: none; border-color: var(--color-primary); background: rgba(184,255,71,0.05); }

  .tone-grid { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 1.2rem; 
  }
  .tone-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    padding: 2rem 1.5rem; border-radius: 1.5rem; position: relative; cursor: pointer; transition: 0.3s;
    text-align: left;
  }
  .tone-card:hover { border-color: rgba(255,255,255,0.2); }
  .tone-card.active { border-color: var(--color-primary); background: rgba(184,255,71,0.08); }

  .persona-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 3rem; border-radius: 2rem; }
  .persona-card-header { display: flex; align-items: center; gap: 2rem; margin-bottom: 3rem; }
  .persona-avatar { width: 4rem; height: 4rem; background: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  .persona-name-input { background: none; border: none; font-family: var(--font-heading); font-size: 2.5rem; font-weight: 400; color: white; border-bottom: 1px solid rgba(255,255,255,0.1); width: 100%; }
  .persona-name-input:focus { outline: none; border-color: var(--color-primary); }

  .summary-box { padding: 3rem; border-radius: 2.5rem; display: flex; flex-direction: column; gap: 2rem; width: 100%; }
  .summary-item { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem; }
  .summary-item span { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; color: var(--sand-400); }
  .summary-item strong { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 500; font-style: italic; color: var(--color-primary); }

  .wizard-nav { margin-top: auto; padding: 4rem 0 2rem; display: flex; align-items: center; gap: 2rem; }
  .btn-prev { background: none; border: 1px solid rgba(255,255,255,0.1); color: var(--sand-200); padding: 1rem 2.5rem; border-radius: 100px; cursor: pointer; font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .btn-prev:hover { border-color: rgba(255,255,255,0.2); color: white; transform: translateX(-2px); }
  .btn-next { background: var(--color-primary); border: none; color: black; font-weight: 500; padding: 1.2rem 3.5rem; border-radius: 100px; cursor: pointer; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; box-shadow: 0 10px 30px rgba(184,255,71,0.2); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .btn-next:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 15px 40px rgba(184,255,71,0.3); }
  .step-counter { margin-left: auto; font-family: var(--font-mono); font-size: 10px; color: var(--sand-400); }

  /* PREVIEW PANEL */
  .preview-panel {
    width: 450px;
    height: fit-content;
    max-height: calc(100vh - 3rem);
    margin: 1.5rem;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    overflow: hidden;
    position: sticky;
    top: 1.5rem;
  }

  .preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
  .preview-title { font-family: var(--font-mono); font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15rem; color: var(--sand-300); }
  .preview-badge { font-family: var(--font-mono); font-size: 8px; font-weight: 900; background: rgba(184,255,71,0.1); color: var(--color-primary); padding: 4px 12px; border-radius: 100px; border: 1px solid var(--color-primary); }

  .preview-canvas { flex: 1; border: 1px solid rgba(255,255,255,0.05); border-radius: 2rem; background: rgba(0,0,0,0.2); position: relative; padding: 2rem; display: flex; flex-direction: column; }
  .dna-strand { position: absolute; top: -50px; right: 2rem; height: 100%; display: flex; flex-direction: column; gap: 80px; opacity: 0.2; }
  .dna-node { width: 10px; height: 10px; background: var(--color-primary); border-radius: 50%; box-shadow: 0 0 20px var(--color-primary); animation: glow 3s infinite; animation-delay: var(--d); }

  .preview-content { position: relative; z-index: 5; }
  .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 1.5rem; text-align: center; }
  .stat-val { display: block; font-size: 1.5rem; font-weight: 900; color: white; margin-bottom: 0.4rem; }
  .stat-label { font-family: var(--font-mono); font-size: 8px; text-transform: uppercase; color: var(--sand-400); }

  @keyframes glow {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.5); opacity: 1; }
  }
</style>
