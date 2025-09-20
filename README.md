Production-ready personal portfolio for Prabhakar Elavala built with Next.js 14, TypeScript, Tailwind, shadcn/ui, Framer Motion, Three.js, and MDX.

### Quickstart

```bash
npm install
npm run dev
```

### Environment variables (.env.local)

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
RESEND_API_KEY=
NEXT_PUBLIC_VERCEL_ANALYTICS=1
```

### Deploy to Vercel

1. Push to a Git repo
2. Import in Vercel, add env vars above
3. Deploy

### Optional: Render FastAPI microservice

- See `render/` folder for a minimal FastAPI agent proxy and Dockerfile (optional)

### Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – run ESLint
- `npm run test` – run Playwright smoke tests

### Features

- App Router, MDX blog, code highlighting
- shadcn/ui components and dark mode toggle
- Three.js lightweight hero background (degrades on mobile)
- Contact form with Resend or mock
- AI assistant chat widget hitting `/api/assistant`
- Sitemap and robots, next-seo defaults
- Vercel Analytics and PostHog (env-gated)
