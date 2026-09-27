import type { CityData } from "../../types";
import istanbul from "./istanbul.json";
import izmir from "./izmir.json";

export const CITIES: Record<string, CityData> = {
  istanbul: istanbul as CityData,
  izmir: izmir as CityData,
};

export const DEFAULT_CITY = "istanbul";

export function getCity(id: string): CityData {
  return CITIES[id] ?? CITIES[DEFAULT_CITY];
}

export function listCities(): CityData[] {
  return Object.values(CITIES);
}

export function findPlace(cityId: string, placeId: string) {
  return getCity(cityId).places.find((p) => p.id === placeId);
}
