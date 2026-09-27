import { useCallback, useState } from "react";
import { DEFAULT_CITY } from "../data/cities";

const STORAGE_KEY = "tg:city:v1";

export function useCity() {
  const [cityId, setCityIdState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_CITY,
  );

  const setCityId = useCallback((id: string) => {
    localStorage.setItem(STORAGE_KEY, id);
    setCityIdState(id);
  }, []);

  return { cityId, setCityId };
}
