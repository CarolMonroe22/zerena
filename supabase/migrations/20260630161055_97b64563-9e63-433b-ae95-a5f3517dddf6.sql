-- Revocar EXECUTE público sobre funciones SECURITY DEFINER internas.
-- Estas funciones solo deben usarse desde políticas RLS y triggers, nunca
-- ser invocables directamente por anon o authenticated vía la Data API.

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_coordinador_on_signup() FROM PUBLIC, anon, authenticated;