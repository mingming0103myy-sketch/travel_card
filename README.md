# Travel Postcard Generator

Turn your travel photos into AI-generated postcards and send them by email.

**Author**: Arria Zhang

## Features

- **Upload** a travel photo
- **Generate** a postcard with a **free local filter** (warm tones, vignette — no API key needed)
- **Send** the postcard to someone via email (Resend)
- Responsive, minimal UI with a travel-journal feel

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Postcard effect** — client-side Canvas (free, no Replicate)
- **Resend** (transactional email, free tier available)
- Deployable on **Vercel**

## Setup

1. Clone and install:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Add your keys in `.env.local`:

   - **RESEND_API_KEY** — [Resend](https://resend.com/api-keys) (required for sending emails; free tier available)
   - **RESEND_FROM_EMAIL** (optional) — verified domain in Resend; defaults to `onboarding@resend.dev` for testing  
   - Postcard **generation is free** (runs in the browser, no API key needed).

4. Run the app:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Not receiving emails?

- **Using `onboarding@resend.dev` (default):** Resend may only deliver to the email address you used to sign up. Try sending a postcard **to your own Resend account email** first to confirm the key works.
- **Check spam/junk** for the recipient.
- **Verify your domain:** In [Resend Dashboard](https://resend.com/domains) add and verify a domain, then set `RESEND_FROM_EMAIL=postcards@yourdomain.com` in `.env.local` to send to any address.
- If the app shows an error when you click “Send postcard”, that message is from Resend — read it for the exact reason (e.g. recipient not allowed, invalid from address).

## Deploy on Vercel

1. Push the repo to GitHub and import the project in Vercel.
2. In the project **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (optional; use a verified domain for production)
3. Deploy. Resend’s free tier works with `onboarding@resend.dev` for testing.

## Project Structure

- `app/page.tsx` — Landing page
- `app/create/page.tsx` — Upload, generate, form, and send flow
- `app/success/page.tsx` — Confirmation after sending
- `lib/postcardFilter.ts` — free client-side postcard effect (warm + vignette)
- `app/api/send-postcard/route.ts` — Resend API (email with postcard image)
