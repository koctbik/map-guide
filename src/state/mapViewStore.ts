export interface MapViewState {
  lat: number;
  lng: number;
  zoom: number;
}

const store = new Map<string, MapViewState>();

export function getMapView(cityId: string): MapViewState | undefined {
  return store.get(cityId);
}

export function setMapView(cityId: string, view: MapViewState) {
  store.set(cityId, view);
}
