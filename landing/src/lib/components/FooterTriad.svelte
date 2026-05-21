<script lang="ts">
  // Triad signature footer — ◎ ⬡ ✦ as Playfair italic text
</script>

<footer class="footer">
  <div class="site stack-lg">

    <div class="triad" aria-hidden="true">
      <span class="g g-violet">◎</span>
      <span class="g g-teal">⬡</span>
      <span class="g g-rose">✦</span>
    </div>

    <div class="wordmark mv-chrome">MULTIVERSA</div>

    <p class="line">
      <em>Architected by Moshe. Open to the curious.</em>
    </p>

    <div class="rule"></div>

    <div class="links">
      <a href="https://github.com/moshequantum/multiversalab" target="_blank" rel="noopener">GitHub</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversalab/blob/main/LICENSE" target="_blank" rel="noopener">MIT License</a>
      <span class="sep">·</span>
      <a href="https://github.com/moshequantum/multiversalab/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener">Code of Conduct</a>
      <span class="sep">·</span>
      <a href="mailto:soymoisesweb@gmail.com">soymoisesweb@gmail.com</a>
    </div>

    <div class="meta">
      <span class="mv-label-muted">© 2026 Multiversa Lab</span>
      <span class="mv-label-muted">v 0.4 · open-source · MIT</span>
      <span class="mv-label-muted">lab.multiversa.group</span>
    </div>

  </div>
</footer>

<style>
  .footer {
    background: var(--mv-footer);
    padding: clamp(80px, 12vw, 140px) 0 64px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .stack-lg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    text-align: center;
  }

  .triad {
    display: flex;
    gap: 48px;
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    font-size: clamp(3rem, 7vw, 5rem);
    line-height: 1;
  }
  .g-violet { color: var(--mv-astursadeth); }
  .g-teal   { color: var(--mv-aureon); }
  .g-rose   { color: var(--mv-runa); }

  .wordmark {
    font-family: var(--font-serif);
    font-weight: 500;
    letter-spacing: 0.18em;
    font-size: clamp(3rem, 10vw, 8rem);
    line-height: 1;
  }

  .line {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    color: rgba(250, 252, 232, 0.5);
    margin: 0;
  }

  .rule {
    width: 80px; height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  .links {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(250, 252, 232, 0.55);
  }
  .links a:hover { color: var(--mv-primary); }
  .sep { color: rgba(250, 252, 232, 0.25); }

  .meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
  }
</style>
