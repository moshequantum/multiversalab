<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { dnaTemplates } from '../dnaTemplates';
  import { authStore, startDemo, upgradeToPaid } from '../stores/auth';

  let showSelector = false;
  let isDemo = false;
  let isPaid = false;
  let expiresAt: number | null = null;
  let timeLeft = "";

  authStore.subscribe(state => {
    isDemo = state.isDemo;
    isPaid = state.isPaid;
    expiresAt = state.demoExpiresAt;
  });

  $: if (expiresAt) {
    const updateTime = () => {
      const diff = expiresAt! - Date.now();
      if (diff <= 0) {
        timeLeft = "00:00:00";
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        timeLeft = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    // Note: In a real app, clear interval on destroy
  }

  function handleSelect(niche: string) {
    startDemo(dnaTemplates[niche]);
    showSelector = false;
  }
</script>

{#if !isPaid}
  <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
    {#if showSelector}
      <div in:fly={{ y: 20 }} out:fade class="grid grid-cols-2 gap-3 p-4 bg-background/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl mb-2">
        {#each Object.entries(dnaTemplates) as [key, dna]}
          <button 
            class="px-6 py-3 rounded-2xl border border-white/5 bg-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
            on:click={() => handleSelect(key)}
          >
            <span class="block text-[8px] font-mono text-primary uppercase tracking-widest mb-1">{key}</span>
            <span class="block text-xs font-bold text-white group-hover:text-primary">{dna.name}</span>
          </button>
        {/each}
      </div>
    {/if}

    <div class="flex items-center gap-2 p-2 bg-background/50 backdrop-blur-md border border-white/5 rounded-full shadow-lg">
      <button 
        class="flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-carbon font-bold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-primary-glow"
        on:click={() => showSelector = !showSelector}
      >
        <span class="material-symbols-outlined text-sm">rocket_launch</span>
        {showSelector ? 'Cerrar selector' : 'Explorar Nichos'}
      </button>

      {#if isDemo}
        <div class="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span class="material-symbols-outlined text-sm text-orange animate-pulse">timer</span>
          <span class="font-mono text-[10px] text-white tracking-widest">{timeLeft}</span>
        </div>
        
        <button 
          class="flex items-center gap-3 px-6 py-3 rounded-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg"
          on:click={() => {
            alert('Simulando Checkout de PayPal...');
            setTimeout(upgradeToPaid, 1500);
          }}
        >
          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" class="h-4" />
          Pagar para Persistir
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .shadow-primary-glow {
    box-shadow: 0 0 20px rgba(189, 235, 52, 0.3);
  }
</style>
