-- Schéma SQL pour Supabase (PostgreSQL)
create extension if not exists "uuid-ossp";

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  contact_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  postal_code text not null,
  city text not null,
  sector text not null check (sector in ('44', '49', '85')),
  client_type text not null,
  status text not null check (status in ('prospect', 'actif', 'a_relancer', 'inactif')),
  notes text default '',
  created_at timestamptz not null default now()
);

create table if not exists visits (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  date date not null,
  objective text not null,
  report text not null,
  next_action text not null,
  next_follow_up_date date,
  interest_level text not null check (interest_level in ('chaud', 'tiede', 'froid')),
  quote_to_send boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists follow_ups (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  due_date date not null,
  title text not null,
  details text,
  done boolean not null default false,
  done_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients(id) on delete cascade,
  sent_at date not null,
  reference text not null,
  amount numeric(12,2) not null,
  status text not null check (status in ('en_attente', 'relance', 'gagne', 'perdu')),
  follow_up_date date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_clients_sector on clients(sector);
create index if not exists idx_clients_status on clients(status);
create index if not exists idx_visits_client_date on visits(client_id, date desc);
create index if not exists idx_followups_due on follow_ups(due_date, done);
create index if not exists idx_quotes_status on quotes(status);
