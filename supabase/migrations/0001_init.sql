-- Visit San Carlos: esquema inicial
-- Ejecutar en Supabase (SQL Editor) o vía `supabase db push`.

-- ============ PERFILES ============
-- Un perfil por usuario autenticado (se crea automáticamente al registrarse).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  admin_role text not null default 'none' check (admin_role in ('none', 'super', 'limitado')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: cualquiera autenticado puede leer" on public.profiles
  for select to authenticated using (true);

create policy "profiles: cada quien edita su propio perfil" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- Correo del admin principal; solo esta cuenta puede otorgar/quitar roles de admin.
create or replace function public.is_super_admin(uid uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = uid and email = 'visit.sancarlos.son@gmail.com'
  );
$$;

create policy "profiles: solo super admin cambia admin_role" on public.profiles
  for update to authenticated
  using (public.is_super_admin(auth.uid()))
  with check (public.is_super_admin(auth.uid()));

-- Cualquier administrador (principal o limitado) puede moderar contenido.
create or replace function public.is_admin(uid uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = uid and admin_role in ('super', 'limitado')
  );
$$;

-- Invitaciones de administrador: el super admin agrega un correo aquí ANTES
-- de que esa persona inicie sesión. Cuando esa persona entra por primera vez
-- con Google/Facebook, el trigger de abajo le asigna el rol invitado.
create table if not exists public.admin_invites (
  email text primary key,
  role text not null default 'limitado' check (role in ('limitado', 'super')),
  invited_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.admin_invites enable row level security;

create policy "admin_invites: solo super admin lee/escribe" on public.admin_invites
  for all to authenticated
  using (public.is_super_admin(auth.uid()))
  with check (public.is_super_admin(auth.uid()));

-- Crea el perfil automáticamente cuando alguien se registra (Google/Facebook/email).
-- Si el correo tiene una invitación de administrador pendiente, la aplica y la consume.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  invite_role text;
begin
  select role into invite_role from public.admin_invites where email = new.email;

  insert into public.profiles (id, email, full_name, avatar_url, admin_role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    case
      when new.email = 'visit.sancarlos.son@gmail.com' then 'super'
      when invite_role is not null then invite_role
      else 'none'
    end
  )
  on conflict (id) do nothing;

  delete from public.admin_invites where email = new.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Negocios/eventos/clasificados comparten los mismos 4 estados de moderación.
-- 'pendiente' = recién enviado por un usuario, esperando revisión.
-- 'aprobado'  = visible en el sitio público.
-- 'rechazado' = revisado y no aprobado.
-- 'archivado' = estuvo publicado y el admin lo retiró temporalmente.

-- ============ NEGOCIOS (Directorio) ============
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  category text not null,
  location text,
  hours text,
  price_range text default '$',
  phone text,
  description text,
  features text[] not null default '{}',
  photo_placeholder text,
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'rechazado', 'archivado')),
  featured boolean not null default false,
  rating numeric not null default 0,
  review_count integer not null default 0,
  views integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.businesses enable row level security;

create policy "businesses: lectura pública de aprobados" on public.businesses
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "businesses: dueño crea su propio negocio" on public.businesses
  for insert to authenticated with check (owner_id = auth.uid());

create policy "businesses: dueño edita el suyo, admin edita cualquiera" on public.businesses
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "businesses: dueño o admin elimina" on public.businesses
  for delete to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ CLASIFICADOS ============
create table if not exists public.classifieds (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  category text not null,
  price numeric not null default 0,
  condition text not null default 'Usado' check (condition in ('Nuevo', 'Usado')),
  location text,
  phone text,
  description text,
  photo_placeholder text,
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'rechazado', 'archivado')),
  views integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.classifieds enable row level security;

create policy "classifieds: lectura pública de aprobados" on public.classifieds
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "classifieds: dueño crea el suyo" on public.classifieds
  for insert to authenticated with check (owner_id = auth.uid());

create policy "classifieds: dueño edita el suyo, admin edita cualquiera" on public.classifieds
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "classifieds: dueño o admin elimina" on public.classifieds
  for delete to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ EVENTOS ============
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  category text not null,
  date date not null,
  end_date date,
  time text,
  end_time text,
  location text,
  phone text,
  description text,
  cost text,
  organizers text,
  email text,
  facebook text,
  instagram text,
  website text,
  photo_placeholder text,
  status text not null default 'pendiente' check (status in ('pendiente', 'aprobado', 'rechazado', 'archivado')),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events: lectura pública de aprobados" on public.events
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "events: dueño crea el suyo" on public.events
  for insert to authenticated with check (owner_id = auth.uid());

create policy "events: dueño edita el suyo, admin edita cualquiera" on public.events
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

create policy "events: dueño o admin elimina" on public.events
  for delete to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ BLOG (solo administradores publican) ============
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  excerpt text,
  body text,
  category text,
  photo_placeholder text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "blog: lectura pública de publicados" on public.blog_posts
  for select using (published = true or public.is_admin(auth.uid()));

create policy "blog: solo administradores publican" on public.blog_posts
  for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- ============ GALERÍA (fotos subidas por administradores) ============
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  uploader_id uuid not null references public.profiles (id) on delete cascade,
  url text not null,
  caption text,
  category text not null default 'Comunidad',
  tall boolean not null default false,
  status text not null default 'aprobado' check (status in ('pendiente', 'aprobado')),
  created_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

create policy "gallery_photos: lectura pública de aprobadas" on public.gallery_photos
  for select using (status = 'aprobado' or public.is_admin(auth.uid()));

create policy "gallery_photos: solo administradores suben/editan/eliminan" on public.gallery_photos
  for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Bucket de Storage para las fotos de la galería (público de solo lectura).
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "gallery bucket: lectura pública" on storage.objects
  for select using (bucket_id = 'gallery');

create policy "gallery bucket: solo administradores suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery' and public.is_admin(auth.uid()));

create policy "gallery bucket: solo administradores eliminan" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery' and public.is_admin(auth.uid()));

-- ============ CHAT DE SOPORTE ============
create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

alter table public.chats enable row level security;
alter table public.chat_messages enable row level security;

create policy "chats: dueño o admin ve el chat" on public.chats
  for select to authenticated using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles where id = auth.uid() and admin_role in ('super', 'limitado'))
  );

create policy "chats: usuario crea su propio chat" on public.chats
  for insert to authenticated with check (user_id = auth.uid());

create policy "chat_messages: dueño o admin lee/escribe" on public.chat_messages
  for all to authenticated using (
    exists (
      select 1 from public.chats
      where chats.id = chat_messages.chat_id
        and (chats.user_id = auth.uid() or exists (
          select 1 from public.profiles where id = auth.uid() and admin_role in ('super', 'limitado')
        ))
    )
  );
