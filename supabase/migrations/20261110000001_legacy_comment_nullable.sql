-- Keep all existing legacy comment text, but allow new records to use `message`.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'comments'
      and column_name = 'comment' and is_nullable = 'NO'
  ) then
    alter table public.comments alter column comment drop not null;
  end if;
end;
$$;
