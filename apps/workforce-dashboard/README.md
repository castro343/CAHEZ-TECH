# CAHEZ AI Workforce Dashboard

Private customer workspace application for CAHEZ AI Workforce.

## Local setup

1. Install Node.js 22 or newer.
2. Copy `.env.example` to `.env.local`.
3. Set the Supabase project URL and publishable key.
4. Run `npm install`, then `npm run dev`.

## Environment

- `NEXT_PUBLIC_SUPABASE_URL`: CAHEZ Core project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: publishable key only. Never put a Supabase service-role or secret key in a browser environment variable.
- `NEXT_PUBLIC_APP_URL`: canonical app URL for deployment configuration.

## Authentication setup still required

In Supabase Dashboard → Authentication → URL Configuration:

- Set the Site URL to the deployed dashboard origin.
- Add `http://localhost:3000/auth/callback` and the deployed `https://YOUR-DASHBOARD-DOMAIN/auth/callback` to Redirect URLs.
- Configure production SMTP before inviting real customers. The default email sender is rate-limited and is not a production email service.
- Verify email confirmation and password recovery from a real test account before launch.

The application uses cookie-based SSR sessions through `@supabase/ssr`. Server-side identity checks use `auth.getClaims()`. Organisation creation calls the existing `create_organization` RPC; table-level access remains governed by RLS.

## Scope

This first slice includes signup, sign-in, email verification callback, password reset request, session refresh, protected dashboard, organisation listing and workspace creation. Team invitations, password-reset completion UI, AI employee management, billing, and integrations are not yet implemented.
