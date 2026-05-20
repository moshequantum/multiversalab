<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { authStore } from './stores/auth';
  import AgentStatusNexus from './components/AgentStatusNexus.svelte';
  import BrandHeader from './components/BrandHeader.svelte';
  import FloatingDemo from './components/FloatingDemo.svelte';
  import { fadeInBlur, slideIn, staggerCards, hoverLift, pulseGlow, scaleHover, animateDimension } from './gsapTransitions';
  import { hydraPool, type ChatMessage, type AIModel } from './services/HydraService';

  let brandName = "Nexus";
  let industry = "Consulting Lab";
  let isDemo = false;
  let isPaid = false;
  let currentUser = "Anonymous Entity";

  authStore.subscribe(state => {
    isDemo = state.isDemo;
    isPaid = state.isPaid;
    currentUser = state.user?.name || (state.isGod ? "Moshé @ Multiversa" : "Anonymous Entity");
    if (state.brandDNA) {
      brandName = state.brandDNA.name || "Nexus";
      industry = state.brandDNA.industry || "Consulting Lab";
    }
  });

  // Sidebar States for Premium UX
  let leftCollapsed = false;
  let rightCollapsed = false;

  // Hydra Pool State
  const models: { id: AIModel; name: string; icon: string }[] = [
    { id: 'auto', name: 'Neural Router', icon: 'hub' },
    { id: 'gemini', name: 'Gemini 1.5 Pro', icon: 'temp_preserve' },
    { id: 'mistral', name: 'Mistral Large', icon: 'cyclone' },
    { id: 'groq', name: 'Groq Llama 3', icon: 'bolt' }
  ];
  let activeModel: AIModel = 'auto';

  // Mock Assets data
  const assets = [
    { id: 1, name: "Landing Page", type: "Web App", status: "Active", icon: "language", color: "#BDEB34" },
    { id: 2, name: "Neural Chatbot", type: "AI Agent", status: "Active", icon: "neurology", color: "#61dafbaa" },
    { id: 3, name: "Sales Funnel", type: "Marketing", status: "Draft", icon: "filter_alt", color: "#ff9f5a" }
  ];

  let selectedTab = "dashboard";
  let auréonMessage = "El nexo de ADN se ha establecido correctamente. Todos los nodos están en línea y Runa está procesando las últimas métricas de engagement.";
  
  // Chat Logic
  let chatInput = "";
  let chatHistory: ChatMessage[] = [
    { role: 'assistant', content: auréonMessage, model: 'gemini' }
  ];
  let isTyping = false;

  async function handleSendMessage() {
    if (!chatInput.trim() || isTyping) return;
    
    const userMsg: ChatMessage = { role: 'user', content: chatInput };
    chatHistory = [...chatHistory, userMsg];
    chatInput = "";
    isTyping = true;

    try {
      const response = await hydraPool.chat(chatHistory, activeModel);
      const assistantMsg: ChatMessage = { 
        role: 'assistant', 
        content: response.content, 
        model: response.model as AIModel 
      };
      chatHistory = [...chatHistory, assistantMsg];
    } catch (err) {
      console.error("Hydra Error:", err);
    } finally {
      isTyping = false;
    }
  }

</script>

