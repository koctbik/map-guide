import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { findPlace, getCity } from "../data/cities";
import { CATEGORY_META } from "../categoryMeta";
import { useVisited } from "../state/useVisited";
import WikiText from "../components/WikiText";

export default function PlacePage() {
  const { cityId = "", placeId = "" } = useParams();
  const navigate = useNavigate();
  const { isVisited, toggleVisited } = useVisited();

  const goBack = () => navigate(`/?city=${cityId}`);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") navigate(`/?city=${cityId}`);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cityId, navigate]);

  const city = getCity(cityId);
  const place = findPlace(cityId, placeId);

  if (!place) {
    return (
      <div className="place-page not-found">
        <p>Place not found.</p>
        <Link to="/">Back to map</Link>
      </div>
    );
  }

  const meta = CATEGORY_META[place.category];
  const visited = isVisited(place.id);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  const icon = L.divIcon({
    className: "place-marker",
    html: `<div class="place-marker-pin" style="background:${meta.color}"><span>${meta.emoji}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
  });

  return (
    <div className="place-page">
      <div className="place-page-header">
        <button className="link-button" onClick={goBack} title="Esc">
          ← Back to {city.cityLabel} map
        </button>
      </div>

      <div className="place-hero" style={{ borderColor: meta.color }}>
        <span className="place-emoji">{meta.emoji}</span>
        <div>
          <h1>{place.name}</h1>
          <div className="place-subline">
            {meta.label} · {place.neighborhood}
            {place.priceLevel ? ` · ${place.priceLevel}` : ""}
            {place.rating ? ` · ★ ${place.rating.toFixed(1)}` : ""}
          </div>
        </div>
      </div>

      <div className="place-actions">
        <button
          className={`visited-toggle${visited ? " visited" : ""}`}
          onClick={() => toggleVisited(place.id)}
        >
          {visited ? "✓ Visited" : "Mark as visited"}
        </button>
        <a className="directions-link" href={directionsUrl} target="_blank" rel="noreferrer noopener">
          Get directions →
        </a>
      </div>

      <WikiText text={place.wiki} />

      {place.address && (
        <p className="place-address">
          <strong>Address:</strong> {place.address}
        </p>
      )}

      <div className="place-tags">
        {place.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="place-minimap">
        <MapContainer
          center={[place.lat, place.lng]}
          zoom={15}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          className="minimap-container"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[place.lat, place.lng]} icon={icon} />
        </MapContainer>
      </div>
    </div>
  );
}
