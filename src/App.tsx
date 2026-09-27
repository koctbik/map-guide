import { HashRouter, Route, Routes } from "react-router-dom";
import MapPage from "./pages/MapPage";
import PlacePage from "./pages/PlacePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/place/:cityId/:placeId" element={<PlacePage />} />
      </Routes>
    </HashRouter>
  );
}
