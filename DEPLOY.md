# Aiku Finance – Netlify Deploy Guide

## Structure
```
aiku-netlify/
├── public/
│   └── index.html   ← entire app, self-contained
├── netlify.toml     ← tells Netlify: serve the public/ folder
└── package.json
```

Data is saved in the **browser's localStorage** — nothing to configure, no database, no API keys.
Use the "Export JSON" button in the dashboard to back up your data anytime.

---

## Option A — Drag & Drop (easiest, no account needed initially)

1. Go to **https://app.netlify.com**
2. Sign up / log in (free)
3. On the dashboard click **"Add new site" → "Deploy manually"**
4. Drag the entire `aiku-netlify` folder onto the upload zone
5. Done — Netlify gives you a live URL instantly

---

## Option B — Deploy over your existing site (to keep the same URL)

If you already deployed before and want to update it:

1. Go to **https://app.netlify.com** → open your existing site
2. Go to **Deploys** tab
3. Drag the `aiku-netlify` folder onto the **"Drag and drop"** zone at the bottom of that page
4. Netlify replaces the old version, same URL, no downtime

---

## Option C — CLI (one-time setup)

```bash
npm install -g netlify-cli
netlify login
cd aiku-netlify
netlify deploy --prod --dir=public
```

If you already have a site linked, it will update that site.
If not, it creates a new one.

---

## Data & Backup

- Data lives in the browser's localStorage under the key `aiku_finance_dashboard_v3`
- Click **Export JSON** in the app to download a full backup
- To move data to another browser/device: Export JSON on old device → use the Import buttons on the new one
