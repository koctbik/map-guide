import { listCities } from "../data/cities";

interface Props {
  cityId: string;
  onChange: (id: string) => void;
}

export default function CitySwitcher({ cityId, onChange }: Props) {
  return (
    <select className="city-switcher" value={cityId} onChange={(e) => onChange(e.target.value)}>
      {listCities().map((city) => (
        <option key={city.city} value={city.city}>
          {city.cityLabel}
          {city.comingSoon ? " (coming soon)" : ""}
        </option>
      ))}
    </select>
  );
}
