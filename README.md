# NOVARA — Argjendari Novara

Premium e-commerce + showcase website for Argjendari Novara, Durrës.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + Resend + Vercel

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites

- **Node.js** 18.17 or higher → [download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** → [download here](https://git-scm.com)
- A code editor (recommended: [VS Code](https://code.visualstudio.com))

### 2. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

This will install all dependencies (~2 minutes first time).

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in:

- `SUPABASE_SERVICE_ROLE_KEY` — Get from Supabase Dashboard → Settings → API → service_role
  - **NEVER commit this key to git or share it publicly**
- `RESEND_API_KEY` — Sign up free at [resend.com](https://resend.com), get key from dashboard

The other values (Supabase URL, anon key, WhatsApp number) are already filled in.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Done!

---

## 📁 Project Structure

```
novara-frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Homepage (Albanian)
│   ├── globals.css         # Global styles + design tokens
│   └── api/                # API routes (forms, etc.) — added in Batch 3
├── components/
│   ├── layout/             # Nav, Footer, WhatsAppFloat
│   ├── sections/           # Hero, Collections, Services, etc.
│   └── ui/                 # Button, Container, SectionHeader
├── lib/
│   ├── supabase/           # Supabase clients (browser, server, admin)
│   ├── utils/              # Helpers
│   ├── config.ts           # Site config (contact, address, hours)
│   └── types.ts            # TypeScript types
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind config with design system
├── next.config.js          # Next.js config
└── package.json
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `gold` | #C9A961 | Primary accent |
| `gold-light` | #E5C989 | Highlights on dark bg |
| `gold-dark` | #9B7F3F | Text accents |
| `ink-black` | #0A0A0A | Primary dark |
| `pearl` | #F8F6F0 | Primary light bg |
| `pearl-warm` | #EDE7D9 | Secondary light bg |

**Fonts:**
- Display: `Italiana` (logo, hero headlines)
- Serif: `Cormorant Garamond` (descriptions, italic accents)
- Sans: `Inter` (UI, navigation)

---

## 🏗️ Build Status

| Batch | Status | Description |
|---|---|---|
| 1 | ✅ Done | Setup + design system + Layout + Homepage |
| 2 | ✅ Done | Catalog (`/koleksione`) + Category pages + Product detail |
| 3 | ✅ Done | Atelier + Services pages + Forms + Contact API + Email |
| 5 | ✅ Done | **Supabase schema + Admin panel + DB integration** |
| 4 | ⏳ Pending | Bilingual (SQ/EN) routing + SEO |
| 6 | ⏳ Pending | Deploy to Vercel + Domain |

### Batch 5 — Admin Panel & Database

**Public pages now read from Supabase** (not mock data anymore).

**New routes:**
- `/admin/login` — Email + password login
- `/admin` — Dashboard with stats and recent bookings
- `/admin/produkte` — Products list with filters, search, delete, toggle active
- `/admin/produkte/ri` — Create new product (with image upload)
- `/admin/produkte/[id]` — Edit existing product
- `/admin/kategorite` — Categories management (inline edit, add, delete)
- `/admin/mesazhet` — Bookings inbox with status workflow + admin notes

**Features:**
- Supabase Auth for login (middleware-protected routes)
- Image upload to Supabase Storage (`product-images` bucket)
- Multiple images per product with reorder & delete
- Auto-generated slugs from product name
- Status workflow for bookings: new → contacted → scheduled → completed/cancelled
- WhatsApp/email quick reply buttons in inbox
- Private admin notes on each booking

**Database:**
- All public pages auto-revalidate every 60 seconds
- Tables: `categories`, `products`, `bookings`
- Storage: `product-images` (10MB max, JPEG/PNG/WEBP)
- RLS policies: public read for active items, authenticated write

### New routes & features in Batch 3

- `/atelier` — Full custom design page with 6-step process, FAQ, dedicated form
- `/sherbime` — Detailed services page (6 services) with descriptions, includes lists
- `/#location` — Location section on homepage with Google Maps
- `/#contact` — Contact section on homepage with full validated form
- `POST /api/contact` — Backend route with rate limiting, validation, email sending, Supabase persistence
- Email templates (admin notification + client confirmation, branded, premium)

### How forms work

1. User fills form on homepage, atelier, or services page
2. Validated client-side (react-hook-form + zod)
3. Posts to `/api/contact`
4. Server validates, checks rate limit (3/min/IP), checks honeypot
5. Saves to Supabase `bookings` table (best-effort)
6. Sends 2 emails via Resend:
   - **Admin email** to `gamingrremi@gmail.com` (you) with full details + WhatsApp reply button
   - **Client email** to user with branded confirmation
7. Returns success → form shows success state with toast notification

### Required env vars (in `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=...           # already set
NEXT_PUBLIC_SUPABASE_ANON_KEY=...      # already set
SUPABASE_SERVICE_ROLE_KEY=...          # YOU need to add (after reset)
RESEND_API_KEY=...                     # YOU need to add from resend.com
CONTACT_EMAIL_TO=gamingrremi@gmail.com # already set
CONTACT_EMAIL_FROM=onboarding@resend.dev # default; change after domain verify
```

**Note:** Supabase `bookings` table is created in Batch 5. Until then, form submissions just won't be saved to DB but emails work fine.

---

## 🚀 Deploy to Vercel (Production)

(Will be detailed in Batch 6)

Quick preview:

```bash
npm install -g vercel
vercel
```

Vercel will guide you through. Add environment variables in the Vercel dashboard.

---

## 📚 Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Lint code
npm run type-check   # TypeScript check
```

---

## 🆘 Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
rm -rf node_modules .next
npm install
```

**Tailwind classes not applying:**
- Restart dev server (`Ctrl+C`, then `npm run dev`)
- Check class is not dynamic (Tailwind only sees full strings)

---

**Created by Develop24h** · For Argjendari Novara
