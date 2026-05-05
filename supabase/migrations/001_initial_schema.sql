-- Match Intra — Schéma initial
-- Phase 1 : tables, contraintes, RLS minimale

-- ============================================================
-- programs
-- ============================================================
create table programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  catalog_duration_days integer,
  active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- sessions
-- ============================================================
create table sessions (
  id uuid primary key default gen_random_uuid(),
  reference text unique,
  program_id uuid references programs(id),
  custom_program_name text,
  establishment_name text not null,
  establishment_email text not null,
  trainer_name text not null,
  trainer_email text not null,
  location_label text not null,
  period_start date not null,
  period_end date not null,
  duration_days integer not null check (duration_days in (1, 2, 3)),
  total_units integer not null,
  scheduling_mode text not null check (scheduling_mode in ('continuous', 'discontinuous')),
  slot_mode text not null check (slot_mode in ('full_day', 'half_day')),
  establishment_comment text,
  trainer_comment text,
  status text not null default 'draft' check (status in (
    'draft', 'sent', 'partial_response', 'complete_responses',
    'match_found', 'no_match', 'confirmed', 'closed'
  )),
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  sent_at timestamptz,
  matched_at timestamptz,
  confirmed_at timestamptz
);

-- Index utiles
create index sessions_status_idx on sessions(status);
create index sessions_created_by_idx on sessions(created_by);

-- Trigger updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger sessions_updated_at before update on sessions
  for each row execute function update_updated_at();

-- ============================================================
-- access_tokens
-- ============================================================
create table access_tokens (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null check (role in ('establishment', 'trainer')),
  token text unique not null default encode(gen_random_bytes(32), 'hex'),
  expires_at timestamptz,
  first_opened_at timestamptz,
  submitted_at timestamptz,
  active boolean default true,
  created_at timestamptz default now(),
  unique(session_id, role)
);

create index access_tokens_token_idx on access_tokens(token);

-- ============================================================
-- participant_responses
-- ============================================================
create table participant_responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null check (role in ('establishment', 'trainer')),
  global_preference text check (global_preference in ('ideal', 'possible', 'confirm_later')),
  keep_until date,
  comment text,
  response_status text not null default 'not_started' check (response_status in ('not_started', 'in_progress', 'submitted')),
  responded_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(session_id, role)
);

create trigger participant_responses_updated_at before update on participant_responses
  for each row execute function update_updated_at();

-- ============================================================
-- availabilities
-- ============================================================
create table availabilities (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  role text not null check (role in ('establishment', 'trainer')),
  availability_date date not null,
  slot text not null check (slot in ('morning', 'afternoon')),
  is_available boolean default true,
  preference_level text check (preference_level in ('ideal', 'possible', 'confirm_later')),
  keep_until date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index availabilities_session_role_idx on availabilities(session_id, role);
create index availabilities_date_slot_idx on availabilities(availability_date, slot);

create trigger availabilities_updated_at before update on availabilities
  for each row execute function update_updated_at();

-- ============================================================
-- proposals
-- ============================================================
create table proposals (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  proposal_type text not null,
  proposal_rank integer not null,
  score integer not null check (score between 0 and 100),
  compatibility_level text not null check (compatibility_level in ('strong', 'medium', 'fragile')),
  dates_json jsonb not null,
  units_count integer not null,
  earliest_keep_until date,
  dominant_preference text check (dominant_preference in ('ideal', 'possible', 'confirm_later')),
  status text not null default 'proposed' check (status in ('proposed', 'selected', 'discarded')),
  created_at timestamptz default now()
);

create index proposals_session_idx on proposals(session_id);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table programs enable row level security;
alter table sessions enable row level security;
alter table access_tokens enable row level security;
alter table participant_responses enable row level security;
alter table availabilities enable row level security;
alter table proposals enable row level security;

-- AEC (utilisateur authentifié) : accès total à ses sessions
create policy "AEC can manage own sessions"
  on sessions for all
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy "AEC can read programs"
  on programs for select
  using (auth.uid() is not null);

create policy "AEC can manage access_tokens of own sessions"
  on access_tokens for all
  using (session_id in (select id from sessions where created_by = auth.uid()));

create policy "AEC can manage participant_responses of own sessions"
  on participant_responses for all
  using (session_id in (select id from sessions where created_by = auth.uid()));

create policy "AEC can manage availabilities of own sessions"
  on availabilities for all
  using (session_id in (select id from sessions where created_by = auth.uid()));

create policy "AEC can manage proposals of own sessions"
  on proposals for all
  using (session_id in (select id from sessions where created_by = auth.uid()));

-- Accès public par token (établissement et intervenant)
-- Note : les pages publiques utilisent le service role key côté serveur
-- ou une function Supabase RPC pour valider le token avant toute opération.
-- Les policies ci-dessous permettent l'accès anonyme validé par token.

create policy "Public can read session via valid token"
  on sessions for select
  using (
    id in (
      select session_id from access_tokens
      where active = true
      and (expires_at is null or expires_at > now())
    )
  );

create policy "Public can insert availabilities via valid token"
  on availabilities for insert
  with check (
    session_id in (
      select session_id from access_tokens
      where active = true
      and (expires_at is null or expires_at > now())
    )
  );

create policy "Public can upsert participant_responses via valid token"
  on participant_responses for all
  using (
    session_id in (
      select session_id from access_tokens
      where active = true
      and (expires_at is null or expires_at > now())
    )
  );

-- Données initiales : quelques programmes exemples
insert into programs (name, catalog_duration_days) values
  ('Secourisme au travail (SST)', 2),
  ('Gestes et postures', 1),
  ('Habilitation électrique B0/H0', 1),
  ('Management d''équipe', 2),
  ('Autre', null);
