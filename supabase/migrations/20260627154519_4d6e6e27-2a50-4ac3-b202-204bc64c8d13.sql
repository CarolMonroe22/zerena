CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  contact text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact message
CREATE POLICY "Anyone can submit a contact message"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(coalesce(message, '')) > 0
    AND length(coalesce(contact, '')) > 0
    AND length(message) <= 5000
    AND length(contact) <= 300
    AND length(coalesce(name, '')) <= 200
  );

-- No SELECT policy: only the service role (project owner via dashboard) can read messages.
