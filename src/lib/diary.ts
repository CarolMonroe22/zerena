const KEY = "serena.diary.v1";

export type DiaryEntry = {
  id: string;
  createdAt: number;
  text: string;
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readDiary(): DiaryEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) =>
        e && typeof e.id === "string" && typeof e.text === "string" && typeof e.createdAt === "number",
    );
  } catch {
    return [];
  }
}

export function addEntry(text: string): DiaryEntry {
  const entry: DiaryEntry = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    text: text.trim(),
  };
  const all = [entry, ...readDiary()];
  window.localStorage.setItem(KEY, JSON.stringify(all));
  return entry;
}

export function deleteEntry(id: string) {
  const all = readDiary().filter((e) => e.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearDiary() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(KEY);
}
