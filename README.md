# Medina Consulting

Marketing site for **Medina Grant Writing & Consulting**.

## Next.js site

```bash
cd web
npm install
npm run dev
```

## Deploy on Cloudflare Pages

See [`CLOUDFLARE.md`](CLOUDFLARE.md).

Build command:

```bash
npm run build
```

Output directory: `web/out`

## Content CMS (Decap)

See [`CMS.md`](CMS.md).

- Admin: `/admin`
- Local: `cd web && npm run cms` (with `npm run dev` running)
- Editable: reviews, blog, site settings, image uploads

## Legacy files

- `index.html` — earlier single-file prototype
- `website-content.md` — content inventory used for the rebuild
- `Medina.png` / `Medina Logo.png` — source logos (also copied into `web/public/`)
- `Template Reference.html` — design / motion reference
