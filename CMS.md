# Decap CMS — email + password (no GitHub for the client)

The editor lives at **`/admin`** and is branded **AreoClient** for the client. Under the hood it is [Decap CMS](https://decapcms.org/).

They can change reviews, blog posts, some site copy, and upload images. Saves go to Git automatically. They never need a GitHub account.

## One-time setup (you)

Git Gateway needs a free [Netlify](https://www.netlify.com/) site for login. The marketing site can stay on Cloudflare or Vercel.

1. [Add a new Netlify site](https://app.netlify.com/) from GitHub repo `TheMarshall7/MedinaConsulting`.
2. Confirm build settings (or rely on `netlify.toml` in the repo):
   - Build command: `npm run build`
   - Publish directory: `web/out`
   - Branch: `main`
3. **Site configuration → Access control → Site protection** must be **off / public**. Identity is only for `/admin`, not the whole site.
4. **Site configuration → Identity → Enable Identity**.
5. Identity → **Registration** → **Invite only** (so random people cannot sign up).
6. Identity → **Services → Git Gateway → Enable**. Connect the GitHub repo when asked.
7. Commit, push, and wait for the live site to rebuild.
8. Netlify → Identity → **Invite users** → enter the client’s email.
9. They get an email, set a password, then go to `https://medinaconsulting.netlify.app/admin` and log in.

You can also set their password yourself from the Identity dashboard after they accept the invite.

## Local editing (you)

```bash
cd web
npm run dev
```

```bash
cd web
npm run cms
```

Open [http://localhost:3000/admin](http://localhost:3000/admin). No Netlify login required locally.

## After they publish

Each save is a Git commit. Your host rebuilds, and the new review/post goes live.

## URLs

| Path | Purpose |
| --- | --- |
| `/admin/` | CMS login + editor |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post |
