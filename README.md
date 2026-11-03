# MVA360 website

The public website for MVA360, served by GitHub Pages at **https://mva360.com.au**.

It's a plain static site: no build step, no cookies, no analytics, and no third-party requests (fonts are hosted here).

| File | What it is |
|---|---|
| `index.html` | Home page: what MVA360 does, screenshots, pricing, questions |
| `download.html` | Download page and system requirements |
| `legal/terms.html`, `legal/privacy.html`, `legal/refunds.html` | Terms of service, privacy policy, cancellations and refunds |
| `assets/site.css`, `assets/site.js` | Styles, the timeline animation and the monthly/annual price switch |
| `assets/img/` | Logo and app screenshots (invented teams and players only, never real squads) |
| `assets/fonts/` | Barlow Condensed and Public Sans (SIL Open Font Licence) |
| `CNAME` | Tells GitHub Pages to serve the site at mva360.com.au |

## Editing

See **[EDITING.md](EDITING.md)**: how to change text, prices, questions and screenshots in the browser, and the price-change checklist (website, licence server and Pin must match).

## Later

- `downloads/latest.json`: the update file the app checks (see `packaging/update/latest.json.example` in MVA360-App). Add it when the first installer is published.
- Installers: attach them to GitHub Releases in this repository and link them from `download.html`.
