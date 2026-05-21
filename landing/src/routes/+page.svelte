<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Ethos from '$lib/components/Ethos.svelte';
  import Pillars from '$lib/components/Pillars.svelte';
  import StatusBoard from '$lib/components/StatusBoard.svelte';
  import PhilosophySplit from '$lib/components/PhilosophySplit.svelte';
  import FooterTriad from '$lib/components/FooterTriad.svelte';
</script>

<svelte:head>
  <title>Multiversa Lab · Construye cerebros de trabajo</title>
</svelte:head>

<Nav />
<main>
  <Hero />
  <Ethos />
  <Pillars />
  <StatusBoard />
  <PhilosophySplit />
</main>
<FooterTriad />

<style>
  main { display: block; }
</style>
