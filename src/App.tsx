import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import SearchATM from "./Pages/SearchATM";
import Results from "./Pages/Results";
import MapView from "./Pages/MapView";
import BankerDashboard from "./Pages/BankerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/search" element={<SearchATM />} />

        <Route path="/results" element={<Results />} />

        <Route path="/map" element={<MapView />} />

        <Route
          path="/banker-dashboard"
          element={<BankerDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;