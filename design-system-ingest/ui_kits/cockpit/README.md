# Cockpit UI Kit

Hi-fi recreation of the CortexOS Cockpit dashboard (`@multiversa/core/apps/cortex-frontend`).

**Source:** `lib/Cockpit.svelte` + `lib/components/{AgentStatusNexus,BrandHeader}.svelte` + `app.css`.

## Files
- `index.html` — full Cockpit with sidebar, main dashboard, and Hydra chat rail
- `BrandHeader.jsx` — top bar with Multiversa mark + user entity + model pill
- `Sidebar.jsx` — collapsible nav with asset list
- `AgentNexus.jsx` — three-agent status panel (◎ ⬡ ✦)
- `AssetCard.jsx` — liquid-glass asset cards
- `HydraChat.jsx` — right-rail chat with model switcher

## Demonstrated patterns
- Onion UI shell: 288px sidebar · flex main · 360px chat rail
- Liquid glass cards (blur-20 + white/.05 + 8-32-0-.37 shadow)
- Agent status pulses (violet / teal / rose)
- Mono tracking labels everywhere
- Chartreuse primary CTAs

Svelte transitions (fadeInBlur, slideIn, staggerCards, pulseGlow) are approximated with CSS only — no GSAP.
