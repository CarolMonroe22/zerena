
ALTER TABLE public.network_signups
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS availability text,
  ADD COLUMN IF NOT EXISTS help_areas text,
  ADD COLUMN IF NOT EXISTS professional_status text,
  ADD COLUMN IF NOT EXISTS specialty text,
  ADD COLUMN IF NOT EXISTS credential text,
  ADD COLUMN IF NOT EXISTS institution text,
  ADD COLUMN IF NOT EXISTS study_year text,
  ADD COLUMN IF NOT EXISTS training_done text,
  ADD COLUMN IF NOT EXISTS org_type text,
  ADD COLUMN IF NOT EXISTS website text;

ALTER TABLE public.network_signups
  ADD CONSTRAINT network_signups_location_len CHECK (location IS NULL OR length(location) <= 200),
  ADD CONSTRAINT network_signups_availability_len CHECK (availability IS NULL OR length(availability) <= 50),
  ADD CONSTRAINT network_signups_help_areas_len CHECK (help_areas IS NULL OR length(help_areas) <= 500),
  ADD CONSTRAINT network_signups_professional_status_len CHECK (professional_status IS NULL OR length(professional_status) <= 50),
  ADD CONSTRAINT network_signups_specialty_len CHECK (specialty IS NULL OR length(specialty) <= 200),
  ADD CONSTRAINT network_signups_credential_len CHECK (credential IS NULL OR length(credential) <= 200),
  ADD CONSTRAINT network_signups_institution_len CHECK (institution IS NULL OR length(institution) <= 200),
  ADD CONSTRAINT network_signups_study_year_len CHECK (study_year IS NULL OR length(study_year) <= 50),
  ADD CONSTRAINT network_signups_training_done_len CHECK (training_done IS NULL OR length(training_done) <= 20),
  ADD CONSTRAINT network_signups_org_type_len CHECK (org_type IS NULL OR length(org_type) <= 100),
  ADD CONSTRAINT network_signups_website_len CHECK (website IS NULL OR length(website) <= 300);
