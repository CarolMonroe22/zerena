DROP POLICY IF EXISTS "Anyone can submit support requests" ON public.support_requests;

ALTER TABLE public.support_requests
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS case_details text,
  ADD COLUMN IF NOT EXISTS profile text,
  ADD COLUMN IF NOT EXISTS disability_type text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'nuevo',
  ADD COLUMN IF NOT EXISTS assigned_to text,
  ALTER COLUMN urgency SET DEFAULT 'media';

ALTER TABLE public.support_requests
  DROP COLUMN IF EXISTS signs,
  DROP COLUMN IF EXISTS shelter,
  DROP COLUMN IF EXISTS contact_is;

CREATE POLICY "Anyone can submit support requests"
ON public.support_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (for_whom = ANY (ARRAY['mi'::text, 'otra'::text, 'albergue'::text])) AND
  (profile IS NULL OR profile = ANY (ARRAY['adulto'::text, 'nino_adolescente'::text, 'cuidador'::text, 'adulto_mayor'::text, 'discapacidad'::text])) AND
  (disability_type IS NULL OR disability_type = ANY (ARRAY['visual'::text, 'auditiva'::text, 'motora'::text, 'cognitiva'::text, 'otra'::text])) AND
  (status = ANY (ARRAY['nuevo'::text, 'en_seguimiento'::text, 'cerrado'::text])) AND
  (urgency = ANY (ARRAY['alta'::text, 'media'::text, 'baja'::text])) AND
  (length(COALESCE(contact, ''::text)) > 0) AND
  (length(contact) <= 300) AND
  (length(COALESCE(name, ''::text)) <= 200) AND
  (length(COALESCE(case_details, ''::text)) <= 5000) AND
  (length(COALESCE(shelter_name, ''::text)) <= 300) AND
  (length(COALESCE(shelter_location, ''::text)) <= 300) AND
  (length(COALESCE(shelter_people_count, ''::text)) <= 100) AND
  (length(COALESCE(shelter_contact, ''::text)) <= 300) AND
  (consent = true)
);