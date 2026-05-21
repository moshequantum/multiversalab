import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@insforge/sdk';

// Server-side InsForge client using the admin/service API key.
// This file only runs on Vercel serverless — the API key never reaches the browser.
const insforge = createClient({
  baseUrl: env.INSFORGE_API_BASE_URL || 'https://uzyhdq3q.us-east.insforge.app',
  anonKey: env.INSFORGE_API_KEY || '***ROTATED_REDACTED***'
});

const VALID_PLANS = new Set([
  'Lab (Open R&D)',
  'Group (Commercial Spark)',
  'Ecosistemas (Advanced Simulation)'
]);

export const POST: RequestHandler = async ({ request }) => {
  let body: { name?: string; email?: string; plan_interest?: string };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const plan = (body.plan_interest ?? '').trim();

  if (!name || name.length > 200) {
    return json({ ok: false, error: 'Nombre requerido.' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ ok: false, error: 'Email inválido.' }, { status: 400 });
  }
  if (!VALID_PLANS.has(plan)) {
    return json({ ok: false, error: 'Plan de interés desconocido.' }, { status: 400 });
  }

  const { error } = await insforge.database.from('founders_waitlist').insert([
    {
      name,
      email,
      plan_interest: plan,
      created_at: new Date().toISOString()
    }
  ]);

  if (error) {
    console.error('[waitlist] InsForge insert failed', error);
    return json(
      {
        ok: false,
        error:
          'No pudimos registrarte ahora. Si el problema persiste, escribinos a soymoisesweb@gmail.com.'
      },
      { status: 500 }
    );
  }

  return json({ ok: true });
};
