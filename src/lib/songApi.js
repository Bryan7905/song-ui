const baseUrl = import.meta.env.VITE_SONG_API_BASE_URL;

async function request(path, init) {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }

  // If your backend returns plain text sometimes, this is safer:
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return await res.json();
  return await res.text();
}

const SONGS_BASE = "/galang/songs";

export function listSongs() {
  return request(`${SONGS_BASE}`);
}

export function getSong(id) {
  return request(`${SONS_BASE}/${id}`);
}

export function createSong(song) {
  return request(`${SONGS_BASE}`, {
    method: "POST",
    body: JSON.stringify(song),
  });
}

export function updateSong(id, song) {
  return request(`${SONGS_BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(song),
  });
}

export function deleteSong(id) {
  return request(`${SONGS_BASE}/${id}`, { method: "DELETE" });
}

export function searchSongs(keyword) {
  return request(`${SONGS_BASE}/search/${encodeURIComponent(keyword)}`);
}