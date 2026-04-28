# NOVARA — Udhëzues Deploy në Vercel

Ky dokument të çon hap pas hapi nga kodi lokal te site-i online.

**Kohë totale:** ~20 minuta

---

## Çfarë të nevojitet (krijoji para se të nisësh)

- ✅ Llogari **GitHub** — falas → [github.com/signup](https://github.com/signup)
- ✅ Llogari **Vercel** — falas → [vercel.com/signup](https://vercel.com/signup) (sign up me GitHub)
- ✅ **Git** i instaluar në kompjuter — [git-scm.com/download/win](https://git-scm.com/download/win)

---

## HAPI 1 — Instalim Git (nëse s'e ke)

1. Shko në **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. Shkarkohet automatikisht — instalo me të gjitha default-et
3. Pas instalimit, **rinis kompjuterin**

Verifiko: hap **cmd** dhe shkruaj `git --version`. Duhet të dalë diçka si `git version 2.x.x`.

---

## HAPI 2 — Krijo repository në GitHub

1. Shko në **[github.com](https://github.com)** dhe hyr
2. Lart djathtas: kliko **"+"** → **"New repository"**
3. Plotëso:
   - **Repository name:** `argjendari-novara`
   - **Description:** `Website per Argjendari Novara`
   - **Privacy:** **Private** (askush nuk duhet ta shohë kodin)
   - **MOS** kliko "Add README" / "Add .gitignore" / "Choose a license"
4. Kliko **"Create repository"**
5. Pas krijimit, do të shohësh një faqe me kod të ngjyrosur — **mbaje këtë faqe hapur**, do të na duhet URL-ja e shfaqur (diçka si `https://github.com/USERNAME/argjendari-novara.git`)

---

## HAPI 3 — Push i kodit në GitHub

Hap terminal **cmd** brenda folderit `novara-frontend` (njësoj si më parë: shiriti i adresës → `cmd` → Enter).

Ekzekuto këto komanda **NJË NGA NJË**, duke ndryshuar **emrin tënd dhe email-in** te dy komandat e para:

```
git config --global user.name "Emri Yt"
git config --global user.email "gamingrremi@gmail.com"
```

Pastaj:

```
git init
git add .
git commit -m "Initial commit - Novara website"
git branch -M main
```

Pastaj **kopjo URL-në nga GitHub** (që e mbajte hapur më lart) dhe ekzekuto (zëvendëso URL-në):

```
git remote add origin https://github.com/USERNAME/argjendari-novara.git
git push -u origin main
```

GitHub do të të kërkojë **autentikim**:
- Do të hapet automatikisht një dritare browser
- Kliko **"Authorize Git Credential Manager"** ose log in me GitHub
- Pas pak sekondash, kodi është në GitHub

✅ **Verifiko:** Rifresko faqen GitHub të repository-t — duhet të shohësh të gjithë fajllat aty.

---

## HAPI 4 — Deploy në Vercel

1. Shko në **[vercel.com/new](https://vercel.com/new)**
2. Nëse s'ke hyrë akoma: kliko **"Continue with GitHub"** → autorizo
3. Vercel do të kërkojë lejen për të lexuar repository-t e tua → kliko **"Install"**
4. Në listën e repository-ve, gjej **`argjendari-novara`** → kliko **"Import"**
5. Në faqen **"Configure Project"**:
   - **Project Name:** `argjendari-novara` (ose çfarëdo që dëshiron)
   - **Framework Preset:** ✅ Next.js (auto-detected)
   - **Root Directory:** `./` (nuk e prek)
   - **Build Command:** lëre default (`next build`)
   - **Install Command:** lëre default (`npm install`)

### Environment Variables (KRITIKE!)

Kliko për të zgjeruar **"Environment Variables"** dhe shto **5 variabla**:

Për secilën, kliko **"Add Another"** dhe vendos:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tkonfvqmvgwvsybdmbfz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (anon key i Supabase që ke në `.env.local`) |
| `SUPABASE_SERVICE_ROLE_KEY` | (service role key i ri pas reset-it) |
| `RESEND_API_KEY` | (key-i nga resend.com) |
| `CONTACT_EMAIL_TO` | `gamingrremi@gmail.com` |
| `CONTACT_EMAIL_FROM` | `onboarding@resend.dev` |

**KUJDES:** Mos kopjo me hapësira shtesë para ose pas. Çdo gabim këtu = build i dështuar.

6. Kliko **"Deploy"**
7. Prit 2-3 minuta — Vercel do të build-ojë dhe deploy-ojë projektin

✅ **Pas mbarimit:** Do të shohësh fishekzjarrë animuar dhe URL-në e site-it (p.sh. `argjendari-novara-xyz.vercel.app`)

---

## HAPI 5 — Testim final

Hap URL-në që të dha Vercel.

### Çfarë të testosh:

1. ✅ Homepage hapet pa errors
2. ✅ Klikoji "Koleksione" → produktet shfaqen
3. ✅ Kliko ndonjë produkt → faqja e produktit hapet
4. ✅ Scroll deri në fund → mbush formën → dërgo
5. ✅ Kontrollo email-in tënd Gmail → duhet të kesh email-in e ri
6. ✅ Hap `URL-JA-JOTE/admin` → duhet të të çojë në login
7. ✅ Login me kredencialet → duhet të hysh në admin panel

---

## Rifresko / Përditësim i kodit

Sa herë që ndryshon diçka në kod (ne, bashkë në batch-et e ardhshme), për të publikuar ndryshimet:

```
git add .
git commit -m "Përshkrim i ndryshimeve"
git push
```

**Vercel automatikisht detect-on ndryshimin dhe re-deploys në 1-2 minuta.**

---

## Konfigurim domain-i të vërtetë (opsional, kur ta blesh)

Kur të blesh `argjendarinovara.com`:

1. Vercel Dashboard → projekti yt → **Settings** → **Domains**
2. Shto domain-in
3. Vercel të jep 2 DNS records që duhet t'i fusësh te ku ke blerë domain-in (Namecheap/Hostinger)
4. Pas 5-30 minutash, domain-i është aktiv me HTTPS automatik (falas)

---

## Probleme të zakonshme

**"Build failed":**
- Hap log-un e build-it në Vercel për të parë gabimin
- Më e zakonshme: env variable mungon ose ka hapësira shtesë
- Zgjidhje: Settings → Environment Variables → kontrollo dhe re-deploy

**"500 Internal Server Error" pas deploy:**
- Hap **Vercel → projekti → Deployments → Latest → Functions** për të parë error log
- Më e zakonshme: `SUPABASE_SERVICE_ROLE_KEY` është gabim
- Zgjidhje: rivendos key-in dhe re-deploy

**"Site is up but products don't show":**
- Hap admin panel në `URL/admin` → produktet janë aktive?
- Sigurohu që toggle "Aktiv" është i ndezur për produktet që dëshiron të shohësh

---

## Pas deploy-it, ti mund të:

- ✅ Të ndash URL-në me kushdo
- ✅ Të menaxhosh produkte nga URL-ja-jote/admin (kudo, nga çdo pajisje)
- ✅ Të marrësh mesazhe nga klientët (në email + admin panel)
- ✅ Klientët mund të prenotojnë takime, pyetin për produkte, etj.

**Site-i është LIVE.** 🎉
