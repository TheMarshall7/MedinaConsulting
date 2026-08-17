# Decap CMS

[Decap CMS](https://github.com/decaporg/decap-cms) is available at **`/admin`**.

Editors can manage:

- **Reviews** — homepage carousel quotes
- **Blog** — posts under `/blog`
- **Site settings** — hero/contact copy and funds secured number
- **Uploads** — images saved to `web/public/uploads`

## Local editing (recommended to start)

1. In one terminal:

```bash
cd web
npm run dev
```

2. In another:

```bash
cd web
npm run cms
```

3. Open [http://localhost:3000/admin](http://localhost:3000/admin)

With `local_backend: true`, Decap writes straight to your local `content/` and `public/uploads/` folders. Commit and push when ready.

## Production login (GitHub)

The CMS uses the **GitHub** backend against `TheMarshall7/MedinaConsulting`.

Anyone who logs in needs **write access** to that repo.

### Option A — Netlify Identity proxy (simple)

Even if the site is hosted on Cloudflare/Vercel, you can use Netlify’s auth proxy:

1. Create a free site on [Netlify](https://www.netlify.com/) connected to the same GitHub repo (or a blank site).
2. Enable **Identity** and the **GitHub** authentication provider (see [Decap GitHub backend](https://decapcms.org/docs/github-backend/)).
3. In `web/public/admin/config.yml`, add under `backend`:

```yaml
base_url: https://api.netlify.com
auth_endpoint: auth
site_domain: YOUR-NETLIFY-SITE.netlify.app
```

### Option B — Your own GitHub OAuth app

1. Create a GitHub OAuth App (Homepage URL = your live site, callback = your OAuth proxy callback URL).
2. Deploy an OAuth proxy (for example [netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider)).
3. Point `backend.base_url` / `auth_endpoint` at that proxy.

Until production auth is configured, use **local editing** above.

## After publishing

CMS commits update files in Git. Your host rebuilds the static site so new reviews/posts go live.

## URLs

| Path | Purpose |
| --- | --- |
| `/admin/` | CMS UI |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post |
