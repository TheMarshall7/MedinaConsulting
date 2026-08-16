# Cloudflare deploy settings

This project **cannot** use `@cloudflare/next-on-pages`. That is what your last build still ran:

```text
Executing user command: npx @cloudflare/next-on-pages@1
```

Use OpenNext instead.

## Exact Cloudflare dashboard changes

1. Open your Cloudflare project → **Settings** → **Builds** (or **Build configuration**)
2. Set:

| Field | Set to |
| --- | --- |
| Framework preset | **None** (or Workers / OpenNext — anything that is **not** “Next.js (Pages)”) |
| Root directory | leave empty / `/` **or** set to `web` |
| Build command | `npm run cf:build` |
| Deploy command | `npx wrangler deploy` |

If Root directory is set to `web`, use these instead:

| Field | Set to |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |

3. Save
4. Retry deployment

If the log still shows `npx @cloudflare/next-on-pages@1`, the dashboard command was not updated yet.
