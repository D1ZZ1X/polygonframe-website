# Polygon Frame website

Hand-written HTML/CSS starter. No build step: open `index.html` in a browser.

## Files
- `index.html`: home page (Polygon Frame), served at polygonframe.com
- `about.html`: bio
- `contact.html`: contact form (needs a form service such as Formspree before it can send)
- `gallery.html`: Main Gallery
- `weddings.html`, `video.html`, `audio.html`
- `css/styles.css`: the only stylesheet. Brand colors and fonts live in `:root` at the top.
- `js/nav.js`: phone menu toggle (the site still works with JS off)
- `images/`: put optimized photos here

## Workflow: preview first, go live on request
- All work happens on the `preview` branch. GitHub Pages only publishes `main`, so preview changes are saved but not live.
- After each change, the private preview page is refreshed: https://claude.ai/artifact/Vt6Dy91FrtxUz27ptvM4xp
- When Anton says a build is ready, `preview` is merged into `main` and it goes live at polygonframe.com.

## Updating CSS or JS
Browsers keep old copies of `styles.css` and the scripts for up to 10 minutes.
Every page links them with a version number (`styles.css?v=10`). After changing
CSS or JS, bump that number on all pages so visitors get the new file at once.

## Layouts
- Phone (under 640px): single column, Menu button
- Tablet (640px+): two-column grid
- Desktop (960px+): inline nav, three-column grid

## Checking both formats
In Chrome or Edge, press F12, then the phone/tablet icon (Ctrl+Shift+M) to preview iPhone and Android sizes. Always confirm on a real phone too.

## Accessibility built in
Skip link, visible keyboard focus, labelled nav and form fields, 44px touch targets, 16px minimum body text, reduced-motion support.

## Hosting: GitHub Pages + Squarespace domain

The files are hosted free on GitHub Pages. The domain stays registered at Squarespace.
The `CNAME` file in this folder tells GitHub Pages to serve the site at polygonframe.com.

### 1. GitHub (one time)
1. Create an empty public repository on github.com (done: `D1ZZ1X/polygonframe-website`).
2. After the files are pushed, open the repo's Settings > Pages:
   - Source: Deploy from a branch, branch `main`, folder `/ (root)`.
   - Custom domain: `polygonframe.com` (already filled in by the CNAME file).
   - Tick "Enforce HTTPS" once it becomes available (can take up to an hour).

### 2. Squarespace DNS (Domains > polygonframe.com > DNS > DNS settings)
Remove any existing Squarespace default A/CNAME records for `@` and `www`, then add:

| Host | Type  | Data                    |
|------|-------|-------------------------|
| @    | A     | 185.199.108.153         |
| @    | A     | 185.199.109.153         |
| @    | A     | 185.199.110.153         |
| @    | A     | 185.199.111.153         |
| www  | CNAME | d1zz1x.github.io|

DNS changes usually take minutes, occasionally up to 48 hours.
Keep any MX/email records you already have; don't delete those.

The Squarespace *website* plan is no longer needed once this works. The *domain* registration renews separately; keep that.
Never share passwords; every change above is made by you in your own dashboard.
