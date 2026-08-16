# Medina Consulting

Marketing site for **Medina Grant Writing & Consulting**.

## Next.js site

The production site lives in [`web/`](web/):

```bash
cd web
npm install
npm run dev
```

## Deploy on Cloudflare

Do **not** use `@cloudflare/next-on-pages` — this app uses Next.js 16 with [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

In the Cloudflare project settings:

| Setting | Value |
| --- | --- |
| Root directory | `web` |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

Or from your machine:

```bash
cd web
npm run deploy
```

## Legacy files

- `index.html` — earlier single-file prototype
- `website-content.md` — content inventory used for the rebuild
- `Medina.png` / `Medina Logo.png` — source logos (also copied into `web/public/`)
- `Template Reference.html` — design / motion reference
