import type { Category } from "./types";

export const CATEGORY_META: Record<Category, { label: string; color: string; emoji: string }> = {
  historical: { label: "Historical", color: "#b7791f", emoji: "\u{1F3DB}️" },
  mosque: { label: "Mosque", color: "#2f855a", emoji: "\u{1F54C}" },
  museum: { label: "Museum", color: "#6b46c1", emoji: "\u{1F3DB}️" },
  palace: { label: "Palace", color: "#b83280", emoji: "\u{1F451}" },
  hamam: { label: "Hamam", color: "#2b6cb0", emoji: "\u{1F6C1}" },
  breakfast: { label: "Breakfast", color: "#dd6b20", emoji: "\u{1F373}" },
  cafe: { label: "Cafe", color: "#795548", emoji: "☕" },
  restaurant: { label: "Restaurant", color: "#c53030", emoji: "\u{1F37D}️" },
  bar: { label: "Bar", color: "#553c9a", emoji: "\u{1F378}" },
  viewpoint: { label: "Viewpoint", color: "#3182ce", emoji: "\u{1F304}" },
  market: { label: "Market", color: "#d53f8c", emoji: "\u{1F6CD}️" },
  park: { label: "Park", color: "#38a169", emoji: "\u{1F333}" },
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_META) as Category[];
