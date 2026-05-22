import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createClient } from '@insforge/sdk';

const baseUrl = env.INSFORGE_API_BASE_URL;
const apiKey = env.INSFORGE_API_KEY;
const COMPANY_EMAIL = 'multiversagroup@gmail.com';
const CALENDAR_URL = 'https://cal.com/multiversa-group/30min';

if (!baseUrl || !apiKey) {
  console.error(
    '[waitlist] Missing INSFORGE_API_BASE_URL or INSFORGE_API_KEY in environment. ' +
      'Set them in .env locally and in Vercel project settings.'
  );
}

const insforge = baseUrl && apiKey ? createClient({ baseUrl, anonKey: apiKey }) : null;

const VALID_BUDGET_RANGES = new Set(['', 'under_1k', '1k_3k', '3k_7k', '7k_plus']);
const VALID_URGENCIES = new Set(['now', '30_days', 'quarter', 'exploring']);
const VALID_CLIENT_TIERS = new Set(['person', 'team', 'agency', 'company']);

type SparkRequest = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  pain_point?: unknown;
  current_tools?: unknown;
  budget_range?: unknown;
  urgency?: unknown;
  client_tier?: unknown;
};

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function paragraph(value: string) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

async function sendSparkEmails(input: {
  name: string;
  email: string;
  company: string;
  role: string;
  pain_point: string;
  current_tools: string;
  budget_range: string | null;
  urgency: string;
  client_tier: string;
}) {
  if (!insforge) return;

  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const company = escapeHtml(input.company);
  const role = escapeHtml(input.role);
  const painPoint = paragraph(input.pain_point);
  const currentTools = paragraph(input.current_tools);
  const budgetRange = escapeHtml(input.budget_range || 'No especificado');
  const urgency = escapeHtml(input.urgency);
  const clientTier = escapeHtml(input.client_tier);
  const submittedAt = escapeHtml(new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' }));

  const prospectHtml = `
    <div style="background:#0a0a0f;color:#fafce8;font-family:Arial,sans-serif;padding:32px">
      <div style="max-width:620px;margin:0 auto;background:#111118;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:32px">
        <p style="color:#bdeb34;font-family:monospace;letter-spacing:.16em;text-transform:uppercase;margin:0 0 20px">Multiversa Group · Spark</p>
        <h1 style="font-size:26px;font-weight:400;margin:0 0 18px">Hola, ${name}.</h1>
        <p style="line-height:1.65;color:rgba(250,252,232,.78)">Recibimos tu contexto para el <strong style="color:#bdeb34">Diagnóstico Spark</strong>. El siguiente paso es reservar tu llamada para revisar tu operación y definir la ruta correcta.</p>
        <p style="line-height:1.65;color:rgba(250,252,232,.78)">Si todavía no agendaste, podés hacerlo acá:</p>
        <p style="margin:28px 0"><a href="${CALENDAR_URL}" style="display:inline-block;background:#bdeb34;color:#000;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:700">Reservar llamada Spark</a></p>
        <p style="line-height:1.65;color:rgba(250,252,232,.68)">También podés responder este correo si necesitás agregar contexto antes de la sesión.</p>
        <p style="border-top:1px solid rgba(255,255,255,.08);padding-top:18px;margin-top:28px;color:rgba(250,252,232,.45);font-size:13px">Multiversa Group · Consultoría, arquitectura e implementación de ecosistemas de IA agnóstica.</p>
      </div>
    </div>
  `;

  const internalHtml = `
    <div style="background:#0a0a0f;color:#fafce8;font-family:Arial,sans-serif;padding:28px">
      <div style="max-width:760px;margin:0 auto;background:#111118;border:1px solid #bdeb34;border-radius:14px;padding:28px">
        <h1 style="color:#bdeb34;font-size:22px;margin:0 0 16px">[BRIEFING SPARK] Nuevo lead</h1>
        <table style="width:100%;border-collapse:collapse">
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08);width:190px">Nombre</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${name}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Email</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${email}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Empresa</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${company}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Rol</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${role}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Problema</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${painPoint}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Herramientas</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${currentTools}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Presupuesto</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${budgetRange}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Urgencia</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${urgency}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Tipo</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${clientTier}</td></tr>
          <tr><th style="text-align:left;color:#bdeb34;padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">Fecha</th><td style="padding:10px;border-bottom:1px solid rgba(255,255,255,.08)">${submittedAt}</td></tr>
        </table>
      </div>
    </div>
  `;

  const results = await Promise.allSettled([
    insforge.emails.send({
      to: input.email,
      subject: 'Diagnóstico Spark — Multiversa Group',
      html: prospectHtml,
      from: 'Multiversa Group',
      replyTo: COMPANY_EMAIL
    }),
    insforge.emails.send({
      to: COMPANY_EMAIL,
      subject: `[BRIEFING SPARK] Nuevo lead: ${input.name} (${input.company})`,
      html: internalHtml,
      from: 'Multiversa Group',
      replyTo: input.email
    })
  ]);

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error('[waitlist] Non-blocking email promise rejected', result.reason);
      continue;
    }
    if (result.value.error) {
      console.error('[waitlist] Non-blocking email send failed', result.value.error);
    }
  }
}

