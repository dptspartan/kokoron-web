# Kokoro Connect — Coming Soon

A stunning, dark-themed "coming soon" landing page for **Kokoro Connect** — *a shared space for you and your lover*.

Pure HTML/CSS/JS, no build step, no dependencies. Built to be deployed straight to GitHub Pages.

## ✨ What's inside

- Animated twinkling starfield (canvas)
- Drifting watercolor-style ambient glow blobs (sage, rose, gold — echoing the emblem)
- Floating, pulsing ring emblem with a soft halo
- Shimmering gold gradient title text
- Subtle rotating "心" (kokoro / heart) kanji watermark
- Cursor-following glow + gentle emblem parallax on desktop
- A "Notify Me" email capture (front-end only — see note below)
- Fully responsive, respects `prefers-reduced-motion`

## 📁 Structure

```
kokoron/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── kokoro-emblem.png / .webp   # logo emblem (two rings)
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   └── og-image-base.png          # social share preview
├── CNAME                          # kokoronapp.com (GitHub Pages custom domain)
└── README.md
```

## 🚀 Preview locally

Just open `index.html` in a browser, or serve it:

```bash
cd kokoron
python3 -m http.server 8000
# visit http://localhost:8000
```

## 🌐 Deploying to GitHub Pages with kokoronapp.com

1. Create a GitHub repo (e.g. `kokoron-website`) and push this folder's contents to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Under **Custom domain**, enter `kokoronapp.com` and save (this repo already includes a `CNAME` file, so GitHub should pick it up automatically — verify it matches).
5. At your domain registrar / DNS provider for `kokoronapp.com`, add:
   - An **A** record for the apex domain (`@`) pointing to GitHub Pages' IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - (Optional) A **CNAME** record for `www` pointing to `<your-github-username>.github.io`.
6. Back in **Settings → Pages**, once DNS propagates, check **Enforce HTTPS**.

DNS propagation can take anywhere from a few minutes to 24 hours.

## 📬 About the "Notify Me" form

The email form currently only stores the address in the visitor's browser (`localStorage`) and shows a confirmation — it is **not connected to a backend or mailing list yet**. To actually collect emails, wire the form submit handler in `js/script.js` to a service such as:

- [Formspree](https://formspree.io/)
- [Mailchimp](https://mailchimp.com/) signup forms
- [Buttondown](https://buttondown.email/)
- Your own `us-exe-backend` API

## 🎨 Customizing

All colors, fonts, and timings live in `css/style.css` under the `:root` variables and keyframes at the top — tweak `--gold`, `--sage`, `--rose`, `--bg-0/1/2` to adjust the palette.
