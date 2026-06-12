# Mona Abishek A — Portfolio

A single-scroll personal site that moves from warm cream *day* into ink *night*
as you read. Built to feel like a specific person, not a résumé.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion**. Type set in **Fraunces** (display) and **Geist** / **Geist Mono**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Editing content — one file

**Everything visible on the site is driven by `src/data/content.json`.**
Change the JSON, save, and the whole page updates — no component edits needed.
The shape is fully typed in `src/types/content.ts`, so your editor will flag a
wrong key or missing field.

A few notes:

- **Projects** — set `"hero": true` for the lead project (larger treatment). Add
  a `links.live` / `links.repo` URL and it renders a link; leave it `""` and it
  shows `Private`. An empty `stack: []` hides the tech chips.
- **Socials** (contact) — any entry with an empty `url` is skipped. LinkedIn is
  left blank; drop your URL in to light it up.
- **Now** — the "living" section. Edit the `items` and the `updated` date.
- **Easter egg** copy lives under `easterEgg` (The Pledge / The Turn / The Prestige).

## The hidden details

The whole point of the site is rewarding people who look closely. What's hidden:

**The Prestige sequence** (a Pledge / Turn / Prestige reveal) opens via any of:
- The pulsing **full stop** after *"the same answer."* (hero) or *"I came back to."* (closing).
- The **Konami code**: `up up down down left right left right b a`.
- Typing **`prestige`** or **`watch`** anywhere.
- A styled note in the **browser console**.

**Keyword whispers** — type a word Mona cares about and a small line surfaces,
then fades. Editable in `content.json → whispers.keywords`. Defaults include
`911`, `porsche`, `f1`, `nolan`, `interstellar`, `guitar`, `football`, `anthropic`.

**Quieter touches**
- The whole-page **day→night** scroll (rewards finishing the page).
- Leave the tab and the **title invites you back** — a nod to "I came back to."
  (editable: `content.json → tabTitle.away`).
- The **live Chennai clock** in the hero.
- The **custom cursor** grows and whispers "look closer" over hidden elements.

## How it's built

- `src/components/DayNight.tsx` — writes live `--bg` / `--fg` CSS variables onto
  the document root from scroll progress; the cream->ink arc and text colors flip
  in lockstep so contrast is always preserved. The clay accent stays constant.
- `src/components/Reveal.tsx` — controlled, docking-smooth scroll reveals that
  fall back to plain visible content under `prefers-reduced-motion`.
- `src/components/WatchingClosely.tsx` — the Pledge/Turn/Prestige easter egg.
- `src/components/Whispers.tsx` — keyword whispers + the "came back" tab title.
- `src/components/Cursor.tsx` — the custom difference-blend cursor (fine pointers only).
- Each section is a small component reading from `content.json`.

Static-rendered, mobile-first, and dependency-light by design.