export const POST: RequestHandler = async ({ request }) => {
  if (!insforge) {
    return json(
      { ok: false, error: 'Backend no configurado. Escribinos a multiversagroup@gmail.com.' },
      { status: 503 }
    );
  }

  let body: SparkRequest;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }

  const name = readString(body.name);
  const email = readString(body.email).toLowerCase();
  const company = readString(body.company);
  const role = readString(body.role);
  const pain_point = readString(body.pain_point);
  const current_tools = readString(body.current_tools);
  const budget_range = readString(body.budget_range);
  const urgency = readString(body.urgency);
  const client_tier = readString(body.client_tier);

  if (!name || name.length > 200) {
    return json({ ok: false, error: 'Nombre requerido.' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ ok: false, error: 'Email inválido.' }, { status: 400 });
  }
  if (!company || company.length > 200) {
    return json({ ok: false, error: 'Empresa requerida.' }, { status: 400 });
  }
  if (!role || role.length > 200) {
    return json({ ok: false, error: 'Rol/cargo requerido.' }, { status: 400 });
  }
  if (!pain_point || pain_point.length > 2000) {
    return json({ ok: false, error: 'Problema principal requerido.' }, { status: 400 });
  }
  if (!current_tools || current_tools.length > 2000) {
    return json({ ok: false, error: 'Herramientas actuales requeridas.' }, { status: 400 });
  }
  if (!VALID_BUDGET_RANGES.has(budget_range)) {
    return json({ ok: false, error: 'Rango de presupuesto inválido.' }, { status: 400 });
  }
  if (!VALID_URGENCIES.has(urgency)) {
    return json({ ok: false, error: 'Urgencia requerida.' }, { status: 400 });
  }
  if (!VALID_CLIENT_TIERS.has(client_tier)) {
    return json({ ok: false, error: 'Tipo de operación requerido.' }, { status: 400 });
  }

  const { error: dbError } = await insforge.database.from('founders_waitlist').insert([
    {
      name,
      email,
      plan_interest: 'Spark Diagnostic',
      company,
      role,
      pain_point,
      current_tools,
      budget_range: budget_range || null,
      urgency,
      client_tier,
      status: 'form_submitted',
      source: 'multiversa.group',
      created_at: new Date().toISOString()
    }
  ]);

  if (dbError) {
    console.error('[waitlist] InsForge insert failed', dbError);
    return json(
      {
        ok: false,
        error: 'No pudimos registrar tu diagnóstico ahora. Si persiste, escribinos a multiversagroup@gmail.com.'
      },
      { status: 500 }
    );
  }

  try {
    await sendSparkEmails({
      name,
      email,
      company,
      role,
      pain_point,
      current_tools,
      budget_range: budget_range || null,
      urgency,
      client_tier
    });
  } catch (emailError) {
    console.error('[waitlist] Non-blocking email automation error', emailError);
  }

  return json({ ok: true });
};
