# Crettyard.ie Community Portal

## Overview
A community portal website for the Crettyard area in County Laois, Ireland. It showcases local history, businesses, community events, and updates with a modern, responsive design.

## Technologies
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0 (via @tailwindcss/vite)
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Build Tool**: Vite 6
- **AI Integration**: @google/genai (Google Gemini)
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
Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist`

## Environment Variables
- `GEMINI_API_KEY` — Required for Google Gemini AI features (optional for core UI)
