-- Visit San Carlos: esquema inicial
-- Ejecutar en Supabase (SQL Editor) o vía `supabase db push`.
-- Este archivo se puede correr varias veces sin error (crea/reemplaza todo de forma segura).

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

drop policy if exists "profiles: cualquiera autenticado puede leer" on public.profiles;
create policy "profiles: cualquiera autenticado puede leer" on public.profiles
  for select to authenticated using (true);

drop policy if exists "profiles: cada quien edita su propio perfil" on public.profiles;
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

drop policy if exists "profiles: solo super admin cambia admin_role" on public.profiles;
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

drop policy if exists "admin_invites: solo super admin lee/escribe" on public.admin_invites;
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

drop policy if exists "businesses: lectura pública de aprobados" on public.businesses;
create policy "businesses: lectura pública de aprobados" on public.businesses
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "businesses: dueño crea su propio negocio" on public.businesses;
create policy "businesses: dueño crea su propio negocio" on public.businesses
  for insert to authenticated with check (owner_id = auth.uid());

drop policy if exists "businesses: dueño edita el suyo, admin edita cualquiera" on public.businesses;
create policy "businesses: dueño edita el suyo, admin edita cualquiera" on public.businesses
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "businesses: dueño o admin elimina" on public.businesses;
create policy "businesses: dueño o admin elimina" on public.businesses
  for delete to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

-- ============ RESEÑAS (Directorio) ============
-- Una reseña por usuario por negocio (constraint unique más abajo). El
-- rating/review_count de `businesses` se recalculan solos con el trigger de
-- abajo cada vez que se inserta, edita o borra una reseña.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, author_id)
);

alter table public.reviews enable row level security;

drop policy if exists "reviews: lectura pública" on public.reviews;
create policy "reviews: lectura pública" on public.reviews
  for select using (true);

drop policy if exists "reviews: autenticado crea la suya" on public.reviews;
create policy "reviews: autenticado crea la suya" on public.reviews
  for insert to authenticated with check (author_id = auth.uid());

drop policy if exists "reviews: autor edita la suya" on public.reviews;
create policy "reviews: autor edita la suya" on public.reviews
  for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());

drop policy if exists "reviews: autor o admin elimina" on public.reviews;
create policy "reviews: autor o admin elimina" on public.reviews
  for delete to authenticated using (author_id = auth.uid() or public.is_admin(auth.uid()));

create or replace function public.recalc_business_rating()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  target_id uuid;
begin
  target_id := coalesce(new.business_id, old.business_id);

  update public.businesses b
  set rating = coalesce((select round(avg(r.rating)::numeric, 1) from public.reviews r where r.business_id = target_id), 0),
      review_count = (select count(*) from public.reviews r where r.business_id = target_id)
  where b.id = target_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists on_review_change on public.reviews;
create trigger on_review_change
  after insert or update or delete on public.reviews
  for each row execute procedure public.recalc_business_rating();

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

drop policy if exists "classifieds: lectura pública de aprobados" on public.classifieds;
create policy "classifieds: lectura pública de aprobados" on public.classifieds
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "classifieds: dueño crea el suyo" on public.classifieds;
create policy "classifieds: dueño crea el suyo" on public.classifieds
  for insert to authenticated with check (owner_id = auth.uid());

drop policy if exists "classifieds: dueño edita el suyo, admin edita cualquiera" on public.classifieds;
create policy "classifieds: dueño edita el suyo, admin edita cualquiera" on public.classifieds
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "classifieds: dueño o admin elimina" on public.classifieds;
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

drop policy if exists "events: lectura pública de aprobados" on public.events;
create policy "events: lectura pública de aprobados" on public.events
  for select using (status = 'aprobado' or owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "events: dueño crea el suyo" on public.events;
create policy "events: dueño crea el suyo" on public.events
  for insert to authenticated with check (owner_id = auth.uid());

drop policy if exists "events: dueño edita el suyo, admin edita cualquiera" on public.events;
create policy "events: dueño edita el suyo, admin edita cualquiera" on public.events
  for update to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "events: dueño o admin elimina" on public.events;
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
  -- Firma de autor que se muestra al final del artículo. Por default se usa el
  -- nombre/foto de la cuenta que publica, pero se puede sobrescribir aquí
  -- cuando la redactora o redactor es alguien más.
  author_name text,
  author_role text,
  author_photo_url text,
  author_facebook text,
  author_instagram text,
  author_website text,
  created_at timestamptz not null default now()
);

-- Por si la tabla ya existía de una corrida anterior de este script.
alter table public.blog_posts add column if not exists author_name text;
alter table public.blog_posts add column if not exists author_role text;
alter table public.blog_posts add column if not exists author_photo_url text;
alter table public.blog_posts add column if not exists author_facebook text;
alter table public.blog_posts add column if not exists author_instagram text;
alter table public.blog_posts add column if not exists author_website text;

alter table public.blog_posts enable row level security;

drop policy if exists "blog: lectura pública de publicados" on public.blog_posts;
create policy "blog: lectura pública de publicados" on public.blog_posts
  for select using (published = true or public.is_admin(auth.uid()));

