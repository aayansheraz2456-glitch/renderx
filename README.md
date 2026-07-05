# RenderX — Premium Creative Agency

A landing site for a creative/design agency concept: hero page with background video, a services showcase, per-service detail pages, and a contact page. Built with React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion (via `motion/react`) + React Router.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for hosting

```bash
npm run build
```

Upload the contents of `dist/` to any static host (Vercel, Netlify, GitHub Pages, or shared hosting).

## Structure

```
src/
├── App.tsx                       # routes + page transitions
├── components/
│   ├── Navbar.tsx
│   ├── BackgroundVideo.tsx
│   ├── HeroPage.tsx
│   ├── ServicesPage.tsx
│   ├── ServiceSelector.tsx
│   ├── SpecificServicePage.tsx
│   ├── ContactPage.tsx
│   ├── ProjectCard.tsx
│   └── Logo.tsx
└── hooks/useTypewriter.ts
```

## Customising

- **Services & copy** → the components under `src/components/`.
- **Brand colors / theme** → Tailwind config and CSS variables in `src/index.css`.
