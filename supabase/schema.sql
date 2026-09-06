-- AFM Signal core schema. Apply through Supabase migrations in Phase 2.
create extension if not exists pgcrypto;

create type review_status as enum ('machine_generated', 'needs_review', 'reviewed', 'approved', 'rejected');
create type evidence_status as enum ('established', 'strongly_supported', 'supported', 'emerging', 'conflicting', 'unclear', 'unresolved');

create table publications (
  id uuid primary key default gen_random_uuid(),
  pmid text unique,
  doi text unique,
  title text not null,
  abstract text,
  journal text,
  publication_date date,
  publication_type text,
  source_url text not null,
  pubmed_url text,
  openalex_work_id text unique,
  citation_count integer,
  source text not null default 'pubmed',
  source_updated_at timestamptz,
  raw_payload jsonb,
  processing_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  discovered_at timestamptz not null default now()
);
create index publications_date_idx on publications (publication_date desc);

create table institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  normalized_name text not null,
  openalex_institution_id text unique,
  ror_id text unique,
  city text, region text, country text,
  latitude numeric, longitude numeric,
  website_url text, institution_type text,
  latest_activity_at timestamptz,
  relevant_publication_count integer not null default 0,
  source text, source_updated_at timestamptz, raw_payload jsonb, processing_version text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index institutions_normalized_name_idx on institutions (normalized_name);

create table researchers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  normalized_name text not null,
  orcid text unique,
  openalex_author_id text unique,
  profile_url text, bio text,
  primary_institution_id uuid references institutions(id),
  latest_activity_at timestamptz,
  publication_count_afm integer not null default 0,
  source text, source_updated_at timestamptz, raw_payload jsonb, processing_version text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index researchers_normalized_name_idx on researchers (normalized_name);

create table authorships (
  id uuid primary key default gen_random_uuid(),
  publication_id uuid not null references publications(id) on delete cascade,
  researcher_id uuid references researchers(id),
  institution_id uuid references institutions(id),
  author_position integer,
  is_corresponding boolean not null default false,
  affiliation_raw text,
  unique (publication_id, researcher_id, author_position)
);

create table topics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, name text not null, description text, category text not null
);
create table publication_topics (
  publication_id uuid not null references publications(id) on delete cascade,
  topic_id uuid not null references topics(id) on delete cascade,
  classification_source text not null,
  confidence numeric,
  reviewer_status review_status not null default 'needs_review',
  primary key (publication_id, topic_id)
);

create table summaries (
  id uuid primary key default gen_random_uuid(),
  publication_id uuid not null unique references publications(id) on delete cascade,
  question text, study_design text, methods text, primary_finding text, why_it_matters text,
  limitations jsonb not null default '[]'::jsonb,
  mechanism_implication text, family_summary text, clinician_summary text, researcher_summary text,
  generated_by_model text, review_status review_status not null default 'needs_review',
  reviewed_by uuid, reviewed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table surveillance_snapshots (
  id uuid primary key default gen_random_uuid(),
  source text not null, metric_type text not null, observation_date date not null,
  reporting_period text, confirmed_cases integer, patients_under_investigation integer,
  states_affected integer, total_historical_cases integer, data_json jsonb not null default '{}'::jsonb,
  source_url text not null, source_updated_at timestamptz, ingested_at timestamptz not null default now()
);
create index surveillance_observation_idx on surveillance_snapshots (observation_date desc);

create table research_activity_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null, publication_id uuid references publications(id),
  researcher_id uuid references researchers(id), institution_id uuid references institutions(id),
  title text not null, description text, occurred_at timestamptz not null, detected_at timestamptz not null default now(),
  metadata_json jsonb not null default '{}'::jsonb
);

create table correction_submissions (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null, entity_id uuid, message text not null check (char_length(message) <= 4000),
  email text, status text not null default 'new', created_at timestamptz not null default now()
);
