<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Ethos from '$lib/components/Ethos.svelte';
  import Pillars from '$lib/components/Pillars.svelte';
  import Attribution from '$lib/components/Attribution.svelte';
  import StatusBoard from '$lib/components/StatusBoard.svelte';
  import PhilosophySplit from '$lib/components/PhilosophySplit.svelte';
  import WaitlistForm from '$lib/components/WaitlistForm.svelte';
  import FooterSignature from '$lib/components/FooterSignature.svelte';
</script>

<svelte:head>
  <title>Multiversa Group · Ecosistemas de IA Agnóstica</title>
  <meta
    name="description"
    content="Multiversa Group diseña e implementa ecosistemas de IA agnóstica para convertir conocimiento, procesos y criterio humano en operación real. Consultoría, arquitectura e implementación."
  />
</svelte:head>

<Nav />
<main>
  <Hero />
  <Ethos />
  <Pillars />
  <Attribution />
  <StatusBoard />
  <PhilosophySplit />
  <WaitlistForm />
</main>
<FooterSignature />

<style>
  main { display: block; }
</style>
