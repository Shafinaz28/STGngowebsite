# Sri Takshashila Gurukul – HTML + Tailwind Version

A static, non-React version of the Sri Takshashila Gurukul website built with **HTML5** and **Tailwind CSS** (via CDN).

## What’s included

- **index.html** – Home (hero carousel, about, vision, mission, programs, YouTube feed, testimonials, statistics, contact)
- **vision.html** – Vision & Mission with tabs
- **donate.html** – Get involved / donation options
- **participate.html** – Workshops for school, college, homemakers, senior citizens
- **gallery.html** – Gallery placeholder (can be wired to your API or static images)
- **contact-us.html** – Contact form and details
- **team.html** – Team members (founder, leadership, staff, advisory)
- **collaborations.html** – CSR / partner logos
- **coming-soon.html** – Placeholder for unfinished pages
- **subscribe.html** – Newsletter signup
- **login.html** – Login placeholder (for dashboard)

## How to run

1. **Assets**  
   The `Assests` folder (logo, images, carousel, team photos, partner logos, etc.) is already copied into `html-version/Assests` from `public/Assests`. If you replace or add files in `public/Assests`, copy them again:

   ```bash
   cp -r public/Assests/* html-version/Assests/
   ```

2. **Open in browser**  
   - Either open `html-version/index.html` directly in the browser (some assets may fail if paths differ), or  
   - Serve the folder with a local server, for example:

   ```bash
   cd html-version
   npx serve .
   ```

   Then open `http://localhost:3000` (or the URL shown).

## Tech stack

- **HTML5** – Semantic markup, no React
- **Tailwind CSS** – Via CDN; no build step
- **Vanilla JS** – Carousel, mobile menu, dropdowns, stats counter
- **Google Fonts** – Outfit

## Customization

- **Tailwind:** Config is in a `<script>` in each page; you can switch to a built Tailwind setup later if needed.
- **API / forms:** Contact form, subscribe, and login are front‑only. Hook them to your backend (e.g. `api.sritakshashilagurukul.com`) as needed.
- **Gallery:** Replace the placeholder in `gallery.html` with your API or a list of image paths.

## Notes

- All links use `.html` (e.g. `vision.html`, `donate.html`) for static hosting.
- No Bootstrap or React; one dependency is the Tailwind CDN (and optional local server for testing).