<div in:fade={{ duration: 800 }} class="flex h-screen w-screen overflow-hidden bg-background text-ivory selection:bg-primary/20">
  
  <!-- LEFT SIDEBAR -->
  <aside 
    use:slideIn={{ from: 'left', delay: 0.1 }} 
    use:animateDimension={{ width: leftCollapsed ? '80px' : '288px' }}
    class="sidebar border-r border-white/5 bg-surface flex flex-col p-6 relative group overflow-hidden"
  >
    <!-- Toggle Button -->
    <button 
      on:click={() => leftCollapsed = !leftCollapsed}
      class="absolute -right-3 top-20 w-6 h-6 bg-surface border border-white/10 rounded-full flex items-center justify-center text-ivory/40 hover:text-primary transition-all z-50 shadow-xl opacity-0 group-hover:opacity-100"
    >
      <span class="material-symbols-outlined text-xs">{leftCollapsed ? 'chevron_right' : 'chevron_left'}</span>
    </button>

    <div class="mb-8 flex items-center gap-4 px-2 overflow-hidden">
      <div class="w-10 h-10 min-w-[2.5rem] bg-lime rounded-full flex items-center justify-center shadow-lime-glow">
        <span class="material-symbols-outlined text-carbon font-black">hub</span>
      </div>
      {#if !leftCollapsed}
        <div class="flex flex-col">
          <span class="font-serif text-xl text-ivory tracking-tighter">Nexus</span>
          <span class="font-mono text-[8px] uppercase tracking-widest text-primary">Orchestrator v2</span>
        </div>
      {/if}
    </div>

    <!-- Agent Triad Status -->
    {#if !leftCollapsed}
      <div class="mb-10 px-2" use:fadeInBlur={{ delay: 0.3 }}>
        <AgentStatusNexus status={isTyping ? 'processing' : 'idle'} activeAgent="aureon" />
      </div>
    {/if}

    <nav class="space-y-4" aria-label="Navegación Principal">
      <button 
        class="nav-btn" 
        class:active={selectedTab === 'dashboard'} 
        on:click={() => selectedTab = 'dashboard'}
        aria-current={selectedTab === 'dashboard' ? 'page' : undefined}
        aria-label="Ir al Cockpit"
        use:scaleHover={{ scale: 1.02 }}
      >
        <span class="material-symbols-outlined" aria-hidden="true">grid_view</span>
        {#if !leftCollapsed}
            <span class="hidden lg:block">Cockpit</span>
        {/if}
      </button>
      <button 
        class="nav-btn" 
        class:active={selectedTab === 'agents'} 
        on:click={() => selectedTab = 'agents'}
        aria-current={selectedTab === 'agents' ? 'page' : undefined}
        aria-label="Ver Agentes Trinity"
      >
        <span class="material-symbols-outlined" aria-hidden="true">neurology</span>
        {#if !leftCollapsed}
          <span in:fade={{ duration: 200 }}>Agentes Trinity</span>
        {/if}
      </button>
      <button 
        class="nav-btn" 
        class:active={selectedTab === 'memory'} 
        on:click={() => selectedTab = 'memory'}
        aria-current={selectedTab === 'memory' ? 'page' : undefined}
        aria-label="Acceder a Memoria Engram"
      >
        <span class="material-symbols-outlined" aria-hidden="true">analytics</span>
        {#if !leftCollapsed}
            <span class="hidden lg:block">Memoria Engram</span>
        {/if}
      </button>
      <button 
        class="nav-btn" 
        class:active={selectedTab === 'settings'} 
        on:click={() => selectedTab = 'settings'}
        aria-current={selectedTab === 'settings' ? 'page' : undefined}
        aria-label="Configuración del Sistema"
      >
        <span class="material-symbols-outlined" aria-hidden="true">settings_suggest</span>
        {#if !leftCollapsed}
            <span class="hidden lg:block">Configuración</span>
        {/if}
      </button>
    </nav>

    <div class="mt-auto pt-6 border-t border-white/5">
      <div class="flex items-center gap-3 px-2 mb-6 overflow-hidden">
        <div class="w-8 h-8 min-w-[2.5rem] rounded-lg bg-surface/50 border border-white/5 flex items-center justify-center">
          <span class="material-symbols-outlined text-sm text-ivory/40">person</span>
        </div>
        {#if !leftCollapsed}
          <div in:fade={{ duration: 200 }} class="overflow-hidden">
            <p class="text-[10px] font-bold text-white truncate">{currentUser}</p>
            <p class="text-[8px] font-mono text-ivory/40 uppercase tracking-tighter">Admin Access</p>
          </div>
        {/if}
      </div>
      <button class="w-full flex items-center gap-3 px-4 py-2 text-ivory/40 hover:text-white transition-all text-xs font-mono">
        <span class="material-symbols-outlined text-sm">power_settings_new</span>
        <span class="hidden lg:block uppercase tracking-widest">Disconnect</span>
      </button>
    </div>
  </aside>

  <!-- MAIN CANVAS -->
  <main class="flex-grow flex flex-col relative overflow-hidden min-h-0">
    <div class="absolute inset-0 bg-grid-bg opacity-30 pointer-events-none"></div>

    <!-- Top Info Bar -->
    <header class="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-10 z-10">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-heading italic text-white leading-none">{brandName}</h1>
          {#if isDemo}
            <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[7px] font-mono border border-primary/20 animate-pulse uppercase tracking-wider">Demo</span>
          {/if}
        </div>
        <div class="h-4 w-px bg-white/5"></div>
        <span class="font-mono text-[9px] text-primary font-bold tracking-[0.2em] uppercase">{industry}</span>
        <div class="w-1.5 h-1.5 rounded-full bg-primary shadow-primary/20 animate-pulse ml-2"></div>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2 group cursor-pointer">
          <span class="material-symbols-outlined text-sm text-ivory/40 group-hover:text-primary transition-colors">notifications</span>
          <span class="font-mono text-[9px] text-ivory/40 uppercase">2 Alertas</span>
        </div>
        <div class="h-4 w-px bg-white/5"></div>
        <span class="font-mono text-[9px] text-ivory/40 uppercase italic">Protocol: {isDemo ? 'SIMULATION' : 'AURÉON_OS'}</span>
      </div>
    </header>

    <div class="flex-grow overflow-y-auto p-12 lg:p-20 z-10 custom-scrollbar min-h-0">
      <!-- Welcome Header -->
      <section class="mb-20">
        <div class="flex items-center gap-6 mb-4">
            <h2 class="font-heading text-6xl font-medium italic text-white tracking-tight">Cockpit Dashboard</h2>
            <div class="h-px flex-grow bg-gradient-to-r from-white/5 to-transparent translate-y-2"></div>
        </div>
        <p class="font-mono text-[10px] text-ivory/40 uppercase tracking-[0.4em]">Gestión Centralizada de Assets de Inteligencia</p>
      </section>

      <!-- Trinity Status Cards -->
      <div use:staggerCards={{ stagger: 0.1, delay: 0.2 }} class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        <div use:hoverLift={{ glowColor: '#BDEB3440' }} class="trinity-card group liquid-glass-pro" style="--accent: #BDEB34">
           <div class="flex justify-between items-start mb-4">
             <span class="material-symbols-outlined text-accent text-3xl">bolt</span>
             <span class="font-mono text-[8px] border border-accent/20 px-2 py-0.5 rounded text-accent">94ms Latencia</span>
           </div>
           <h3 class="font-heading font-medium italic text-lg text-white mb-1">Astursadeth</h3>
           <p class="text-[10px] text-ivory/40 uppercase tracking-widest font-mono">Motor de Velocidad</p>
        </div>
        <div use:hoverLift={{ glowColor: '#ff9f5a40' }} class="trinity-card group liquid-glass-pro" style="--accent: #ff9f5a">
           <div class="flex justify-between items-start mb-4">
             <span class="material-symbols-outlined text-accent text-3xl">psychology</span>
             <span class="font-mono text-[8px] border border-accent/20 px-2 py-0.5 rounded text-accent">Aptitud: 100%</span>
           </div>
           <h3 class="font-heading font-medium italic text-lg text-white mb-1">Auréon</h3>
           <p class="text-[10px] text-ivory/40 uppercase tracking-widest font-mono">Motor Lógico</p>
        </div>
        <div use:hoverLift={{ glowColor: '#9333ea40' }} class="trinity-card group liquid-glass-pro" style="--accent: #9333ea">
           <div class="flex justify-between items-start mb-4">
             <span class="material-symbols-outlined text-accent text-3xl">auto_awesome</span>
             <span class="font-mono text-[8px] border border-accent/20 px-2 py-0.5 rounded text-accent">Creatividad: Max</span>
           </div>
           <h3 class="font-heading font-medium italic text-lg text-white mb-1">Runa</h3>
           <p class="text-[10px] text-ivory/40 uppercase tracking-widest font-mono">Motor Empático</p>
        </div>
      </div>

      <!-- Assets Table/Grid -->
      <div use:staggerCards={{ stagger: 0.08, delay: 0.5 }} class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {#each assets as asset}
          <div class="asset-card group liquid-glass" role="article" aria-labelledby="asset-name-{asset.id}">
            <div class="flex justify-between items-start mb-8">
              <div 
                class="w-12 h-12 rounded-2xl bg-surface/50 border border-white/5 flex items-center justify-center text-ivory/40 group-hover:text-white transition-all" 
                style="--hover-color: {asset.color}"
                aria-hidden="true"
              >
                 <span class="material-symbols-outlined text-2xl" class:text-primary={asset.status === 'Active'}>{asset.icon}</span>
              </div>
              <div class="text-right">
                <p class="text-[8px] font-mono text-ivory/10 uppercase tracking-widest mb-1">Asset ID</p>
                <p class="text-[9px] font-mono text-white">0x{Math.random().toString(16).slice(2,8).toUpperCase()}</p>
              </div>
            </div>

            <h4 id="asset-name-{asset.id}" class="font-heading text-2xl font-medium italic text-white mb-1">{asset.name}</h4>
            <div class="flex items-center gap-3 mb-6">
              <span class="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">{asset.type}</span>
              {#if !isPaid}
                <span class="px-2 py-0.5 rounded-full bg-orange/10 text-orange text-[7px] font-mono border border-orange/20 uppercase">Volatile_Memory</span>
              {/if}
            </div>
            
            <div class="flex items-center justify-between pt-6 border-t border-white/5">
              <div class="flex items-center gap-2" role="status">
                <div class="w-1.5 h-1.5 rounded-full {asset.status === 'Active' ? 'bg-primary' : 'bg-ivory/20'}" aria-hidden="true"></div>
                <span class="text-[9px] font-mono text-ivory/40 uppercase">{asset.status}</span>
              </div>
              <button class="text-ivory/40 hover:text-white transition-colors" aria-label="Abrir {asset.name}">
                <span class="material-symbols-outlined text-xl" aria-hidden="true">open_in_new</span>
              </button>
            </div>
          </div>
        {/each}

        <!-- CSV Exchange Placeholder -->
        <button class="flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group">
           <div class="relative mb-4">
             <span class="material-symbols-outlined text-4xl text-white/5 group-hover:text-primary transition-all">database</span>
             <span class="absolute -top-1 -right-1 text-[8px] font-mono bg-orange text-carbon px-1 rounded">CSV</span>
           </div>
           <span class="font-mono text-[10px] text-ivory/40 uppercase tracking-[0.2em] group-hover:text-ivory">Exchange (Export/Import)</span>
        </button>

        <!-- Add Asset Placeholder -->
        <button class="flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed border-white/5 hover:border-ivory/20 hover:bg-white/5 transition-all group">
           <span class="material-symbols-outlined text-4xl text-white/5 group-hover:text-ivory transition-all mb-4">add_circle</span>
           <span class="font-mono text-[10px] text-ivory/40 uppercase tracking-[0.2em] group-hover:text-ivory">Desplegar Nuevo Asset</span>
        </button>
      </div>
    </div>
  </main>

  <!-- Floating Demo Toggle -->
  <FloatingDemo />

  <!-- RIGHT CHAT DRAWER -->
  <aside 
    use:slideIn={{ from: 'right', delay: 0.3 }} 
    use:animateDimension={{ width: rightCollapsed ? '0px' : '384px' }}
    class="border-l border-white/5 bg-surface flex flex-col z-20 relative overflow-hidden"
    class:opacity-0={rightCollapsed}
    class:pointer-events-none={rightCollapsed}
  >
    <button 
      on:click={() => rightCollapsed = !rightCollapsed}
      class="absolute -left-3 top-20 w-6 h-6 bg-surface border border-white/10 rounded-full flex items-center justify-center text-ivory/40 hover:text-primary transition-all z-50 shadow-xl"
    >
      <span class="material-symbols-outlined text-xs">{rightCollapsed ? 'chevron_left' : 'chevron_right'}</span>
    </button>

    <div class="p-8 border-b border-white/5 overflow-hidden">
      <div class="flex items-center gap-3 mb-1">
        <div class="w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_#ff9f5a]"></div>
        <h4 class="font-heading text-xl font-medium italic text-white truncate">Auréon Core</h4>
      </div>
      <p class="font-mono text-[9px] text-ivory/40 uppercase tracking-widest">Ecosystem Intelligence</p>
    </div>

    <!-- Hydra Pool Selector -->
    <div class="px-8 py-4 border-b border-white/5 flex gap-2">
      {#each models as model}
        <button 
          on:click={() => activeModel = model.id}
          class="px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-widest transition-all flex items-center gap-2 {activeModel === model.id ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-ivory/40'}"
        >
          <span class="material-symbols-outlined text-[10px]">{model.icon}</span>
          {model.name}
        </button>
      {/each}
    </div>

    <div class="flex-grow p-8 space-y-8 overflow-y-auto scrollbar-hide custom-scrollbar">
      {#each chatHistory as msg}
        <div class="space-y-3" in:fade>
          <div class="flex items-center gap-2">
            <span class="font-mono text-[8px] uppercase tracking-widest {msg.role === 'user' ? 'text-ivory/40' : 'text-primary font-bold'}">
              {msg.role === 'user' ? 'Entity_Input' : `${msg.model?.toUpperCase() || 'SYSTEM'}_MSG`}
            </span>
            <div class="h-px flex-grow bg-white/5"></div>
          </div>
          <p class="text-xs text-ivory/70 leading-relaxed {msg.role === 'assistant' ? 'italic border-l border-white/5 pl-4' : 'text-right pr-4 border-r border-white/5'}">
            {msg.content}
          </p>
        </div>
      {/each}

      {#if isTyping}
        <div class="flex items-center gap-2 animate-pulse">
           <span class="font-mono text-[8px] text-primary/40 uppercase tracking-widest">Hydra_Processing...</span>
        </div>
      {/if}

      <div class="space-y-4 pt-4">
        <div class="flex items-center gap-2">
            <span class="font-mono text-[8px] text-ivory/40 uppercase tracking-widest">Metrics Preview</span>
            <div class="h-px flex-grow bg-white/5"></div>
        </div>
        <div class="bg-surface/50 border border-white/5 rounded-xl p-4 space-y-4">
          <div>
            <div class="flex justify-between text-[10px] mb-2">
              <span class="text-ivory/40">Engagement Rate</span>
              <span class="text-primary">14.2%</span>
            </div>
            <div class="w-full h-1 bg-background rounded-full overflow-hidden">
               <div class="h-full bg-primary" style="width: 72%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-[10px] mb-2">
              <span class="text-ivory/40">Neural Sync</span>
              <span class="text-orange">92/100</span>
            </div>
            <div class="w-full h-1 bg-background rounded-full overflow-hidden">
               <div class="h-full bg-orange" style="width: 92%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-8">
      <form on:submit|preventDefault={handleSendMessage} class="relative group">
        <input 
          type="text" 
          bind:value={chatInput}
          placeholder="Hablar con Hydra Pool..."
          class="w-full bg-background border border-white/5 rounded-2xl py-4 pl-6 pr-14 text-xs text-white focus:outline-none focus:border-primary/50 transition-all font-plus"
        />
        <button 
          type="submit"
          disabled={isTyping}
          class="absolute right-4 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-primary transition-all disabled:opacity-30"
        >
          <span class="material-symbols-outlined">{isTyping ? 'hourglass_empty' : 'send'}</span>
        </button>
      </form>
    </div>
  </aside>

</div>

<style>
  :root {
    --carbon: #0A0A0F;
    --border: rgba(255,255,255,0.08);
    --primary: #BDEB34;
    --ivory: #FAFCE8;
  }

  .bg-grid-bg {
    background-image: 
      linear-gradient(rgba(189, 235, 52, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(189, 235, 52, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .nav-btn {
    width: 100%; display: flex; align-items: center; gap: 16px; 
    padding: 12px 16px; border-radius: 12px;
    font-family: var(--font-mono); font-size: 10px; text-transform: uppercase;
    color: rgba(250, 252, 232, 0.4); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .nav-btn:hover { color: var(--ivory); background: rgba(255,255,255,0.03); transform: translateX(4px); }
  .nav-btn.active { background: rgba(189, 235, 52, 0.1); color: var(--primary); border: 1px solid rgba(189, 235, 52, 0.2); }

  .liquid-glass-pro {
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 
      inset 0 0 20px rgba(255, 255, 255, 0.02),
      0 10px 40px -10px rgba(0, 0, 0, 0.5);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .trinity-card {
    padding: 32px; border-radius: 30px; position: relative; overflow: hidden;
    --accent: currentColor;
    cursor: default;
  }
  .trinity-card:hover { 
    transform: translateY(-8px) scale(1.02); 
    border-color: var(--accent);
    box-shadow: 0 20px 60px -20px rgba(0,0,0,0.8), 0 0 20px -5px var(--accent);
  }
  
  .asset-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 32px; border-radius: 32px; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    cursor: pointer;
  }
  .asset-card:hover { 
    border-color: var(--hover-color); 
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.04);
  }


  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(189, 235, 52, 0.2); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--primary); }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }
  .animate-pulse { animation: pulse 2s infinite; }
</style>
