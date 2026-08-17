# Codex Notes

This repository is the source for Xinglang Zhang's personal academic website at `https://delicatenorman.github.io/`.

The site is intentionally simple: a static `index.html`, one `style.css`, a small `script.js` for section fade-in animation, and assets under `assets/`. The goal is to keep the page readable as an academic homepage while adding a few personal visual details.

## Project Structure

- `index.html`: all page content, SEO metadata, Person JSON-LD, and section ordering.
- `style.css`: typography, layout, publication cards, News scroll, Hachiware visual accents, and responsive rules.
- `script.js`: intersection-observer animation for sections.
- `sitemap.xml`: sitemap submitted to Google Search Console.
- `google*.html`: Google Search Console ownership verification file (do not remove).
- `CV/ml.tex`: editable LaTeX source for the CV; build artifacts in `CV/` are ignored.
- `CV/ml.pdf`: locally compiled CV output.
- `assets/CV_Xinglang_Zhang.pdf`: current CV PDF opened in the browser from the homepage.
- `assets/Figure2-*.png`, `assets/fig2_*.png`: publication figures shown in publication cards.
- `assets/Overview-Social-Intelligence-Modeling.png`: overview figure for the Social Intelligence Modeling survey.
- `assets/Overview-of-EarthVerse.png`: full overview figure for the EarthVerse benchmark.
- `assets/bilibili.png`, `assets/rednote.png`, `assets/photograph.png`: compact social and photography icons used in homepage cards.
- `assets/EA.png`, `assets/Class.png`, `assets/华中科技大学-logo-512px.png`: leadership icons used in the experience section.
- `assets/hachi-*.png`: Hachiware-style personal visual assets used in the current website.
- `assets/albums.png`, `assets/hachi.png`: older miscellaneous images retained in the asset library but not currently displayed.

## Current Content Model

The page currently contains these sections:

