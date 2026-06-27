-- Red de apoyo: people who want to join as volunteer, mental-health professional, or organization.
CREATE TABLE public.network_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  name text,
  contact text NOT NULL,
  details text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.network_signups TO anon, authenticated;
GRANT ALL ON public.network_signups TO service_role;

ALTER TABLE public.network_signups ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can offer to join the network.
CREATE POLICY "Anyone can join the support network"
  ON public.network_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    role IN ('voluntario', 'profesional', 'organizacion')
    AND length(coalesce(contact, '')) > 0
    AND length(contact) <= 300
    AND length(coalesce(name, '')) <= 200
    AND length(coalesce(details, '')) <= 5000
  );

-- No SELECT policy: only the service role (project owner via dashboard) can read signups.
