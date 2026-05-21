import { createClient } from '@insforge/sdk';
import { env } from '$env/dynamic/public';

export const insforge = createClient({
  baseUrl: env.PUBLIC_INSFORGE_URL || 'https://uzyhdq3q.us-east.insforge.app',
  anonKey: env.PUBLIC_INSFORGE_ANON_KEY || '***ROTATED_REDACTED***'
});
