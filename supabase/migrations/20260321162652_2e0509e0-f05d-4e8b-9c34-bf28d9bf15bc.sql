-- Remove permissive TRUE policies and replace with constrained access

-- Projects: public sees only visible content, admins see everything
DROP POLICY IF EXISTS "Anyone can read projects" ON public.projects;
DROP POLICY IF EXISTS "Public can read visible projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can read all projects" ON public.projects;

CREATE POLICY "Public can read visible projects"
ON public.projects
FOR SELECT
TO public
USING (visible = true);

CREATE POLICY "Admins can read all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Videos: public sees only visible content, admins see everything
DROP POLICY IF EXISTS "Anyone can read videos" ON public.videos;
DROP POLICY IF EXISTS "Public can read visible videos" ON public.videos;
DROP POLICY IF EXISTS "Admins can read all videos" ON public.videos;

CREATE POLICY "Public can read visible videos"
ON public.videos
FOR SELECT
TO public
USING (visible = true);

CREATE POLICY "Admins can read all videos"
ON public.videos
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Requests: public can submit only fresh requests, admins can read/manage
DROP POLICY IF EXISTS "Anyone can read requests" ON public.requests;
DROP POLICY IF EXISTS "Anyone can insert requests" ON public.requests;
DROP POLICY IF EXISTS "Public can submit new requests" ON public.requests;
DROP POLICY IF EXISTS "Admins can read all requests" ON public.requests;

CREATE POLICY "Public can submit new requests"
ON public.requests
FOR INSERT
TO public
WITH CHECK (
  coalesce(length(trim(full_name)), 0) > 0
  AND coalesce(length(trim(phone)), 0) > 0
  AND coalesce(status, 'new') = 'new'
);

CREATE POLICY "Admins can read all requests"
ON public.requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));