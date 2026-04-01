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
│   ├── main.tsx        # App entry point
│   ├── App.tsx         # Main component with all UI sections
│   └── index.css       # Global styles + Tailwind directives
├── index.html          # HTML shell
├── vite.config.ts      # Vite config (port 5000, allowedHosts: true)
├── package.json
└── tsconfig.json
```

## Development
- Run: `npm run dev` — starts Vite dev server on port 5000
- Build: `npm run build` — outputs to `dist/`

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
