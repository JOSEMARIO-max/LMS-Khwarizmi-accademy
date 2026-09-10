# Deploy ke Cloudflare Pages

App ini adalah SPA SvelteKit (`@sveltejs/adapter-cloudflare`) yang bicara ke
backend terpisah lewat `VITE_API_URL`. Build menghasilkan output Pages di
`.svelte-kit/cloudflare`.

> `VITE_API_URL` di-inline saat **build** (bukan runtime). Jadi nilai produksinya
> harus ada saat build berjalan — di Cloudflare (Git build) set sebagai env var,
> atau di lokal lewat `.env` sebelum `bun run build`.

## Opsi A — Git integration (rekomendasi)

1. Push branch ini ke GitHub.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pilih repo, lalu set:
   - **Build command:** `bun run build` (atau `npm run build`)
   - **Build output directory:** `.svelte-kit/cloudflare`
4. **Settings → Environment variables** → tambah `VITE_API_URL` = URL API produksi
   (mis. `https://api.khwarizmi.co.id/api`) untuk Production & Preview.
5. Save & Deploy. Tiap push otomatis rebuild.

## Opsi B — Direct upload (wrangler)

```bash
# sekali saja
bun add -d wrangler
bunx wrangler login

# set API produksi untuk build ini, lalu build + deploy
VITE_API_URL="https://api.khwarizmi.co.id/api" bun run build
bunx wrangler pages deploy
```

`wrangler.jsonc` sudah menetapkan `name` dan `pages_build_output_dir`, jadi
`wrangler pages deploy` tidak butuh flag tambahan.

## Catatan

- SPA murni (`ssr = false`, `prerender = true`) — halaman dinamis di-serve lewat
  Worker fallback (`_routes.json` sudah diatur adapter).
- CORS: pastikan backend mengizinkan origin domain Pages (`*.pages.dev` atau
  domain kustom).
