import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import type { Place } from "../types";
import { CATEGORY_META } from "../categoryMeta";

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

interface Props {
  center: { lat: number; lng: number };
  places: Place[];
  isVisited: (id: string) => boolean;
  flyToCenter: [number, number] | null;
  cityId: string;
}

export default function MapView({ center, places, isVisited, flyToCenter, cityId }: Props) {
  const navigate = useNavigate();

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo center={flyToCenter} />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={markerIcon(place, isVisited(place.id))}
        >
          <Popup>
            <div className="popup">
              <strong>{place.name}</strong>
              <p>{place.shortDescription}</p>
              <button onClick={() => navigate(`/place/${cityId}/${place.id}`)}>
                Open wiki page
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
