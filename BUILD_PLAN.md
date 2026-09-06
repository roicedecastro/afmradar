# AFM Signal — Build Plan

## Current phase
Phase 1 — Foundation

## Completed
- Next.js App Router foundation and design system
- Phase 1 route model and typed seed-data contract
- Core schema specification for publications, authorships, surveillance, research activity, and corrections
- Responsive public homepage, AFM Now, Research Radar, publication record, methodology, mechanism, and research-map views
- Validation contract tests, linting, type checking, and production build verification

## In progress
- Phase 1 is complete; preparing the persistence and ingestion work for Phase 2

## Next
- Add Supabase/Drizzle migration and repository implementation
- Implement PubMed/OpenAlex adapters and idempotent ingestion jobs
- Add institutions, researchers, research map, and profiles

## Technical debt
- Seed repository is deliberately in-memory until a Supabase project is configured.
- Search is local to the Phase 1 seed corpus.

## Data-source issues
- Current surveillance values are clearly marked as demonstration data. No live CDC ingestion is connected.
- Publication metadata is illustrative UI fixture data, not a claim of live indexing.

## Scientific-review issues
- No machine-generated summaries are rendered as reviewed expert content.
- Mechanism status is editorially seeded and visibly calibrated.

## Known bugs
- None known.

## Launch blockers
- Configure production Supabase credentials, RLS policies, source API identity/key, and verified CDC data adapter before presenting any live data.
