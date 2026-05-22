# Multiversa Lab — Infrastructure: InsForge Backend

**InsForge** serves as the Backend-as-a-Service (BaaS) and cloud infrastructure foundation for Multiversa Lab. It provides database access, authentication, file storage, edge functions, and AI model gateways.

---

## Ecosystem Architecture

InsForge is wired directly into the SvelteKit landing dashboard, serving as the central coordinator for public-facing waitlists, audit logs, and agent state synchronizations:

```
[SvelteKit Frontend] ──(InsForge SDK)──> [InsForge Cloud BaaS] ──> [PostgreSQL / Storage / Auth]
```

---

## Database Schemas in Use

The connected InsForge project (`a7008540-cb30-4a9a-a28a-ab065ce4821b`) contains the following tables:

1. `founders_waitlist`: Tracks registrations for the closed-beta of the Advanced Ecosistemas tier.
2. `identity_nodes` & `identity_edges`: Persists Graphify indices in the cloud.
3. `identity_decisions`: Stores decision metrics for MiroFish simulations.
4. `l2_semantic_memory`: Syncs Engram memories across devices.
5. `audit_logs`: General audit trail of agent operations.

---

## Installation & SDK Setup

The TypeScript SDK is installed in the frontend workspace:

```bash
pnpm add @insforge/sdk@latest
```

> Multiversa policy: **pnpm only, npm is banned across the stack.**

### Client Initialization

> ⚠️ **Security note:** the SDK on the client side reads the **anon key**
> (public, scoped by Row-Level Security), never the admin API key. The
> admin key is service-role; if it lands in the browser bundle, anyone
> can read it. Keep it in `.env` (gitignored), expose it only to
> server-side `+server.ts` files.

The client is initialized in [`landing/src/lib/insforge.ts`](../landing/src/lib/insforge.ts):

```typescript
import { createClient } from '@insforge/sdk';
import { PUBLIC_INSFORGE_URL, PUBLIC_INSFORGE_ANON_KEY } from '$env/static/public';

export const insforge = createClient({
  baseUrl: PUBLIC_INSFORGE_URL,
  anonKey: PUBLIC_INSFORGE_ANON_KEY
});
```

`.env` (gitignored):

```bash
PUBLIC_INSFORGE_URL=https://<your-project>.us-east.insforge.app
PUBLIC_INSFORGE_ANON_KEY=<anon-key-from-dashboard-or-cli>

# Server-only (NEVER prefix with PUBLIC_):
INSFORGE_API_KEY=<admin-key-server-side-only>
INSFORGE_API_BASE_URL=https://<your-project>.us-east.insforge.app
```

Get the anon key:

```bash
npx @insforge/cli secrets get ANON_KEY
```

### Writing Data (Example: Waitlist Form)

```typescript
const { data, error } = await insforge.database
  .from('founders_waitlist')
  .insert([{
    name: userName,
    email: userEmail,
    plan_interest: selectedPlan
  }]);
```

For this to work without surfacing admin permissions, the `founders_waitlist`
table needs RLS that allows public insert (and restricts read/update/delete
to authenticated owners only).
