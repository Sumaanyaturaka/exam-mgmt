# Academix: Examination Management

Next.js (App Router, JavaScript) + Tailwind + Supabase. Deploys on Vercel.

## Deploy (no terminal needed)
1. Upload this folder's CONTENTS to a new GitHub repo.
2. Vercel > Add New > Project > import the repo.
3. Add 3 environment variables (copy values from Supabase > Project Settings > API Keys):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY  (publishable key)
   - SUPABASE_SERVICE_ROLE_KEY      (secret key, never commit it)
4. Deploy, then open /test (should list 5 rooms) and /login.

## Run locally
npm install, copy .env.local.example to .env.local and fill it, then npm run dev.

## Rules
- All data access is in server code via lib/supabaseAdmin.js. Never import it in a 'use client' file.
- next.config.mjs keeps cacheComponents OFF. Do not turn it on.
- Delete app/test before sharing the live link publicly.
- Database map: docs/DATABASE.md. SQL helpers: database/.
