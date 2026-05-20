<script lang="ts">
  // In a real app, these would come from a store or props
  export let brandName = "Mi Marca";
  export let assetCount = 3;
  export let clientNode = "NanoBanana";
</script>

<header class="mb-12 flex flex-col md:flex-row items-baseline gap-5 justify-between">
  <div class="space-y-1">
    <div class="flex items-center gap-3">
      <h2 class="font-heading text-4xl italic text-white leading-tight">{brandName} — Assets</h2>
      <div class="h-px w-10 bg-primary/20 translate-y-1"></div>
    </div>
    <p class="font-mono text-[10px] text-ivory/40 tracking-widest uppercase">
      White-Label Cockpit // Session Active
    </p>
  </div>

  <div class="flex items-center gap-6 opacity-60">
    <div class="flex flex-col items-end">
      <span class="font-mono text-[9px] text-ivory/40 uppercase tracking-wider">Node_ID</span>
      <span class="font-mono text-[11px] text-ivory/90">{clientNode}</span>
    </div>
    <div class="h-8 w-px bg-white/5"></div>
    <div class="flex flex-col items-end">
      <span class="font-mono text-[9px] text-ivory/40 uppercase tracking-wider">Asset_Count</span>
      <span class="font-mono text-[11px] text-ivory/90">{assetCount} DESKTOP</span>
    </div>
  </div>
</header>
