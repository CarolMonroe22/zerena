DROP POLICY IF EXISTS "Anyone can request support with consent" ON public.support_requests;

CREATE POLICY "Anyone can submit support requests"
ON public.support_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (for_whom = ANY (ARRAY['mi'::text, 'otra'::text, 'albergue'::text, 'adulto'::text, 'nino'::text, 'adulto_mayor'::text])) AND
  (length(COALESCE(contact, ''::text)) > 0) AND
  (length(contact) <= 300) AND
  (length(COALESCE(signs, ''::text)) <= 5000) AND
  (length(COALESCE(shelter, ''::text)) <= 1000) AND
  (length(COALESCE(shelter_name, ''::text)) <= 300) AND
  (length(COALESCE(shelter_location, ''::text)) <= 300) AND
  (length(COALESCE(shelter_people_count, ''::text)) <= 100) AND
  (length(COALESCE(shelter_contact, ''::text)) <= 300)
);