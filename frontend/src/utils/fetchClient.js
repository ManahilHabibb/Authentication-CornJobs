export async function apiFetch(path, opts = {}) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const res = await fetch(`${base}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...opts
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || res.statusText);
  }
  return res.json();
}
