// ============================================================
// InsForge — client-side singleton (anon key only).
//
// 🚨 NEVER hardcode any key as a fallback in this file.
//    The contents of $lib/insforge.ts are bundled and shipped to the
//    browser. A hardcoded admin key here = the world has admin access.
//
//    If PUBLIC_INSFORGE_ANON_KEY is missing, fail loudly. Do NOT silently
//    fall back to a default. A broken form is better than a leaked key.
// ============================================================

import { createClient } from '@insforge/sdk';
import { PUBLIC_INSFORGE_URL, PUBLIC_INSFORGE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_INSFORGE_URL || !PUBLIC_INSFORGE_ANON_KEY) {
  console.warn(
    '[insforge] Missing PUBLIC_INSFORGE_URL or PUBLIC_INSFORGE_ANON_KEY in .env. ' +
      'The client SDK will not work until both are set. ' +
      'Get the anon key via: npx @insforge/cli secrets get ANON_KEY'
  );
}

export const insforge = createClient({
  baseUrl: PUBLIC_INSFORGE_URL,
  anonKey: PUBLIC_INSFORGE_ANON_KEY
});
