/**
 * Konfiguracja API.
 *
 * - Docker: build z VITE_API_URL=/api (nginx proxy’uje na backend)
 * - Vercel / czysty landing: BEZ VITE_API_URL → API wyłączone, brak fetchy na /api/*
 * - Zewnętrzny backend: VITE_API_URL=https://twoj-backend.example.com/api
 */
const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim();

export const API_BASE = raw ? raw.replace(/\/$/, '') : '';
export const API_ENABLED = API_BASE.length > 0;

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_ENABLED) return null;

  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      console.warn(`API ${response.status}: ${url}`);
      return null;
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      console.warn(`API zwróciło nie-JSON (${contentType}): ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (err) {
    console.warn('Błąd połączenia z API:', err);
    return null;
  }
}
