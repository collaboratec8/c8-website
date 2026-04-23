# C8 Website

The production website for C8 — finance that thinks forward, for SMEs that have outgrown their accountant.

Built with [Astro](https://astro.build/), hosted on [Netlify](https://www.netlify.com/), content managed via [Decap CMS](https://decapcms.org/).

## What's inside

```
site/
├── public/
│   ├── admin/               # Decap CMS admin UI (login at /admin)
│   ├── robots.txt           # Search + AI crawler directives
│   ├── llms.txt             # LLM-friendly site summary (AEO)
│   ├── favicon.svg          # Site icon
│   └── og-default.svg       # Default social share image
├── src/
│   ├── components/          # Reusable UI pieces (Nav, Footer, SEO, Schema)
│   ├── content/
│   │   └── blog/            # Markdown blog posts
│   ├── layouts/             # Base + blog page shells
│   ├── pages/               # Routes
│   │   ├── index.astro      # Home
│   │   ├── blog/            # /blog/* routes
│   │   ├── 404.astro        # Not found
│   │   ├── thanks.astro     # After-form-submit page
│   │   └── rss.xml.js       # RSS feed
│   └── styles/global.css    # Design tokens + shared utilities
├── astro.config.mjs         # Astro + sitemap config
├── netlify.toml             # Netlify build + header config
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript paths
```

## First-time setup

Once this repo is pushed to GitHub and Netlify is connected, everything after the first deploy is hands-off. But the first deploy has a few one-time steps.

### 1. Local development (optional, for testing before push)

Requires Node.js 20+ installed. From the `site/` folder:

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`.

### 2. Push to GitHub

Create a new GitHub repository (private is fine). Then, from the `site/` folder:

```bash
git init
git add .
git commit -m "Initial commit: C8 website"
git branch -M main
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```

### 3. Connect Netlify

1. In your Netlify business team, click **Add new site → Import an existing project**.
2. Choose **GitHub** and select the repo you just pushed.
3. Netlify auto-detects Astro. Build settings are already in `netlify.toml`. Just click deploy.
4. First deploy takes ~60 seconds.

### 4. Custom domain

1. In Netlify: **Domain management → Add a domain → `collaboratec8.com`**.
2. In GoDaddy: update nameservers to Netlify's (shown in the dashboard). Or keep GoDaddy as registrar and add Netlify's A/AAAA records. Netlify gives exact instructions.
3. Wait for DNS propagation (minutes to a few hours).
4. Netlify auto-provisions a Let's Encrypt SSL certificate.

### 5. Contact forms

Forms are already wired up with `data-netlify="true"`. Two forms exist:

- `contact` — the main "send a note" form
- `lead-magnet` — the email capture for the free template

Both will appear in **Netlify → Forms** after your first deploy. Set up email notifications there (Forms → Settings → Form notifications → Add email). Submissions go to your inbox.

### 6. Decap CMS (blog admin)

The admin panel is at `/admin` — but it needs **Netlify Identity** turned on first.

1. In Netlify: **Integrations → Identity → Enable Identity**
2. **Registration**: set to *Invite only* (so random people can't sign up)
3. **Services → Git Gateway → Enable**
4. Go back to **Identity** tab → **Invite user** → send yourself an invite
5. Click the invite link in your email, set a password
6. Visit `https://www.collaboratec8.com/admin` — log in with the password you just set
7. You can now create, edit, and publish blog posts from the visual editor

Every save is a git commit under the hood, so the site rebuilds and redeploys automatically.

### 7. Cal.com embed

The homepage embeds Cal.com for booking. To activate:

1. Sign up at [cal.com](https://cal.com) with your business email
2. Connect both Gmail and Outlook calendars (both work with the free plan)
3. Create an event type called "Intro call", 20 minutes, set your working hours
4. Your link will be `cal.com/<your-username>/intro-call`
5. In `src/pages/index.astro`, update the `CAL_COM_LINK` constant at the top of the frontmatter

### 8. Social / external links

Placeholder links exist for LinkedIn, X/Twitter. Update:

- `src/pages/index.astro` — social strip
- `src/components/Footer.astro` — footer "Connect" column

## Adding a blog post

**Via Decap CMS** (recommended for non-technical edits):
1. Go to `https://www.collaboratec8.com/admin`, log in
2. Click "New post"
3. Fill in title, description, category, body
4. Click "Publish" — site rebuilds and goes live in ~60 seconds

**Via git** (for Claude or a developer):
1. Create a new file at `src/content/blog/<slug>.md` with the frontmatter fields required by the schema (see existing posts)
2. Commit and push — Netlify auto-deploys

## SEO + AI search optimisation built in

- **Sitemap** auto-generated at `/sitemap-index.xml`
- **robots.txt** allows all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended etc)
- **llms.txt** at `/llms.txt` provides LLM-friendly site summary (AEO standard)
- **JSON-LD structured data** on every page — Organization, Person, Service, FAQ, Article, WebSite schemas. Biggest single lever for ChatGPT / Claude / Perplexity / Google AI Overview visibility.
- **Open Graph + Twitter meta tags** on every page with per-page images
- **Canonical URLs** set on every page
- **Core Web Vitals** optimised: inline critical CSS, preloaded fonts, static HTML output, compressed response
- **Accessibility**: semantic HTML, skip-link, aria-labels, keyboard navigation, reduced-motion support
- **Per-post Article schema** with reading time, author, category, dates
- **RSS feed** at `/rss.xml` for syndication

## Design tokens

Change colour, type, spacing in `src/styles/global.css` — everything pulls from CSS custom properties (`:root`).

Current palette:
- Ink: `#0A0A0A`
- Canvas: `#FFFFFF`
- Indigo (primary accent): `#5E5BF0`
- Lime (secondary accent): `#D9FF40`
- Surface: `#F4F4F7`

Type:
- Display: Space Grotesk (Google Fonts)
- Body: Inter (Google Fonts)
- Mono: JetBrains Mono (Google Fonts)

## Troubleshooting

- **Build fails on Netlify with "command not found"** — check Node version is 20 in `netlify.toml`
- **Decap CMS login won't work** — confirm Identity AND Git Gateway are both enabled
- **Contact form submissions not arriving** — check spam folder, confirm email notifications are set in Netlify Forms settings
- **Sitemap empty** — the `site` URL in `astro.config.mjs` must be correct (`https://www.collaboratec8.com`)

## Handy commands

```bash
npm run dev      # Local dev server
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview the production build locally
```

---

Built for Ish Mukit / C8 — April 2026.
