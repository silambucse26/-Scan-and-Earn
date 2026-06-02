create extension if not exists pgcrypto;

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null unique,
  password text not null,
  user_type text not null check (user_type in ('farmer', 'veterinarian')),
  location text not null,
  join_date timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.accounts(id) on delete cascade,
  category text not null,
  disease_name text,
  items jsonb not null default '[]'::jsonb,
  points integer not null default 0,
  status text not null default 'pending',
  date timestamptz not null default now()
);

create table if not exists public.redeems (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.accounts(id) on delete cascade,
  points integer not null,
  amount numeric not null,
  upi_id text not null,
  status text not null default 'pending',
  date timestamptz not null default now(),
  paid_date timestamptz
);

alter table public.accounts disable row level security;
alter table public.submissions disable row level security;
alter table public.redeems disable row level security;

grant all on table public.accounts to anon, authenticated, service_role;
grant all on table public.submissions to anon, authenticated, service_role;
grant all on table public.redeems to anon, authenticated, service_role;

grant usage, select on all sequences in schema public to anon, authenticated, service_role;

alter publication supabase_realtime add table public.accounts;
alter publication supabase_realtime add table public.submissions;
alter publication supabase_realtime add table public.redeems;

insert into storage.buckets (id, name, public)
values ('submission-images', 'submission-images', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'storage' and policyname = 'public read submission images'
  ) then
    create policy "public read submission images"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'submission-images');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'storage' and policyname = 'public upload submission images'
  ) then
    create policy "public upload submission images"
    on storage.objects
    for insert
    to anon, authenticated
    with check (bucket_id = 'submission-images');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'storage' and policyname = 'public update submission images'
  ) then
    create policy "public update submission images"
    on storage.objects
    for update
    to anon, authenticated
    using (bucket_id = 'submission-images')
    with check (bucket_id = 'submission-images');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'storage' and policyname = 'public delete submission images'
  ) then
    create policy "public delete submission images"
    on storage.objects
    for delete
    to anon, authenticated
    using (bucket_id = 'submission-images');
  end if;
end $$;