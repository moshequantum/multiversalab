<script lang="ts">
  // chrome-top style mini-nav inspired by the DNA Brand deck
</script>

<header class="nav">
  <div class="site row">
    <div class="left">
      <span class="mv-brandmark">
        <span class="dot"></span>
        <span>MULTIVERSA<span class="lab">LAB</span></span>
      </span>
    </div>
    <div class="right">
      <span class="mv-label-muted">v 0.4 · open-source · MIT</span>
    </div>
  </div>
</header>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(10, 10, 15, 0.55);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 18px;
    padding-bottom: 18px;
  }
  @media (max-width: 640px) {
    .right { display: none; }
  }
</style>
