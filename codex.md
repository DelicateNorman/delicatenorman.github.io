# Codex Notes

This repository is the source for Xinglang Zhang's personal academic website at `https://delicatenorman.github.io/`.

The site is intentionally simple: a static `index.html`, one `style.css`, a small `script.js` for section fade-in animation, and assets under `assets/`. The goal is to keep the page readable as an academic homepage while adding a few personal visual details.

## Project Structure

- `index.html`: all page content and section ordering.
- `style.css`: typography, layout, publication cards, Hachiware visual accents, and responsive rules.
- `script.js`: intersection-observer animation for sections.
- `assets/CV_Xinglang_Zhang.pdf`: downloadable CV.
- `assets/Figure2-*.png`, `assets/fig2_*.png`: publication figures shown in publication cards.
- `assets/hachi-*.png`: Hachiware-style personal visual assets used in the current website.
- `assets/albums.png`, `assets/hachi.png`: older miscellaneous images retained in the asset library but not currently displayed.

## Current Content Model

The page currently contains these sections:

- Header: name, title, affiliation, contact links, and a small square Hachiware head beside the name.
- About: research profile, current advisers/supervisors, and a reading Hachiware sticker.
- News: chronological updates, newest first.
- Publications: three paper cards with title, authors, venue, summary, links, and figure.
- Research Interests.
- Honors & Awards.
- Technical Skills.
- Miscellaneous: three compact personal cards for music, favorite character, and Ultimate Frisbee.
- Footer: last updated date.

Important naming convention:

- In the About paragraph, advisers/supervisors are written as `Professor Zikai Song` and `Professor Heng Ji`.
- In publication author metadata, keep names as author names only, e.g. `Corresponding author: Zikai Song`; do not add `Professor` there.

## Visual Direction

The site should remain a clean academic homepage, not a full illustrated landing page. Hachiware-style elements should be used as small personal accents:

- `assets/hachi-head.png`: square avatar next to `Xinglang Zhang`.
- `assets/hachi-reading.png`: larger About-section sticker, floated on desktop and stacked on mobile.
- `assets/hachi-music.png`, `assets/hachi-flower.png`, `assets/hachi-frisbee.png`: images inside Miscellaneous cards.
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

6. Commit with a short, direct message.

## Commit History Pattern

Recent commits show the intended workflow:

- `Add Hachiware visual accents`: added personal visual assets and CSS/HTML hooks.
- `Update advisor titles`: adjusted adviser/supervisor naming in the About section.
- `Update profile research affiliations`: updated profile and affiliation text.
- `Updated Resume`: replaced the CV PDF.
- `Highlight oral news in red` and `Update ACL 2026 oral news`: small news/content updates.
- `Add Google Scholar link to contact section`: contact-link maintenance.
- `Minor fix`: small cleanup commits.

Prefer commit messages like:

- `Update CV`
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
