import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SearchATM from "./Pages/SearchATM";
import Results from "./Pages/Results";
import MapView from "./Pages/MapView";
import BankerDashboard from "./Pages/BankerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login/customer"
          element={<Login role="customer" />}
        />

        <Route
          path="/login/banker"
          element={<Login role="banker" />}
        />

        <Route
          path="/customer-dashboard"
          element={<SearchATM />}
        />

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