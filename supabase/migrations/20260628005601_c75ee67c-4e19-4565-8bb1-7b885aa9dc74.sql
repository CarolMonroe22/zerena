CREATE TABLE public.network_signups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role text NOT NULL,
  name text,
  contact text NOT NULL,
  details text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT INSERT ON public.network_signups TO anon, authenticated;
GRANT ALL ON public.network_signups TO service_role;
ALTER TABLE public.network_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a network signup"
  ON public.network_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(COALESCE(role, '')) > 0 AND length(role) <= 50
    AND length(COALESCE(contact, '')) > 0 AND length(contact) <= 300
    AND length(COALESCE(name, '')) <= 200
    AND length(COALESCE(details, '')) <= 5000
  );