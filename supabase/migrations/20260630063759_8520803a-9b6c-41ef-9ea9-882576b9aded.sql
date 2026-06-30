-- 1. Crear tipo de rol
CREATE TYPE public.app_role AS ENUM ('coordinador', 'profesional', 'voluntario');

-- 2. Crear tabla user_roles
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Permisos en public.user_roles (solo usuarios autenticados pueden leer, service_role todo)
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- 4. Activar RLS en user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 5. Crear función SECURITY DEFINER has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Función auxiliar para verificar si es cualquier rol de staff
CREATE OR REPLACE FUNCTION public.is_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    where user_id = _user_id
  )
$$;

-- 6. Políticas RLS en user_roles
CREATE POLICY "Staff can read user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

-- 7. Trigger para asignar automáticamente rol coordinador a hello@carolmonroe.com
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.email = 'hello@carolmonroe.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'coordinador'::app_role)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_assign_role ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- Si ya existiera el usuario de carolmonroe en auth.users (por si se creó antes), asignarle rol
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'coordinador'::app_role
FROM auth.users
WHERE email = 'hello@carolmonroe.com'
ON CONFLICT DO NOTHING;

-- 8. Políticas en support_requests para staff
CREATE POLICY "Staff can view support requests"
ON public.support_requests
FOR SELECT
TO authenticated
USING (public.is_staff(auth.uid()));

CREATE POLICY "Staff can update support requests"
ON public.support_requests
FOR UPDATE
TO authenticated
USING (public.is_staff(auth.uid()))
WITH CHECK (public.is_staff(auth.uid()));
