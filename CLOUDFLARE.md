# Cloudflare Pages deploy

This site is a **static Next.js export**. Do not use `@cloudflare/next-on-pages`.

## Cloudflare dashboard

| Field | Value |
| --- | --- |
| Framework preset | **None** |
| Root directory | *(empty / repository root)* |
| Build command | `npm run build` |
| Build output directory | `web/out` |

Or rely on the root `wrangler.jsonc` (`pages_build_output_dir`: `web/out`).

If the build log still shows `npx @cloudflare/next-on-pages@1`, change the Framework preset to **None** and set the Build command to `npm run build`.

## Local preview

```bash
cd web
npm run build
npx serve out
```