drop policy if exists "blog: solo administradores publican" on public.blog_posts;
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

-- Varias etiquetas por foto: "category" se conserva (primera etiqueta,
-- por compatibilidad) y "categories" guarda la lista completa.
alter table public.gallery_photos add column if not exists categories text[] not null default '{}'::text[];
update public.gallery_photos set categories = array[category] where categories = '{}'::text[];

alter table public.gallery_photos enable row level security;

drop policy if exists "gallery_photos: lectura pública de aprobadas" on public.gallery_photos;
create policy "gallery_photos: lectura pública de aprobadas" on public.gallery_photos
  for select using (status = 'aprobado' or public.is_admin(auth.uid()));

drop policy if exists "gallery_photos: solo administradores suben/editan/eliminan" on public.gallery_photos;
create policy "gallery_photos: solo administradores suben/editan/eliminan" on public.gallery_photos
  for all to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Bucket de Storage para las fotos de la galería (público de solo lectura).
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery bucket: lectura pública" on storage.objects;
create policy "gallery bucket: lectura pública" on storage.objects
  for select using (bucket_id = 'gallery');

drop policy if exists "gallery bucket: solo administradores suben" on storage.objects;
create policy "gallery bucket: solo administradores suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery' and public.is_admin(auth.uid()));

drop policy if exists "gallery bucket: solo administradores eliminan" on storage.objects;
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

drop policy if exists "chats: dueño o admin ve el chat" on public.chats;
create policy "chats: dueño o admin ve el chat" on public.chats
  for select to authenticated using (
    user_id = auth.uid()
    or exists (select 1 from public.profiles where id = auth.uid() and admin_role in ('super', 'limitado'))
  );

drop policy if exists "chats: usuario crea su propio chat" on public.chats;
create policy "chats: usuario crea su propio chat" on public.chats
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "chat_messages: dueño o admin lee/escribe" on public.chat_messages;
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

-- ============ MENSAJES DE CONTACTO ============
-- Envíos del formulario de /contacto. Cualquiera (incluso sin sesión) puede
-- insertar el suyo; solo un admin puede leerlos/marcarlos/borrarlos. El
-- envío del correo real se maneja aparte, en el route handler de la app.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_messages: cualquiera puede enviar" on public.contact_messages;
create policy "contact_messages: cualquiera puede enviar" on public.contact_messages
  for insert with check (true);

drop policy if exists "contact_messages: solo admin lee" on public.contact_messages;
create policy "contact_messages: solo admin lee" on public.contact_messages
  for select to authenticated using (public.is_admin(auth.uid()));

drop policy if exists "contact_messages: solo admin edita" on public.contact_messages;
create policy "contact_messages: solo admin edita" on public.contact_messages
  for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

drop policy if exists "contact_messages: solo admin elimina" on public.contact_messages;
create policy "contact_messages: solo admin elimina" on public.contact_messages
  for delete to authenticated using (public.is_admin(auth.uid()));

-- ============ CHATBOT: conversaciones grabadas del asistente ============
-- El visitante deja su nombre y correo/whatsapp antes de chatear; a partir
-- de ahí la conversación se va guardando (aunque se pierda la conexión)
-- para que un admin pueda revisarla en Admin → Soporte.
create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null,
  contact_email text,
  contact_phone text,
  messages jsonb not null default '[]'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.chat_conversations enable row level security;

drop policy if exists "chat_conversations: cualquiera puede crear la suya" on public.chat_conversations;
create policy "chat_conversations: cualquiera puede crear la suya" on public.chat_conversations
  for insert with check (true);

-- El id lo genera el navegador (uuid), así que no necesita leer de vuelta
-- la fila para seguir agregando mensajes con update.
drop policy if exists "chat_conversations: cualquiera puede actualizar la suya" on public.chat_conversations;
create policy "chat_conversations: cualquiera puede actualizar la suya" on public.chat_conversations
  for update using (true) with check (true);

drop policy if exists "chat_conversations: solo admin lee" on public.chat_conversations;
create policy "chat_conversations: solo admin lee" on public.chat_conversations
  for select to authenticated using (public.is_admin(auth.uid()));

drop policy if exists "chat_conversations: solo admin elimina" on public.chat_conversations;
create policy "chat_conversations: solo admin elimina" on public.chat_conversations
  for delete to authenticated using (public.is_admin(auth.uid()));

-- ============ NEWSLETTER: correos suscritos ============
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'web',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "newsletter_subscribers: cualquiera se suscribe" on public.newsletter_subscribers;
create policy "newsletter_subscribers: cualquiera se suscribe" on public.newsletter_subscribers
  for insert with check (true);

drop policy if exists "newsletter_subscribers: solo admin lee" on public.newsletter_subscribers;
create policy "newsletter_subscribers: solo admin lee" on public.newsletter_subscribers
  for select to authenticated using (public.is_admin(auth.uid()));

drop policy if exists "newsletter_subscribers: solo admin elimina" on public.newsletter_subscribers;
create policy "newsletter_subscribers: solo admin elimina" on public.newsletter_subscribers
  for delete to authenticated using (public.is_admin(auth.uid()));

