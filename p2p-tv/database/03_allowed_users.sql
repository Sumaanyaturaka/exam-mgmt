create table public.allowed_users (
  email text primary key check (email = lower(email)),
  full_name text not null,
  role text not null check (role in ('admin', 'incharge', 'student')),
  roll_number text unique references public.students(roll_number),
  created_at timestamptz not null default now(),
  check (role <> 'student' or roll_number is not null)
);
alter table public.allowed_users enable row level security;
