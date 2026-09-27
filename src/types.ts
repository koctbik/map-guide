export type Category =
  | "historical"
  | "mosque"
  | "museum"
  | "palace"
  | "hamam"
  | "breakfast"
  | "cafe"
  | "restaurant"
  | "bar"
  | "viewpoint"
  | "market"
  | "park";

export type PriceLevel = "free" | "$" | "$$" | "$$$";

export interface Place {
  id: string;
  name: string;
  category: Category;
  neighborhood: string;
  lat: number;
  lng: number;
  shortDescription: string;
  wiki: string;
  tags: string[];
  address?: string;
  priceLevel?: PriceLevel;
  rating?: number;
}

export interface CityData {
  city: string;
  cityLabel: string;
  center: { lat: number; lng: number };
  comingSoon?: boolean;
  places: Place[];
}
