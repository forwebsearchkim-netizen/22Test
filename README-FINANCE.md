# My Finance — Dashio Finance App

A finance dashboard built from the uploaded Dashio template and prepared for Netlify + Supabase.

## Included
- Dashboard with THB balance, income, expenses, transaction count
- Cash-flow and expense-category charts
- Transactions page with add/delete
- Supabase Auth: login, registration, password reset
- Supabase tables + Row Level Security in `supabase/schema.sql`
- Profile and settings pages
- Light/dark theme
- Mobile responsive Dashio layout
- Local demo mode when Supabase environment variables are not configured

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your Supabase URL and anon/publishable key.
5. In Supabase SQL Editor, run `supabase/schema.sql`.
6. Run `npm run dev`.
7. Open the URL shown by Vite.

Without Supabase keys, the app runs in demo mode and stores demo transactions in browser localStorage.

## Netlify
Build command: `npm run build`
Publish directory: `dist`

Add these Netlify environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Do not put a Supabase service-role key in the frontend.

## Important
The original Dashio demo pages are kept in `src/pages/` for reference but are not included in the Vite production build. The nested template ZIP archives were removed to keep this project smaller.
