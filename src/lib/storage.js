const STORAGE_KEYS = {
  auth: 'facultyAuth',
  profile: 'facultyProfile',
  grades: 'studentGrades',
};

function safeParse(raw) {
  if (raw == null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  const parsed = safeParse(window.localStorage.getItem(key));
  return parsed == null ? fallback : parsed;
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
}

export function mergeStorage(key, fallback) {
  const stored = readStorage(key, null);
  if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
    return { ...fallback, ...stored };
  }
  return stored ?? fallback;
}

export { STORAGE_KEYS };
