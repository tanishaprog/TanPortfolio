# Tanisha's macOS Portfolio — PRD

## Original problem statement
Build an extremely realistic, pixel-perfect macOS-inspired desktop experience where
Tanisha's portfolio is hidden. It should feel like someone casually opened her
MacBook while she stepped away for coffee — cozy, calm, playful, polished.
Reference: https://inikaj.com

## User personas
- **Recruiters / clients** exploring Tanisha's creative work through a delightful
  metaphor rather than a traditional portfolio site.
- **Casual visitors** who stumble in and stay because the experience feels alive.
- **Tanisha herself** — needs every section to be independently editable via
  JSON/Markdown data files.

## Core requirements (static)
- macOS shell: desktop wallpaper, menu bar, dock (with magnification), Safari,
  Notes, Finder windows, widgets, folders — all already "open".
- Menu bar clock always in Indian Standard Time, regardless of visitor location.
- Battery always ~25%.
- Wallpaper is a swappable placeholder (drop `wallpaper.jpg` into `/public`).
- Folders: About Me, Resume, Contact, Cat Pics, Do Not Open, Trash.
- Resume: 4 placeholder files, only `Final Resume.pdf` opens.
- Safari tabs: Influencer Marketing, Ad Films, Social Media, Digital Campaigns,
  Offline Campaigns, Newspaper Campaigns — each with pre-populated project list.
- Only "2 A.M. Ideas" note is interactive; empty on purpose until Tanisha fills it.
- Dock: Finder, Safari, Notes, Photos, Spotify, ChatGPT, Calendar, Mail, Messages,
  Substack, Trash — with native macOS magnification curve.
- Mobile: opens directly into Safari with the portfolio; dismissible top banner
  reads "Better viewed on a laptop or desktop." Full nav works on mobile.
- All content lives in structured JS data files under `/src/data/` so replacement
  is a one-line edit.

## Architecture
- Frontend-only React app (CRA + craco). No backend for now (user chose static).
- Framer Motion for window entrance and dock magnification.
- Tailwind + custom CSS for macOS-like glass, shadows, gradients.
- Fonts: **Geist** (UI), **Instrument Serif** (personal accents), **Caveat**
  (sticky note handwriting), **JetBrains Mono** (mono details).
- Component structure:
  - `Desktop.jsx` (window manager)
  - `MenuBar.jsx`, `Dock.jsx`, `Wallpaper.jsx`
  - `Window.jsx` (base draggable window with traffic lights)
  - `SafariWindow.jsx`, `NotesWindow.jsx`, `FinderWindow.jsx`
  - `Widgets.jsx` (Sticky, Pinterest, Substack)
  - `ProjectModal.jsx`, `FilePreview.jsx`
  - `MobileSafari.jsx`
- Data files: `data/projects.js`, `data/folders.js`, `data/widgets.js`.

## What's been implemented (2026-02)
- [x] Milestone 1 — macOS shell
  - Warm peach → lavender placeholder wallpaper with noise/grain
  - Menu bar (Apple, Finder, File, Edit, View, Go, Window, Help + WiFi,
    Bluetooth, Battery 25%, Search, Control Center, IST clock)
  - Dock with native macOS magnification + running-app dots + tooltips
  - Draggable windows with real traffic lights (close / minimise / disabled zoom)
  - Safari window already open, tabs with icons, URL bar, Google-style results
  - Notes window already open, sidebar + editor, "2 A.M. Ideas" interactive
  - Finder windows for About Me, Resume, Contact, Cat Pics, Do Not Open, Trash
  - Widgets: sticky note (Caveat font), Pinterest board, Substack card
  - Project detail modal (placeholder case study)
  - File preview modal (Final Resume.pdf placeholder)
  - Mobile: Safari-only view with dismissible info banner + tab switching +
    per-project detail sheet

## Prioritized backlog
- [ ] **Milestone 2** — Populate content (section-by-section, waiting on user):
  - Upload wallpaper.jpg to /public
  - Sticky note content
  - Pinterest board pins
  - Substack latest post
  - About Me: biography, current interests, favourite things, reading, watching,
    listening, current projects
  - Resume: Final Resume.pdf upload
  - Contact: email, LinkedIn, Instagram, website, phone (optional)
  - Cat Pics: images
- [ ] **Milestone 3** — Real case studies for every Safari project
- [ ] **Milestone 4** — Polish
  - Window minimise → dock genie animation
  - Keyboard shortcuts (⌘Q close, ⌘W close tab, ⌘Tab switch app)
  - Right-click context menu
  - Spotlight search (⌘Space)
  - Menu bar dropdowns
  - Sound on dock click (optional)

## Update (2026-02) — Milestone 1.2
- Sticky Note widget is now an interactive checklist. Every item toggles on click, gets a Caveat-strikethrough when done. "Remember electrolytes + creatine" renders bold + underlined + slightly larger. Content lives in `STICKY_CHECKLIST` in `data/aboutMe.js`
- About Me folder no longer opens a Finder window. Double-click scatters 5 personal files onto the desktop (`AboutScatter.jsx`), and auto-minimises Safari + Notes so the scatter is visible:
  - portrait.jpg → opens in Preview.app-style window (`ImagePreviewWindow.jsx`)
  - About Me.txt / Reading List.txt / Movies & Shows.txt → open in TextEdit-style window (`TextEditWindow.jsx`) with Helvetica body, native macOS checkboxes with strikethrough for Reading List
  - Currently Listening → opens Spotify player (`SpotifyWindow.jsx`) with podcast + song embeds and an "Open in Spotify" fallback link
- Contact folder removed; replaced by a "Contact Me" business-card file on the desktop (`ContactCardIcon.jsx` + `BusinessCardWindow.jsx`). Click opens a Preview-style card with portrait, roles, tagline, tappable Email (mailto:), Instagram + LinkedIn (new tab), and availability chips
- All content lives in `data/aboutMe.js` — one file to edit everything (bio, reading list, movies, sticky, business card, portraits, spotify)
