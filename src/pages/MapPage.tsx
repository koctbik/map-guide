import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MapView from "../components/MapView";
import CategoryFilter from "../components/CategoryFilter";
import CitySwitcher from "../components/CitySwitcher";
import { getCity } from "../data/cities";
import { useVisited } from "../state/useVisited";
import { ALL_CATEGORIES, CATEGORY_META } from "../categoryMeta";
import type { Category } from "../types";

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cityId = searchParams.get("city") || "istanbul";
  const navigate = useNavigate();

  const city = getCity(cityId);
  const { isVisited, toggleVisited } = useVisited();

  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(ALL_CATEGORIES),
  );
  const [visitedFilter, setVisitedFilter] = useState<"all" | "visited" | "unvisited">("all");
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);

  const places = useMemo(() => {
    return city.places.filter((p) => {
      if (!activeCategories.has(p.category)) return false;
      if (visitedFilter === "visited" && !isVisited(p.id)) return false;
      if (visitedFilter === "unvisited" && isVisited(p.id)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.neighborhood.toLowerCase().includes(q) &&
          !p.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [city.places, activeCategories, visitedFilter, query, isVisited]);

  const visitedCount = city.places.filter((p) => isVisited(p.id)).length;

  function toggleCategory(cat: Category) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function handleCityChange(id: string) {
    setSearchParams({ city: id });
    setFlyTo(null);
  }

  return (
    <div className="map-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Istanbul & Beyond</h1>
          <CitySwitcher cityId={cityId} onChange={handleCityChange} />
        </div>

        {city.comingSoon ? (
          <div className="coming-soon">
            {city.cityLabel} places are coming soon. Switch back to Istanbul for now.
          </div>
        ) : (
          <>
            <input
              className="search-input"
              placeholder="Search places, neighborhoods, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <CategoryFilter
              active={activeCategories}
              onToggle={toggleCategory}
              onReset={() => setActiveCategories(new Set(ALL_CATEGORIES))}
            />

            <div className="visited-filter">
              <button
                className={visitedFilter === "all" ? "active" : ""}
                onClick={() => setVisitedFilter("all")}
              >
                All
              </button>
              <button
                className={visitedFilter === "unvisited" ? "active" : ""}
                onClick={() => setVisitedFilter("unvisited")}
              >
                Not yet visited
              </button>
              <button
                className={visitedFilter === "visited" ? "active" : ""}
                onClick={() => setVisitedFilter("visited")}
              >
                Visited
              </button>
              <span className="visited-count">
                {visitedCount}/{city.places.length} visited
              </span>
            </div>

            <ul className="place-list">
              {places.map((p) => {
                const meta = CATEGORY_META[p.category];
                const visited = isVisited(p.id);
                return (
                  <li key={p.id} className={visited ? "visited" : ""}>
                    <button
                      className="place-list-item"
                      onClick={() => setFlyTo([p.lat, p.lng])}
                    >
                      <span className="dot" style={{ background: meta.color }}>
                        {meta.emoji}
                      </span>
                      <span className="place-list-text">
                        <strong>{p.name}</strong>
                        <small>
                          {p.neighborhood}
                          {p.rating ? ` · ★ ${p.rating.toFixed(1)}` : ""}
                        </small>
                      </span>
                      {visited && <span className="check">✓</span>}
                    </button>
                    <div className="place-list-actions">
                      <button onClick={() => navigate(`/place/${cityId}/${p.id}`)}>
                        Wiki page
                      </button>
                      <button onClick={() => toggleVisited(p.id)}>
                        {visited ? "Unmark" : "Mark visited"}
                      </button>
                    </div>
                  </li>
                );
              })}
              {places.length === 0 && <li className="empty">No places match your filters.</li>}
            </ul>
          </>
        )}
      </aside>

      <main className="map-area">
        <MapView
          key={cityId}
          center={city.center}
          places={places}
          isVisited={isVisited}
          flyToCenter={flyTo}
          cityId={cityId}
        />
      </main>
    </div>
  );
}
