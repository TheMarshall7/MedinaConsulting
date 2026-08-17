# Medina Consulting

Marketing site for **Medina Grant Writing & Consulting**.

## Next.js site

```bash
cd web
npm install
npm run dev
```

## Deploy on Netlify

The live site is [medinaconsulting.netlify.app](https://medinaconsulting.netlify.app/). Build settings live in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `web/out`

## Deploy on Cloudflare Pages

See [`CLOUDFLARE.md`](CLOUDFLARE.md).

Build command:

```bash
npm run build
```

Output directory: `web/out`

## Content CMS (Decap)

See [`CMS.md`](CMS.md) for email/password login (client does not need GitHub).

- Admin: `/admin`
- Local: `cd web && npm run cms` (with `npm run dev` running)
- Editable: reviews, blog, site settings, image uploads

## Legacy files

- `index.html` — earlier single-file prototype
- `website-content.md` — content inventory used for the rebuild
- `Medina.png` / `Medina Logo.png` — source logos (also copied into `web/public/`)
- `Template Reference.html` — design / motion reference
