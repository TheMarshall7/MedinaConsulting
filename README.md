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

See [`CLOUDFLARE.md`](CLOUDFLARE.md) for the exact dashboard settings.

**Important:** your Cloudflare build must **not** run `npx @cloudflare/next-on-pages@1`. Change the build command to:

```bash
npm run cf:build
```

and the deploy command to:

```bash
npx wrangler deploy
```

(or set Root directory to `web` and use `npx opennextjs-cloudflare build` / `deploy`).

## Legacy files

- `index.html` — earlier single-file prototype
- `website-content.md` — content inventory used for the rebuild
- `Medina.png` / `Medina Logo.png` — source logos (also copied into `web/public/`)
- `Template Reference.html` — design / motion reference
