-- Solicitudes de apoyo psicológico profesional.
-- La persona deja sus datos y el caso; el equipo la contacta para conectarla
-- con un profesional (charlas grupales por Zoom o atención individual según el caso).
CREATE TABLE public.support_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  for_whom text NOT NULL,
  name text,
  contact text NOT NULL,
  case_details text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.support_requests TO anon, authenticated;
GRANT ALL ON public.support_requests TO service_role;

ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a support request.
CREATE POLICY "Anyone can submit a support request"
  ON public.support_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    for_whom IN ('mi', 'otra', 'albergue')
    AND length(coalesce(contact, '')) > 0
    AND length(contact) <= 300
    AND length(coalesce(case_details, '')) > 0
    AND length(case_details) <= 5000
    AND length(coalesce(name, '')) <= 200
  );

-- No SELECT policy: only the service role (project owner via dashboard) can read requests.
