import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tg:visited:v1";

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function save(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useVisited() {
  const [visited, setVisited] = useState<Set<string>>(() => load());

  useEffect(() => save(visited), [visited]);

  const isVisited = useCallback((id: string) => visited.has(id), [visited]);

  const toggleVisited = useCallback((id: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setVisitedState = useCallback((id: string, value: boolean) => {
    setVisited((prev) => {
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return { visited, isVisited, toggleVisited, setVisitedState };
}
