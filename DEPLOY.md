# Aiku Finance – Netlify Deployment Guide

## What's in this package

```
aiku-netlify/
├── public/
│   └── index.html          ← your full dashboard (unchanged UI)
├── netlify/
│   └── functions/
│       └── db.mjs          ← serverless API (GET + POST /api/db)
├── netlify.toml            ← build config
├── package.json            ← only dep: @netlify/blobs
└── DEPLOY.md               ← this file
```

**How persistence works:**
- `GET /api/db` → loads your full data JSON from Netlify Blobs
- `POST /api/db` → saves your full data JSON to Netlify Blobs
- No external database. No SQL. No signup fees. Free on Netlify's starter plan.
- Data survives deployments and server restarts forever.

---

## Step-by-step: Deploy to Netlify

### 1. Install Netlify CLI (one-time)
```bash
npm install -g netlify-cli
```

### 2. Install dependencies
```bash
cd aiku-netlify
npm install
```

### 3. Test locally first (optional but recommended)
```bash
netlify dev
```
Open http://localhost:8888 — the dashboard will load, save, and persist via the local dev server.

### 4. Login to Netlify
```bash
netlify login
```
This opens a browser tab. Click **Authorize**.

### 5. Create a new Netlify site and deploy
```bash
netlify init
```
Choose:
- **Create & configure a new site**
- Pick your team
- Give it a name (e.g. `aiku-finance`) or leave blank for a random one

Then deploy:
```bash
netlify deploy --prod
```

That's it. Your site is live at `https://YOUR-SITE-NAME.netlify.app`.

---

## Alternative: Deploy via Netlify Web UI (no CLI)

1. Go to https://app.netlify.com → **Add new site → Import an existing project**
2. Push this folder to a GitHub repo first:
   ```bash
   git init && git add . && git commit -m "init"
   gh repo create aiku-finance --public --push --source=.
   ```
3. In Netlify, connect the GitHub repo.
4. Set **Publish directory** to `public` and **Functions directory** to `netlify/functions`.
5. Click **Deploy site**.

---

## Environment / secrets

No API keys or secrets needed. Netlify Blobs works automatically when deployed to Netlify (it uses your site's built-in credentials).

For local `netlify dev`, Blobs also works out of the box — it uses a local file cache.

---

## Data backup

In the dashboard, use **Export JSON** to download a full backup at any time.
To restore, use the **Import** CSV/XLSX buttons on each section, or replace the blob via:
```bash
netlify blobs set aiku data "$(cat your_backup.json)"
```

---

## Costs

| Resource | Free tier |
|---|---|
| Netlify Blobs storage | 1 GB free |
| Serverless function calls | 125,000 / month free |
| Bandwidth | 100 GB / month free |

Aiku Finance will never come close to these limits.
