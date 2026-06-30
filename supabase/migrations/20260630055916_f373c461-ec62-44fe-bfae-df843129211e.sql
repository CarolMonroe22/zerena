ALTER TABLE public.support_requests
  ADD COLUMN IF NOT EXISTS shelter_name text,
  ADD COLUMN IF NOT EXISTS shelter_location text,
  ADD COLUMN IF NOT EXISTS shelter_people_count text,
  ADD COLUMN IF NOT EXISTS shelter_contact text;