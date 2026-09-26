-- My Finance: Supabase schema
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  currency text not null default 'THB',
  language text not null default 'en',
  monthly_budget numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  category text not null default 'Other',
  type text not null check (type in ('income','expense')),
  amount numeric(14,2) not null check (amount >= 0),
  date date not null default current_date,
  account text not null default 'Cash',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  amount numeric(14,2) not null check (amount >= 0),
  month date not null,
  created_at timestamptz not null default now(),
  unique(user_id, category, month)
);

alter table public.profiles enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;

drop policy if exists "profiles own rows" on public.profiles;
create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "transactions own rows" on public.transactions;
create policy "transactions own rows" on public.transactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "budgets own rows" on public.budgets;
create policy "budgets own rows" on public.budgets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name) values (new.id, coalesce(new.raw_user_meta_data->>'full_name','')) on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
