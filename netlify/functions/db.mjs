/**
 * Aiku Finance – minimal persistence API
 * GET  /api/db          → returns full JSON data
 * POST /api/db          → body: { key, value }  saves one top-level key
 *
 * Storage: Netlify Blobs (free, built-in, no DB needed)
 * Blob store name: "aiku"  |  blob key: "data"
 */

import { getStore } from "@netlify/blobs";

const STORE = "aiku";
const KEY   = "data";

const defaultData = () => ({
  settings: {
    name: "Aiku Handroll Bar",
    currency: "SAR",
    taxRate: 15,
    foodTarget: 30,
    netTarget: 10,
    fiscalStart: "",
    templateFormat: "CSV",
    posSync: "Off",
    notes: "",
    logo: ""
  },
  sales: [],
  inventory: [],
  purchases: [],
  expenses: [],
  payments: []
});

export default async (req, context) => {
  const store = getStore(STORE);

  /* ── CORS headers ── */
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  /* ── GET – load everything ── */
  if (req.method === "GET") {
    const raw = await store.get(KEY, { type: "text" }).catch(() => null);
    const data = raw ? JSON.parse(raw) : defaultData();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" }
    });
  }

  /* ── POST – save full data object ── */
  if (req.method === "POST") {
    const body = await req.json();
    // body is the full data object
    await store.set(KEY, JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405, headers: cors });
};

export const config = { path: "/api/db" };
