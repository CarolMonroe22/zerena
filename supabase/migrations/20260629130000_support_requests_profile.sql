-- Perfil de la persona atendida (opcional) y, si aplica, tipo de apoyo por
-- discapacidad. Ayuda al equipo a saber a quién va antes de contactar.
ALTER TABLE public.support_requests
  ADD COLUMN IF NOT EXISTS profile text,
  ADD COLUMN IF NOT EXISTS disability_type text;

ALTER TABLE public.support_requests
  ADD CONSTRAINT support_requests_profile_chk
    CHECK (profile IS NULL OR profile IN ('general', 'nino', 'cuidador', 'mayor', 'discapacidad')),
  ADD CONSTRAINT support_requests_disability_chk
    CHECK (disability_type IS NULL OR disability_type IN ('visual', 'auditiva', 'motora', 'cognitiva', 'otra'));
