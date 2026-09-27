import { useCallback, useEffect, useState } from "react";
import { ALL_CATEGORIES } from "../categoryMeta";
import type { Category } from "../types";

const CATEGORY_KEY = "tg:categories:v1";
const VISITED_FILTER_KEY = "tg:visitedFilter:v1";

export type VisitedFilter = "all" | "visited" | "unvisited";

function loadCategories(): Set<Category> {
  try {
    const raw = localStorage.getItem(CATEGORY_KEY);
    if (!raw) return new Set(ALL_CATEGORIES);
    const arr = JSON.parse(raw) as Category[];
    return arr.length ? new Set(arr) : new Set(ALL_CATEGORIES);
  } catch {
    return new Set(ALL_CATEGORIES);
  }
}

function loadVisitedFilter(): VisitedFilter {
  const raw = localStorage.getItem(VISITED_FILTER_KEY);
  return raw === "visited" || raw === "unvisited" ? raw : "all";
}

export function useFilters() {
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(loadCategories);
  const [visitedFilter, setVisitedFilterState] = useState<VisitedFilter>(loadVisitedFilter);

  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify([...activeCategories]));
  }, [activeCategories]);

  useEffect(() => {
    localStorage.setItem(VISITED_FILTER_KEY, visitedFilter);
  }, [visitedFilter]);

  const toggleCategory = useCallback((cat: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const soloCategory = useCallback((cat: Category) => {
    setActiveCategories((prev) => {
      if (prev.size === 1 && prev.has(cat)) return new Set(ALL_CATEGORIES);
      return new Set([cat]);
    });
  }, []);

  const resetCategories = useCallback(() => setActiveCategories(new Set(ALL_CATEGORIES)), []);

  return {
    activeCategories,
    toggleCategory,
    soloCategory,
    resetCategories,
    visitedFilter,
    setVisitedFilter: setVisitedFilterState,
  };
}
