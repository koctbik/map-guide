# map-guide

A personal wiki-meets-map for places to visit in Istanbul (and eventually other Turkish cities). Browse a map or a filterable list, open a wiki-style page for any place, and mark it as visited — all tracked locally in your browser.

## Features

- Map view (OpenStreetMap/Leaflet) with category-colored pins for historical sites, mosques, museums, palaces, hamams, breakfast spots, cafes, restaurants, bars, viewpoints, markets, and parks
- Wiki page per place with background, practical tips, address, tags, a mini-map, and a directions link
- "Mark as visited" tracking, persisted in `localStorage`
- Search and category/visited filters
- City switcher, ready to extend to more cities (e.g. Izmir) by adding another data file under `src/data/cities`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Deployed automatically to GitHub Pages on every push to `main` via GitHub Actions.
