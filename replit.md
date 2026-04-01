# Crettyard.ie Community Portal

## Overview
A community portal website for the Crettyard area in County Laois, Ireland. It showcases local history, businesses, community events, and updates with a modern, responsive design.

## Technologies
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0 (via @tailwindcss/vite)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite 6
- **Package Manager**: npm

## Project Structure
```
/
├── src/
│   ├── context/AuthContext.tsx    # Auth state (JWT in localStorage)
│   ├── components/
│   │   ├── AuthModal.tsx          # Register / Login / ForgotPassword / Reset modals
│   │   ├── NewPostModal.tsx       # Create announcement modal (multipart upload)
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── BusinessesPage.tsx
│   │   ├── CommunityPage.tsx
│   │   └── NoticeboardPage.tsx   # /noticeboard — public read, auth to post
│   ├── main.tsx
│   ├── App.tsx
│   └── index.css
├── server/                        # Express dev API server (port 8788)
│   ├── index.ts
│   ├── db.ts                      # better-sqlite3 (mirrors D1 schema)
│   ├── lib/auth.ts                # PBKDF2 password hash + jose JWT
│   ├── lib/email.ts               # Resend email helper
│   └── routes/
│       ├── auth.ts                # register, verify, login, forgot, reset
│       └── posts.ts               # list, get, create (multipart), delete
├── functions/                     # Cloudflare Pages Functions (production)
│   ├── _lib/
│   │   ├── types.ts               # Env interface (D1/R2/Resend/JWT bindings)
│   │   ├── auth.ts                # Same helpers but CF Workers crypto
│   │   └── email.ts               # Resend via fetch
│   └── api/
│       ├── auth/{register,verify,login,forgot-password,reset-password}.ts
│       ├── posts/{index,\[id\]}.ts
│       └── uploads/\[key\].ts     # R2 proxy (GET)
├── schema.sql                     # D1/SQLite schema (users, email_tokens, posts, attachments)
├── wrangler.toml                  # D1 + R2 bindings for CF Pages
├── uploads/                       # Local file storage for dev (gitignored)
├── dev.db                         # SQLite dev database (gitignored)
├── index.html
├── vite.config.ts                 # Proxy /api/* → localhost:8788
├── package.json
└── tsconfig.json
```

## Development
- Run: `npm run dev` — starts **both** Vite (port 5000) **and** Express API server (port 8788) via concurrently
- Build: `npm run build` — outputs to `dist/`
- Vite proxies all `/api/*` requests to `localhost:8788`

## Notice Board Feature
- **Route**: `/noticeboard`
- **Auth flow**: register (username + email + password) → email verification via Resend → login → JWT in localStorage
- **Password hashing**: PBKDF2 via Web Crypto API (compatible with CF Workers). bcrypt is intentionally NOT used — it requires native Node.js bindings that are incompatible with the CF Workers V8 isolate runtime.
- **JWT**: signed with HS256 using `jose` (compatible with CF Workers)
- **File attachments**: up to 5 MB, stored locally as `uploads/{postId}_{filename}` (dev) or in R2 with key `{postId}_{sanitizedFilename}` (production). Flat key format (no slashes) avoids CF Pages catch-all route issues.
- **Attachment URLs**: `/api/uploads/:key` — Express static (dev) or R2 proxy CF Function (production)
- **Production CF env vars required**: `JWT_SECRET`, `SITE_URL`, `RESEND_API_KEY`, D1 binding `DB`, R2 binding `R2`

## Deployment
- Hosted on **Cloudflare Pages + Workers** via GitHub sync
- Build command: `npm run build`
- Public directory: `dist`

## Third-Party Services & Configuration

### Email — Resend.com
- **From**: `noreply@digital.crettyard.ie`
- **Reply-To**: `info@crettyard.ie`
- All forms must send emails via the Resend API
- Secret: `RESEND_API_KEY`
- Env vars: `RESEND_FROM_EMAIL`, `RESEND_REPLY_TO`

### Database — Cloudflare D1 (SQLite)
- **Database name**: `crettyardie`
- **Database ID**: `6d498931-3903-4685-bfc7-c79504161f5f`
- **Binding**: `DB`
- Env vars: `D1_DATABASE_NAME`, `D1_DATABASE_ID`

### Object Storage — Cloudflare R2
- **Bucket**: `crettyardie`
- **Account ID**: `08696d58f3debf289379db745274f8f9`
- **S3 Endpoint**: `https://08696d58f3debf289379db745274f8f9.r2.cloudflarestorage.com/crettyardie`
- Secrets: `R2_ACCESS_KEY`, `R2_SECRET_KEY`
- Env vars: `R2_ACCOUNT_ID`, `R2_BUCKET`, `R2_S3_ENDPOINT`

## Development Guidelines
- All form submissions → email via Resend API
- All persistent data → Cloudflare D1 SQLite
- All file/media uploads → Cloudflare R2
- Keep the existing design language (dark green, clean typography, motion animations)
