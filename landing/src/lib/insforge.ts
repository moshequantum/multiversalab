import { createClient } from '@insforge/sdk';
import { PUBLIC_INSFORGE_URL, PUBLIC_INSFORGE_ANON_KEY } from '$env/static/public';

export const insforge = createClient({
  baseUrl: PUBLIC_INSFORGE_URL,
  anonKey: PUBLIC_INSFORGE_ANON_KEY
});
