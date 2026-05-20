<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { Cpu, Brain, Sparkles, Activity } from 'lucide-svelte';

    export let activeAgent: 'astursadeth' | 'aureon' | 'runa' | null = 'astursadeth';
    export let status: 'idle' | 'processing' | 'thinking' = 'idle';

    let container: HTMLElement;
    let astursadethRef: HTMLElement;
    let aureonRef: HTMLElement;
    let runaRef: HTMLElement;

    const agents = [
        { 
            id: 'astursadeth', 
            name: 'Astursadeth', 
            color: '#a894ff', 
            icon: Brain,
            role: 'Orchestrator'
        },
        { 
            id: 'aureon', 
            name: 'Auréon', 
            color: '#4ecdc4', 
            icon: Cpu,
            role: 'System'
        },
        { 
            id: 'runa', 
            name: 'Runa', 
            color: '#ff6b9d', 
            icon: Sparkles,
            role: 'Interface'
        }
    ];

    onMount(() => {
        // Initial breathing animation for all
        gsap.to('.agent-glow', {
            opacity: 0.4,
            scale: 1.2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5
        });
    });

    $: if (activeAgent && container) {
        // Highlight active agent
        gsap.to('.agent-card', {
            opacity: 0.4,
            scale: 0.95,
            filter: 'blur(2px)',
            duration: 0.5
        });

        gsap.to(`#agent-${activeAgent}`, {
            opacity: 1,
            scale: 1.05,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }

    $: if (status === 'processing' && activeAgent) {
        gsap.to(`#glow-${activeAgent}`, {
            scale: 1.8,
            opacity: 0.8,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
    } else {
        gsap.to('.agent-glow', {
            scale: 1.2,
            opacity: 0.4,
            duration: 2
        });
    }
</script>

<div 
    bind:this={container}
    class="flex flex-col gap-4 p-6 liquid-glass rounded-[2rem] border-white/5 shadow-2xl w-80"
>
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
            <Activity size={14} class="text-primary animate-pulse" />
            <span class="font-mono text-[9px] uppercase tracking-[0.3em] text-ivory/40">Nexus Triad Status</span>
        </div>
        <div class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            <span class="font-mono text-[8px] text-primary uppercase">{status}</span>
        </div>
    </div>

    <div class="space-y-3">
        {#each agents as agent}
            <div 
                id="agent-{agent.id}"
                class="agent-card relative p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 transition-all overflow-hidden"
                class:active={activeAgent === agent.id}
            >
                <!-- Background Glow -->
                <div 
                    id="glow-{agent.id}"
                    class="agent-glow absolute -left-4 w-12 h-12 rounded-full blur-xl opacity-0 transition-opacity"
                    style="background-color: {agent.color};"
                ></div>

                <div class="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-black/40 shadow-inner">
                    <svelte:component this={agent.icon} size={18} style="color: {agent.color};" />
                </div>

                <div class="relative z-10 flex flex-col">
                    <span class="font-serif text-sm text-ivory leading-none mb-1">{agent.name}</span>
                    <span class="font-mono text-[8px] uppercase tracking-widest text-white/30">{agent.role}</span>
                </div>

                {#if activeAgent === agent.id}
                    <div class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#BDEB34]"></div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="mt-4 pt-4 border-t border-white/5">
        <p class="font-mono text-[9px] leading-relaxed text-white/20 italic">
            "No son chatbots. Son entidades con personalidad, ética y propósito."
        </p>
    </div>
</div>

<style>
    .liquid-glass {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
    }

    .agent-card.active {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
    }

    .agent-card.active .agent-glow {
        opacity: 0.4;
    }
</style>
