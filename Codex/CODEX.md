# Matrix Portfolio — Application Notes

## Location and purpose

- **Project source:** `/Users/mustafajaved/Desktop/portfolio`
- **App type:** single-page portfolio for a freelance full-stack developer.
- **Current hosted preview:** https://matrix-portfolio-0714.v-olhabondar95.chatgpt.site
- **Privacy status:** the preview uses a placeholder identity and has no public email, phone number, location, résumé, personal photo, employment history, or live social-profile URL.

The portfolio is intentionally a first build. It uses polished concept content so the visual and technical direction can be refined before real personal and project details are added.

## Product and visual direction

The page is a dark, typography-led editorial experience with an atmospheric Matrix-rain background.

- Base color: `#141414`
- Accent colors: blue `#5dacdf` and purple `#a020f0`
- Type: Geist for display text and Geist Mono for labels and technical details
- Layout: oversized type, full-width project rows, grid columns, and divider rules
- Explicitly avoided: cards, floating panels, rounded content containers, heavy shadows, generic dashboard chrome, and stock imagery

The page contains these sections:

1. Fixed minimal navigation and hero
2. Three selected-work concept rows: Relay, Lumen, Atlas
3. Capabilities: full-stack delivery, frontend systems, backend & integrations
4. Professional manifesto
5. Four-step process: Align, Architect, Build, Refine
6. Contact call-to-action and minimal footer

## Technology

The app uses Next.js-compatible App Router conventions through vinext, built for Cloudflare-compatible deployment.

- Next.js 16, React 19, TypeScript
- vinext and Vite for local development and production builds
- Plain global CSS for all visual styling; no UI, card, or animation library
- Optional Drizzle/D1 starter infrastructure remains unused by this portfolio

Requires Node.js `22.13.0` or later.

## Important files

| File | Responsibility |
| --- | --- |
| `app/page.tsx` | Single-page structure, semantic sections, navigation, and disabled/enabled LinkedIn CTA behavior. |
| `app/globals.css` | Entire visual system, responsive grids, section dividers, accessibility focus states, and reduced-motion styles. |
| `components/MatrixRain.tsx` | Client-only canvas animation adapted from the supplied Matrix code. |
| `lib/portfolio-content.ts` | One typed source of truth for all editable portfolio text, projects, identity, and contact URL. |
| `app/layout.tsx` | Metadata, dark viewport settings, and font loading. |
| `tests/rendered-html.test.mjs` | Rendered-page and privacy/starter-removal regression tests. |
| `.openai/hosting.json` | Links this local source to its Sites deployment project. Do not remove its `project_id`. |

## Updating content

Edit only `lib/portfolio-content.ts` for routine content updates.

### Identity

Change `identity.firstName` from `"NAME"` to the desired public first name or privacy-safe display name. Do not add a surname unless that is an intentional public-profile decision.

### LinkedIn contact

Set `contact.url` to the complete LinkedIn URL:

```ts
contact: {
  label: "Connect on LinkedIn",
  url: "https://www.linkedin.com/in/your-handle/",
},
```

Leaving `url: null` deliberately renders the CTA as disabled. This prevents a broken link and keeps the profile private until it is ready.

### Projects

Replace the three concept entries in `projects` with real work. Each entry supports:

```ts
{
  name: "Project name",
  description: "A concise explanation of the product and your contribution.",
  stack: ["Technology", "Technology", "Technology"],
}
```

The current page intentionally does not invent client names, impact figures, or testimonials. Add only claims you can stand behind.

### Copy and services

The hero, capabilities, manifesto, process, and availability label are also in this configuration. Editing copy there will not require a layout change.

## Matrix background behavior

`MatrixRain.tsx` preserves the original character-rain feel while making it safe for a production page:

- 70 ms frame delay, 16 px monospace characters, blue-dominant color mix with occasional purple characters
- Canvas sits behind content and cannot intercept clicks or keyboard input
- High-DPI canvas scaling is capped at 2× for performance
- Columns are recalculated after browser resizing
- Animation pauses in a hidden browser tab
- `prefers-reduced-motion` disables continuous animation and leaves the readable dark background intact
- Listeners and animation frames are cleaned up when the component unmounts

## Local development

From the project directory:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. Useful additional commands:

```bash
npm run build    # production build
npm run lint     # ESLint
npm test         # production build plus rendered-page regression tests
```

The project is intentionally copied without `node_modules`, build artifacts, and caches to save disk space. `npm install` restores the required packages.

## Quality and accessibility

The first build has passed production build, TypeScript, lint, and rendered-page tests. It includes:

- Semantic headings and landmark sections
- A skip-to-content link
- Visible keyboard focus states
- Reduced-motion support
- Decorative canvas marked hidden from assistive technology
- Responsive layouts for mobile, tablet, and desktop
- No horizontal overflow in the responsive CSS design

## Deployment notes

The current deployment is an owner-only preview. It is safe to share only when you intentionally change access settings and replace the placeholder content.

Before promoting it as a real public portfolio:

1. Set the display name and LinkedIn URL.
2. Replace concept projects with real work and accurate descriptions.
3. Update page title and metadata in `app/layout.tsx` with the chosen public identity.
4. Run `npm test` after edits.
5. Publish a new version from the updated project source.

No database, authentication flow, contact form backend, analytics, or custom domain has been configured. Those can be added later only if needed.