-- ============ ANUNCIOS: espacios pagados de /paquetes ============
-- Cada fila es un anuncio real dentro de uno de los espacios que se venden
-- en /paquetes (carrusel_home, carrusel_hospedaje, restaurantes,
-- banner_estrella, carrusel_directorio). "Carrusel Eventos" (paquete G) no
-- vive aquí: sigue usando el flag "featured" de events, que ya es real.
create table if not exists public.ad_placements (
  id uuid primary key default gen_random_uuid(),
  slot text not null check (slot in ('carrusel_home', 'carrusel_hospedaje', 'restaurantes', 'banner_estrella', 'carrusel_directorio')),
  title text not null,
  subtitle text,
  image_url text not null,
  link_url text,
  starts_at date not null default current_date,
  ends_at date,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.ad_placements enable row level security;

drop policy if exists "ad_placements: lectura pública de vigentes" on public.ad_placements;
create policy "ad_placements: lectura pública de vigentes" on public.ad_placements
  for select using (active = true and starts_at <= current_date and (ends_at is null or ends_at >= current_date));

drop policy if exists "ad_placements: solo admin lee todo" on public.ad_placements;
create policy "ad_placements: solo admin lee todo" on public.ad_placements
  for select to authenticated using (public.is_admin(auth.uid()));

drop policy if exists "ad_placements: solo admin inserta" on public.ad_placements;
create policy "ad_placements: solo admin inserta" on public.ad_placements
  for insert to authenticated with check (public.is_admin(auth.uid()));

drop policy if exists "ad_placements: solo admin actualiza" on public.ad_placements;
create policy "ad_placements: solo admin actualiza" on public.ad_placements
  for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

drop policy if exists "ad_placements: solo admin elimina" on public.ad_placements;
create policy "ad_placements: solo admin elimina" on public.ad_placements
  for delete to authenticated using (public.is_admin(auth.uid()));

-- Bucket de Storage para las imágenes de los anuncios (público de solo lectura).
insert into storage.buckets (id, name, public)
values ('ads', 'ads', true)
on conflict (id) do nothing;

drop policy if exists "ads bucket: lectura pública" on storage.objects;
create policy "ads bucket: lectura pública" on storage.objects
  for select using (bucket_id = 'ads');

drop policy if exists "ads bucket: solo administradores suben" on storage.objects;
create policy "ads bucket: solo administradores suben" on storage.objects
  for insert to authenticated with check (bucket_id = 'ads' and public.is_admin(auth.uid()));

drop policy if exists "ads bucket: solo administradores borran" on storage.objects;
create policy "ads bucket: solo administradores borran" on storage.objects
  for delete to authenticated using (bucket_id = 'ads' and public.is_admin(auth.uid()));

-- ============ ÓRDENES DE ANUNCIO: compras que hace el negocio desde su Dashboard ============
-- Un negocio elige un paquete de /paquetes y paga con Mercado Pago (pago único
-- por el periodo, no suscripción). El precio SIEMPRE se recalcula en el
-- servidor a partir del catálogo (nunca se confía en lo que mande el navegador).
-- 'pendiente_pago'       = se creó la orden, esperando que Mercado Pago confirme el cobro.
-- 'pendiente_aprobacion' = ya se cobró, esperando que un admin revise el contenido y lo publique.
-- 'aprobado'             = el admin ya lo publicó (creó el ad_placement, marcó el evento
--                          como destacado, o lo marcó como cumplido manualmente).
-- 'rechazado'            = el admin no lo publicó; el reembolso (si aplica) se maneja
--                          manualmente fuera de este sistema.
create table if not exists public.ad_orders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  package_id text not null,
  package_name text not null,
  billing text not null check (billing in ('mensual', 'trimestral')),
  amount numeric not null,
  listing_type text check (listing_type in ('business', 'event')),
  listing_id uuid,
  listing_name text not null,
  status text not null default 'pendiente_pago' check (status in ('pendiente_pago', 'pendiente_aprobacion', 'aprobado', 'rechazado')),
  mp_preference_id text,
  mp_payment_id text,
  starts_at date,
  ends_at date,
  ad_placement_id uuid references public.ad_placements (id) on delete set null,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.ad_orders enable row level security;

drop policy if exists "ad_orders: dueño ve las suyas, admin ve todas" on public.ad_orders;
create policy "ad_orders: dueño ve las suyas, admin ve todas" on public.ad_orders
  for select to authenticated using (owner_id = auth.uid() or public.is_admin(auth.uid()));

drop policy if exists "ad_orders: dueño crea la suya" on public.ad_orders;
create policy "ad_orders: dueño crea la suya" on public.ad_orders
  for insert to authenticated with check (owner_id = auth.uid());

drop policy if exists "ad_orders: solo admin actualiza" on public.ad_orders;
create policy "ad_orders: solo admin actualiza" on public.ad_orders
  for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

drop policy if exists "ad_orders: dueño borra su borrador sin pagar" on public.ad_orders;
create policy "ad_orders: dueño borra su borrador sin pagar" on public.ad_orders
  for delete to authenticated using (owner_id = auth.uid() and status = 'pendiente_pago');
