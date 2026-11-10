create table if not exists public.comments (
  id bigint generated always as identity primary key,
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- The project may already have the earlier manually-created schema, where the
-- body column is named `comment`. Copy it forward and keep the old column/data.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'comments' and column_name = 'comment'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'comments' and column_name = 'message'
  ) then
    alter table public.comments add column message text;
    update public.comments set message = comment;
  elsif exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'comments' and column_name = 'comment'
  ) then
    update public.comments set message = comment where message is null;
  end if;
end;
$$;

alter table public.comments alter column message set not null;
alter table public.comments alter column created_at set default now();
update public.comments set created_at = now() where created_at is null;
alter table public.comments alter column created_at set not null;

create table if not exists public.comment_rate_limits (
  ip_hash text primary key check (ip_hash ~ '^[a-f0-9]{64}$'),
  window_started_at timestamptz not null default now(),
  submission_count integer not null default 0
);

alter table public.comments enable row level security;
alter table public.comment_rate_limits enable row level security;

-- Public visitors access comments only through the Edge Function. The service role
-- is kept server-side and is the only role permitted to call this insert RPC.
drop policy if exists "Anyone can read comments" on public.comments;
drop policy if exists "Anyone can submit comments" on public.comments;
revoke all on public.comments from public, anon, authenticated;
revoke all on public.comment_rate_limits from public, anon, authenticated;
revoke all on sequence public.comments_id_seq from public, anon, authenticated;
grant select, insert on public.comments to service_role;
grant select, insert, update on public.comment_rate_limits to service_role;
grant usage, select on sequence public.comments_id_seq to service_role;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'comments_name_length_check' and conrelid = 'public.comments'::regclass) then
    alter table public.comments add constraint comments_name_length_check
      check (char_length(name) between 1 and 60) not valid;
  end if;
  if not exists (select 1 from pg_constraint where conname = 'comments_message_length_check' and conrelid = 'public.comments'::regclass) then
    alter table public.comments add constraint comments_message_length_check
      check (char_length(message) between 1 and 1000) not valid;
  end if;
end;
$$;

create or replace function public.publish_comment(
  p_name text,
  p_message text,
  p_ip_hash text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
begin
  if p_name is null or p_message is null or p_ip_hash is null
     or char_length(trim(p_name)) not between 1 and 60
     or char_length(trim(p_message)) not between 1 and 1000
     or p_ip_hash !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid comment';
  end if;

  insert into public.comment_rate_limits (ip_hash, window_started_at, submission_count)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update set
    window_started_at = case
      when public.comment_rate_limits.window_started_at < now() - interval '1 hour' then now()
      else public.comment_rate_limits.window_started_at
    end,
    submission_count = case
      when public.comment_rate_limits.window_started_at < now() - interval '1 hour' then 1
      else public.comment_rate_limits.submission_count + 1
    end
  returning submission_count into current_count;

  if current_count > 3 then
    return false;
  end if;

  insert into public.comments (name, message)
  values (trim(p_name), trim(p_message));
  return true;
end;
$$;

revoke all on function public.publish_comment(text, text, text) from public, anon, authenticated;
grant execute on function public.publish_comment(text, text, text) to service_role;