- Header: name, title, affiliation, contact links, and a small square Hachiware head (alt text set to the person's name for SEO).
- About: research profile written in third person, current advisers/supervisors, and a reading Hachiware sticker (decorative, alt empty).
- News: chronological updates newest first, displayed in a scrollable container (`.news-scroll`, ~5 items visible by default).
- Publications: six paper cards with title, authors, venue, summary, links, and figure. The two newest co-authored papers are appended after Xinglang's main first-/second-author works. Preceded by a brief "Selected publications by Xinglang Zhang." intro.
- Research Interests: stated as "Xinglang Zhang's research interests include...".
- Honors & Awards.
- Leadership Experience.
- Technical Skills.
- Social Media: two cards for Bilibili (linked) and Rednote (linked to profile).
- Miscellaneous: three compact personal cards for music, favorite character, and Ultimate Frisbee, plus Photography.
- Footer: last updated date.

### SEO

The page targets Google discoverability for the query "Xinglang Zhang":

- `<title>`: `Xinglang Zhang | Undergraduate Researcher in AI Reasoning, HUST`
- `<meta name="description">`: one-sentence summary with name, affiliation, and research areas.
- `<script type="application/ld+json">`: Person schema with `sameAs` pointing to Google Scholar, GitHub, and arXiv.
- `sitemap.xml`: registered in Google Search Console.
- Google Search Console ownership verified via `google*.html` at the repo root.
- The full name "Xinglang Zhang" appears naturally ~12 times across the page.
- All decorative images (mascots, stickers, card illustrations) use `alt=""`. The header avatar uses `alt="Xinglang Zhang"`. Publication figures keep descriptive alt text.

Important conventions:

- The About paragraph is written in third person (e.g. "Xinglang Zhang is..." not "Hi, I'm...") for both readability and SEO.
- Advisers/supervisors are written as `Professor Zikai Song` and `Professor Heng Ji`.
- In publication author metadata, keep names as author names only, e.g. `Corresponding author: Zikai Song`; do not add `Professor` there.
- When linking institutions in honors or profile text, use blue inline links for live institutional pages, for example `Qiming College` and `Peking University`.
- Decorative images (mascots, stickers, card illustrations) use `alt=""` so they don't dilute page semantics for search engines.
- The header avatar uses `alt="Xinglang Zhang"`. Publication figures and non-decorative images keep descriptive alt text.
- Social Media cards use `<a class="social-card">` when they have an external profile link, `<article class="social-card">` otherwise.

## Visual Direction

The site should remain a clean academic homepage, not a full illustrated landing page. Hachiware-style elements should be used as small personal accents:

- `assets/hachi-head.png`: square avatar next to `Xinglang Zhang`.
- `assets/hachi-reading.png`: larger About-section sticker, floated on desktop and stacked on mobile.
- `assets/hachi-music.png`, `assets/hachi-flower.png`, `assets/hachi-frisbee.png`: images inside Miscellaneous cards.
- `assets/bilibili.png`, `assets/rednote.png`, `assets/photograph.png`: compact icon assets for Social Media and Photography cards.
- `assets/EA.png`, `assets/Class.png`, `assets/华中科技大学-logo-512px.png`: compact icon assets for Leadership Experience cards.
- `assets/hachi-cursor.png`: small custom cursor.

When adding new images:

- Prefer white-background PNGs that fit the existing minimal design.
- Put final website assets in `assets/` with clean names like `hachi-reading.png`.
- Avoid referencing files with spaces in their names from HTML/CSS.
- Keep image rendering constrained with explicit CSS dimensions and `object-fit: contain` unless cropping is deliberately desired.
- Do not replace the whole homepage layout just to add mascot elements.

## Maintenance Workflow

1. Check current state:

   ```bash
   git status --short
   ```

2. Make scoped edits:

   - Content edits usually belong in `index.html`.
   - Visual/layout edits belong in `style.css`.
   - New image assets go in `assets/`.

3. Validate references:

   ```bash
   rg -n "assets/|\\.png|\\.pdf" index.html style.css
   git diff --check
   ```

   For CV changes, compile and sync the homepage copy:

   ```bash
   cd CV
   latexmk -xelatex -interaction=nonstopmode -halt-on-error ml.tex
   cp ml.pdf ../assets/CV_Xinglang_Zhang.pdf
   cd ..
   ```

   Keep the homepage CV link as a normal PDF link without the HTML `download` attribute so browsers can preview it inline.

4. Visually verify layout when changing images or CSS:

   ```bash
   playwright screenshot --viewport-size=1000,1200 --wait-for-timeout=1200 \
     file://$(pwd)/index.html /private/tmp/site-check.png
   ```

   Also check mobile when changing cards or floated images:

   ```bash
   playwright screenshot --viewport-size=390,950 --wait-for-timeout=1200 \
     file://$(pwd)/index.html /private/tmp/site-mobile-check.png
   ```

5. Clean unused temporary files before committing:

   - Remove root-level generated PNG drafts after copying the final version into `assets/`.
   - Keep only assets referenced by the site or intentionally retained as source material.
   - Do not commit `.DS_Store` changes.
   - Keep `.DS_Store` ignored in `.gitignore` so these files do not reappear in commits.
   - Never remove `google*.html` or `sitemap.xml` from the repo root—they are needed for Google Search Console.

6. Commit with a short, direct message.

## Commit History Pattern

Recent commits show the intended workflow:

- `Add SEO improvements for Google discoverability`: title, meta description, Person JSON-LD, sitemap.xml, third-person About, image alt cleanup.
- `Add Google Search Console verification file`: ownership verification.
- `Add scrollable News section and Rednote profile link`: News scroll container and Rednote card hyperlink.
- `Add social media and photography details`: Bilibili, Rednote, and Photography cards.
- `Add leadership and language skills`: leadership cards and language section.
- `Add under-review preference publication`: new publication card.
- `Add Hachiware visual accents`: added personal visual assets and CSS/HTML hooks.
- `Update advisor titles`: adjusted adviser/supervisor naming in the About section.
- `Updated Resume`: replaced the CV PDF.

Prefer commit messages like:

- `Update CV`
- `Add SEO improvements for Google discoverability`
- `Add Hachiware visual accents`
- `Update publication links`
- `Add ACL news update`
- `Adjust miscellaneous cards`

## Deployment

The repository is the GitHub Pages source. After committing, push `main` to update the live site:

```bash
git push
```

The live site may take a short time to refresh after GitHub Pages receives the push.
