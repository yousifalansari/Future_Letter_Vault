
-- letters table
create table public.letters (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  title text not null,

  unlock_at timestamptz not null,

  created_at timestamptz not null
    default now()
);


-- letter contents table
create table public.letter_contents (
  letter_id uuid primary key
    references public.letters(id)
    on delete cascade,

  content text not null
);


-- Enable Row Level Security
alter table public.letters
  enable row level security;

alter table public.letter_contents
  enable row level security;


-- Allow users to read their own letter metadata
create policy "Users can read their own letters"
on public.letters
for select
to authenticated
using (auth.uid() = user_id);


-- Allow users to create letters for themselves
-- The unlock date must be in the future
create policy "Users can create their own letters"
on public.letters
for insert
to authenticated
with check (
  auth.uid() = user_id
  and unlock_at > now()
);


-- Allow users to delete their own letters
create policy "Users can delete their own letters"
on public.letters
for delete
to authenticated
using (auth.uid() = user_id);


-- Allow users to read letter contents only after unlocking
create policy "Users can read unlocked letter contents"
on public.letter_contents
for select
to authenticated
using (
  exists (
    select 1
    from public.letters
    where letters.id = letter_contents.letter_id
      and letters.user_id = auth.uid()
      and letters.unlock_at <= now()
  )
);


-- Allow users to insert contents into their own locked letters
create policy "Users can create their own letter contents"
on public.letter_contents
for insert
to authenticated
with check (
  exists (
    select 1
    from public.letters
    where letters.id = letter_contents.letter_id
      and letters.user_id = auth.uid()
      and letters.unlock_at > now()
  )
);


-- Grant API permissions to authenticated users
grant select, insert, delete
on public.letters
to authenticated;

grant select, insert
on public.letter_contents
to authenticated;
