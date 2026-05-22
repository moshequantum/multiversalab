<script lang="ts">
  import { goto } from '$app/navigation';

  type SparkPayload = {
    name: string;
    email: string;
    company: string;
    role: string;
    pain_point: string;
    current_tools: string;
    budget_range: string;
    urgency: string;
    client_tier: string;
  };

  let form = $state<SparkPayload>({
    name: '',
    email: '',
    company: '',
    role: '',
    pain_point: '',
    current_tools: '',
    budget_range: '',
    urgency: '',
    client_tier: ''
  });

  let loading = $state(false);
  let status: 'idle' | 'error' = $state('idle');
  let errorMessage = $state('');

  const budgetRanges = [
    { value: '', label: 'Prefiero conversarlo en la llamada' },
    { value: 'under_1k', label: 'Menos de $1.000' },
    { value: '1k_3k', label: '$1.000 – $3.000' },
    { value: '3k_7k', label: '$3.000 – $7.000' },
    { value: '7k_plus', label: '$7.000+' }
  ];

  const urgencyOptions = [
    { value: '', label: 'Seleccioná una urgencia' },
    { value: 'now', label: 'Necesito ordenar esto ahora' },
    { value: '30_days', label: 'Quiero iniciar en los próximos 30 días' },
    { value: 'quarter', label: 'Estoy planificando este trimestre' },
    { value: 'exploring', label: 'Estoy explorando posibilidades' }
  ];

  const clientTiers = [
    { value: '', label: 'Seleccioná el tipo de operación' },
    { value: 'person', label: 'Persona / consultor / creador' },
    { value: 'team', label: 'Equipo pequeño' },
    { value: 'agency', label: 'Agencia / operación con clientes' },
    { value: 'company', label: 'Empresa / unidad de negocio' }
  ];

  function hasRequiredFields() {
    return Boolean(
      form.name.trim() &&
        form.email.trim() &&
        form.company.trim() &&
        form.role.trim() &&
        form.pain_point.trim() &&
        form.current_tools.trim() &&
        form.urgency.trim() &&
        form.client_tier.trim()
    );
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!hasRequiredFields()) {
      errorMessage = 'Completá los campos requeridos para preparar tu diagnóstico Spark.';
      status = 'error';
      return;
    }

    loading = true;
    status = 'idle';
    errorMessage = '';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'No pudimos recibir tu solicitud ahora.');
      }

      await goto('/gracias');
    } catch (err: any) {
      console.error('Spark submission error:', err);
      errorMessage = err?.message || 'Error de red. Intentá de nuevo en unos minutos.';
      status = 'error';
    } finally {
      loading = false;
    }
  }
</script>

