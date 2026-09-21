# Visit San Carlos

Digital platform for Visit San Carlos — connects visitors, residents, and local
businesses in San Carlos and Guaymas, Sonora, México.

This is a Next.js (App Router, TypeScript) implementation of the Home page
design exported from Claude Design. See `chats/` and `project/` for the
original design bundle and conversation history that this build is based on.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` — routes (currently just the Home page at `/`)
- `components/` — shared UI (header, footer, hero, carousels, sections)
- `lib/` — nav config and placeholder content data
- `public/uploads/` — brand assets (logo, pin icon)
- `project/`, `chats/` — original Claude Design export (reference only)

## Notes

- Photo placeholders (`ImagePlaceholder`) stand in for real business/event/blog
  photography that hasn't been supplied yet.
- Only the Home page is implemented so far. The full site is planned as
  multi-page with business/admin dashboards — see `chats/chat1.md` and
  `chats/chat2.md` for the full spec as it evolved.
