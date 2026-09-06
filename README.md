# AFM Signal

**From surveillance to understanding.**

AFM Signal is a source-traceable scientific intelligence platform for Acute Flaccid Myelitis (AFM) and related EV-D68 research. It distinguishes data from interpretation, makes uncertainty visible, and does not provide medical advice.

## Phase 1

This branch delivers the application shell, an editorial homepage, AFM Now, Research Radar, a traceable publication-record pattern, the Mechanism Explorer, a research-map empty state, methodology, core Supabase schema, and source-adapter contracts.

No live CDC, PubMed, OpenAlex, or ClinicalTrials.gov data is connected yet. All surveillance values are visibly marked as development data; the lone research record is a system-status fixture, not a scientific publication.

## Architecture

- `src/app`: App Router pages
- `src/components`: reusable layout and UI primitives
- `src/lib/data.ts`: explicitly non-live Phase 1 display fixtures
- `src/lib/sources`: validated, modular source contracts and source configuration
- `supabase/schema.sql`: PostgreSQL schema foundation
- `tests`: source-contract tests

The intended Phase 2 persistence layer is Supabase PostgreSQL, accessed with Drizzle. Ingestion jobs will consume the source adapters and write idempotent snapshots/records.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env.local` when integrating external systems:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only)
- `DATABASE_URL`
- `NCBI_API_KEY` (recommended for PubMed throughput)
- `OPENALEX_MAILTO`
- `ADMIN_EMAILS`

Never expose server credentials in browser code.

## Database

Apply `supabase/schema.sql` through a Supabase migration after a project is configured. The schema preserves provenance, ingestion dates, review states, snapshot history, raw payloads, and entity ambiguity.

## Ingestion

`src/lib/sources/config.ts` keeps the PubMed relevance query configurable. Future jobs will be invoked through a protected server runtime / Vercel Cron:

1. Search PubMed with respectful throttling.
2. Fetch and validate records.
3. Upsert by PMID/DOI.
4. Preserve raw affiliations.
5. Enrich through OpenAlex.
6. Create preliminary topic/summary records with review status.
7. Append activity events and surveillance snapshots—never overwrite history.

## Admin workflow

Production admin routes must require authenticated, allowlisted users plus Supabase RLS. Reviewers approve, edit, or reject generated summaries; merge candidates require human confirmation. Correction reports require server-side validation and rate limiting.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Scientific-data limitations

Publicly indexed research activity is incomplete and is not a quality ranking or a representation of every active laboratory. Association is not causation. Related enterovirus activity is contextual information, not personal risk estimation or outbreak prediction. AFM Signal does not diagnose, treat, or replace clinical care.
