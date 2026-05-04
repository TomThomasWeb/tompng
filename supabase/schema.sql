-- ─────────────────────────────────────────────────────────
-- tompng.co.uk — Supabase Schema
-- Run this in your Supabase dashboard > SQL Editor
-- ─────────────────────────────────────────────────────────

-- Bio content
create table if not exists bio_content (
  id uuid primary key default gen_random_uuid(),
  bio_text text not null default '',
  one_liners text[] not null default '{}',
  updated_at timestamptz default now()
);

-- Photos
create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text default '',
  location text default '',
  display_order integer not null default 0,
  created_at timestamptz default now()
);

-- Games
create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null default 0,
  name text not null,
  dominant_color text not null default '#4a7c5f',
  note text default ''
);

-- Albums
create table if not exists albums (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null default 0,
  title text not null,
  artist text not null,
  color_swatch text not null default '#1a1a2a'
);

-- Now content
create table if not exists now_content (
  id uuid primary key default gen_random_uuid(),
  working_on text not null default '',
  reading text not null default '',
  learning text not null default '',
  shooting_with text not null default '',
  updated_at timestamptz default now()
);

-- Gear
create table if not exists gear (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null default 0,
  brand text not null,
  model text not null,
  verdict_badge text not null default 'daily driver',
  tooltip text not null default ''
);

-- Tom Thomas / Freelance content
create table if not exists tt_content (
  id uuid primary key default gen_random_uuid(),
  description text not null default '',
  services text[] not null default '{}',
  projects_count integer not null default 0,
  available boolean not null default true,
  updated_at timestamptz default now()
);

-- Blog posts
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text not null default '',
  body text not null default '',
  reading_time integer not null default 3,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Site settings (social links etc.)
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  instagram_url text default '',
  github_url text default '',
  linkedin_url text default ''
);

-- ─── Row Level Security ───────────────────────────────────

alter table bio_content enable row level security;
alter table photos enable row level security;
alter table games enable row level security;
alter table albums enable row level security;
alter table now_content enable row level security;
alter table gear enable row level security;
alter table tt_content enable row level security;
alter table posts enable row level security;
alter table site_settings enable row level security;

-- Public can read everything
create policy "Public read bio" on bio_content for select using (true);
create policy "Public read photos" on photos for select using (true);
create policy "Public read games" on games for select using (true);
create policy "Public read albums" on albums for select using (true);
create policy "Public read now" on now_content for select using (true);
create policy "Public read gear" on gear for select using (true);
create policy "Public read tt" on tt_content for select using (true);
create policy "Public read posts" on posts for select using (true);
create policy "Public read settings" on site_settings for select using (true);

-- Authenticated users can do everything (you're the only admin)
create policy "Auth all bio" on bio_content for all using (auth.role() = 'authenticated');
create policy "Auth all photos" on photos for all using (auth.role() = 'authenticated');
create policy "Auth all games" on games for all using (auth.role() = 'authenticated');
create policy "Auth all albums" on albums for all using (auth.role() = 'authenticated');
create policy "Auth all now" on now_content for all using (auth.role() = 'authenticated');
create policy "Auth all gear" on gear for all using (auth.role() = 'authenticated');
create policy "Auth all tt" on tt_content for all using (auth.role() = 'authenticated');
create policy "Auth all posts" on posts for all using (auth.role() = 'authenticated');
create policy "Auth all settings" on site_settings for all using (auth.role() = 'authenticated');

-- ─── Storage Bucket ───────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "Public photo read" on storage.objects
  for select using (bucket_id = 'photos');

create policy "Auth photo upload" on storage.objects
  for insert with check (auth.role() = 'authenticated' and bucket_id = 'photos');

create policy "Auth photo delete" on storage.objects
  for delete using (auth.role() = 'authenticated' and bucket_id = 'photos');

-- ─── Seed initial settings row ────────────────────────────

insert into site_settings (instagram_url, github_url, linkedin_url)
values ('', '', '')
on conflict do nothing;