<section id="spark-form" class="spark-section">
  <div class="mv-liquid-glass-pro form-card">
    <div class="glow-orb" aria-hidden="true"></div>

    <div class="form-header">
      <span class="mv-mono-label">Diagnóstico Spark · Entrada Comercial</span>
      <h3 class="form-title">Solicitá tu diagnóstico Spark</h3>
      <p class="form-subtitle">
        Contanos dónde estás, qué querés ordenar y qué herramientas usás. Con eso preparamos una llamada enfocada en convertir tu conocimiento, procesos y criterio en operación real.
      </p>
    </div>

    <form onsubmit={handleSubmit} class="spark-form">
      {#if status === 'error'}
        <div class="error-alert" role="alert">
          <span class="error-glyph">✕</span>
          <p>{errorMessage}</p>
        </div>
      {/if}

      <div class="form-grid two-columns">
        <div class="input-group">
          <label for="name">Nombre *</label>
          <input id="name" type="text" placeholder="Tu nombre" bind:value={form.name} disabled={loading} required />
        </div>

        <div class="input-group">
          <label for="email">Correo electrónico *</label>
          <input id="email" type="email" placeholder="tu@empresa.com" bind:value={form.email} disabled={loading} required />
        </div>

        <div class="input-group">
          <label for="company">Empresa / Proyecto *</label>
          <input id="company" type="text" placeholder="Nombre de tu operación" bind:value={form.company} disabled={loading} required />
        </div>

        <div class="input-group">
          <label for="role">Rol / Cargo *</label>
          <input id="role" type="text" placeholder="Founder, CEO, consultor, director..." bind:value={form.role} disabled={loading} required />
        </div>
      </div>

      <div class="input-group">
        <label for="pain_point">Problema principal *</label>
        <textarea id="pain_point" rows="4" placeholder="¿Qué caos, cuello de botella o decisión querés resolver primero?" bind:value={form.pain_point} disabled={loading} required></textarea>
      </div>

      <div class="input-group">
        <label for="current_tools">Herramientas actuales *</label>
        <textarea id="current_tools" rows="4" placeholder="CRM, Notion, Drive, WhatsApp, Apollo, Cal.com, hojas de cálculo, IA, automatizaciones..." bind:value={form.current_tools} disabled={loading} required></textarea>
      </div>

      <div class="form-grid three-columns">
        <div class="input-group">
          <label for="budget_range">Presupuesto / Rango</label>
          <div class="select-wrapper">
            <select id="budget_range" bind:value={form.budget_range} disabled={loading}>
              {#each budgetRanges as option}
                <option value={option.value}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="input-group">
          <label for="urgency">Urgencia *</label>
          <div class="select-wrapper">
            <select id="urgency" bind:value={form.urgency} disabled={loading} required>
              {#each urgencyOptions as option}
                <option value={option.value} disabled={option.value === ''}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="input-group">
          <label for="client_tier">Tipo de operación *</label>
          <div class="select-wrapper">
            <select id="client_tier" bind:value={form.client_tier} disabled={loading} required>
              {#each clientTiers as option}
                <option value={option.value} disabled={option.value === ''}>{option.label}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>

      <button type="submit" class="mv-btn mv-btn-primary submit-btn" disabled={loading}>
        {#if loading}
          <span class="spinner" aria-hidden="true"></span>
          Enviando contexto...
        {:else}
          Enviar contexto y reservar Spark →
        {/if}
      </button>
    </form>
  </div>
</section>

<style>
  .spark-section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(60px, 8vh, 100px) var(--space-4);
    position: relative;
    overflow: hidden;
  }

  .form-card {
    width: 100%;
    max-width: 860px;
    padding: clamp(32px, 5vw, 48px);
    border-radius: var(--radius-xl);
    z-index: 2;
    position: relative;
  }

  .glow-orb {
    position: absolute;
    top: -20%;
    right: -20%;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(189, 235, 52, 0.12) 0%, transparent 70%);
    filter: blur(40px);
    z-index: -1;
    pointer-events: none;
  }

  .form-header {
    margin-bottom: 36px;
    text-align: center;
  }

  .form-title {
    margin: 12px 0 16px;
    font-size: clamp(2rem, 3.5vw, 2.7rem);
    line-height: 1.1;
    letter-spacing: var(--tracking-tight);
    font-family: var(--font-serif);
    color: var(--mv-ivory);
  }

  .form-subtitle {
    font-size: 0.98rem;
    line-height: 1.6;
    color: rgba(250, 252, 232, 0.68);
    margin: 0 auto;
    max-width: 68ch;
  }

  .spark-form {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .form-grid {
    display: grid;
    gap: 18px;
  }

  .two-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .three-columns {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
  }

  .input-group label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: rgba(250, 252, 232, 0.55);
  }

  .input-group input,
  .input-group select,
  .input-group textarea {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-sm);
    color: var(--mv-ivory);
    padding: 14px 18px;
    font-size: 0.98rem;
    font-family: var(--font-sans);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .input-group textarea {
    resize: vertical;
    min-height: 116px;
    line-height: 1.5;
  }

  .input-group input::placeholder,
  .input-group textarea::placeholder {
    color: rgba(250, 252, 232, 0.25);
  }

  .input-group input:focus,
  .input-group select:focus,
  .input-group textarea:focus {
    outline: none;
    border-color: var(--mv-primary);
    background: rgba(189, 235, 52, 0.02);
    box-shadow: var(--shadow-ring-primary);
  }

  .select-wrapper {
    position: relative;
    width: 100%;
  }

  .select-wrapper::after {
    content: '↓';
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(250, 252, 232, 0.4);
    font-family: var(--font-mono);
    font-size: 12px;
    pointer-events: none;
  }

  .input-group select {
    appearance: none;
    width: 100%;
    padding-right: 40px;
    cursor: pointer;
  }

  .input-group select option {
    background: var(--mv-surface);
    color: var(--mv-ivory);
  }

  .submit-btn {
    width: 100%;
    margin-top: 12px;
    padding: 16px;
    font-size: 0.98rem;
    font-weight: 500;
    justify-content: center;
    border: none;
  }

  .error-alert {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 69, 58, 0.08);
    border: 1px solid rgba(255, 69, 58, 0.2);
    border-radius: var(--radius-sm);
    padding: 12px 18px;
    text-align: left;
    color: var(--mv-destructive);
    font-size: 0.9rem;
  }

  .error-alert p {
    margin: 0;
  }

  .error-glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--mv-destructive);
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    flex-shrink: 0;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 820px) {
    .two-columns,
    .three-columns {
      grid-template-columns: 1fr;
    }
  }
</style>
