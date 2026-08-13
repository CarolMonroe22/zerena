-- Audio generado una sola vez por práctica. El bucket es públicamente legible;
-- solo el servidor (service role) escribe archivos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('practice-audio', 'practice-audio', true, 20971520, array['audio/mpeg'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
