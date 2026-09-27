import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import type { Place } from "../types";
import { CATEGORY_META } from "../categoryMeta";
import { getMapView, setMapView } from "../state/mapViewStore";

function markerIcon(place: Place, visited: boolean) {
  const meta = CATEGORY_META[place.category];
  return L.divIcon({
    className: "place-marker",
    html: `<div class="place-marker-pin${visited ? " visited" : ""}" style="background:${meta.color}"><span>${meta.emoji}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
    popupAnchor: [0, -26],
  });
}

function FlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15, { duration: 0.6 });
  }, [center, map]);
  return null;
}

function ViewTracker({ cityId }: { cityId: string }) {
  useMapEvents({
    moveend(e) {
      const map = e.target;
      const c = map.getCenter();
      setMapView(cityId, { lat: c.lat, lng: c.lng, zoom: map.getZoom() });
    },
  });
  return null;
}

interface Props {
  center: { lat: number; lng: number };
  places: Place[];
  isVisited: (id: string) => boolean;
  onToggleVisited: (id: string) => void;
  flyToCenter: [number, number] | null;
  cityId: string;
}

export default function MapView({
  center,
  places,
  isVisited,
  onToggleVisited,
  flyToCenter,
  cityId,
}: Props) {
  const navigate = useNavigate();

  const remembered = getMapView(cityId);
  const initialCenter: [number, number] = remembered
    ? [remembered.lat, remembered.lng]
    : [center.lat, center.lng];
  const initialZoom = remembered?.zoom ?? 13;

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo center={flyToCenter} />
      <ViewTracker cityId={cityId} />
      {places.map((place) => {
        const visited = isVisited(place.id);
        return (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={markerIcon(place, visited)}
          >
            <Popup>
              <div className="popup">
                <strong>{place.name}</strong>
                <p>{place.shortDescription}</p>
                <div className="popup-actions">
                  <button onClick={() => navigate(`/place/${cityId}/${place.id}`)}>
                    Open wiki page
                  </button>
                  <button
                    className={`popup-visited${visited ? " visited" : ""}`}
                    onClick={() => onToggleVisited(place.id)}
                  >
                    {visited ? "✓ Visited" : "Mark visited"}
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
