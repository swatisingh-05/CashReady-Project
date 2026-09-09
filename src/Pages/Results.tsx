import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Coordinates = [number, number];

type AtmResult = {
  id: number;
  name: string;
  location: Coordinates;
  operator?: string;
  distance: string;
};

function distanceInKm(from: Coordinates, to: Coordinates) {
  const latitudeDelta = ((to[0] - from[0]) * Math.PI) / 180;
  const longitudeDelta = ((to[1] - from[1]) * Math.PI) / 180;
  const latitudeOne = (from[0] * Math.PI) / 180;
  const latitudeTwo = (to[0] * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.sin(longitudeDelta / 2) ** 2 *
      Math.cos(latitudeOne) *
      Math.cos(latitudeTwo);

  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function formatDistance(distanceKm: number) {
  return distanceKm < 1
    ? `${Math.max(0.1, Math.round(distanceKm * 10) / 10)} KM`
    : `${Math.round(distanceKm * 10) / 10} KM`;
}

async function getRoadDistance(
  from: Coordinates,
  to: Coordinates,
  signal: AbortSignal,
) {
  const [fromLatitude, fromLongitude] = from;
  const [toLatitude, toLongitude] = to;
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}?overview=false`,
    {
      signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
    },
  );
  if (!response.ok) throw new Error("Route service unavailable");

  const data: { routes?: Array<{ distance: number }> } = await response.json();
  return data.routes?.[0]?.distance;
}

export default function Results() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [atms, setAtms] = useState<AtmResult[]>([]);
  const [status, setStatus] = useState("Finding nearby ATMs...");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("GPS unavailable");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => setCurrentLocation([coords.latitude, coords.longitude]),
      () => setStatus("Location permission unavailable"),
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const controller = new AbortController();
    const [latitude, longitude] = currentLocation;
    const west = longitude - 0.06;
    const east = longitude + 0.06;
    const south = latitude - 0.06;
    const north = latitude + 0.06;

    setStatus("Loading live ATM data...");

    const loadAtms = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&q=ATM&limit=20&viewbox=${west},${north},${east},${south}&bounded=1`,
          {
            headers: { Accept: "application/json" },
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(10000),
            ]),
          },
        );

        if (!response.ok) throw new Error("ATM lookup unavailable");

        const places: Array<{
          place_id: number;
          lat: string;
          lon: string;
          display_name: string;
        }> = await response.json();
        const results = places
          .map((place) => {
            const location: Coordinates = [Number(place.lat), Number(place.lon)];
            return {
              id: place.place_id,
              name: place.display_name.split(",")[0] || "Nearby ATM",
              location,
              operator: place.display_name,
              distance: formatDistance(distanceInKm(currentLocation, location)),
            };
          })
          .sort(
            (first, second) =>
              distanceInKm(currentLocation, first.location) -
              distanceInKm(currentLocation, second.location),
          );

        setAtms(results);
        setStatus(`${results.length} live ATM${results.length === 1 ? "" : "s"} found`);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAtms([]);
          setStatus("Live ATM data unavailable");
        }
      }
    };

    void loadAtms();
    return () => controller.abort();
  }, [currentLocation]);

  useEffect(() => {
    if (!currentLocation || !atms.length) return;

    const controller = new AbortController();
    const updateDistances = async () => {
      const updated = await Promise.all(
        atms.map(async (atm) => {
          try {
            const distance = await getRoadDistance(
              currentLocation,
              atm.location,
              controller.signal,
            );
            return distance === undefined
              ? { ...atm, distance: "Route unavailable" }
              : { ...atm, distance: formatDistance(distance / 1000) };
          } catch (error) {
            return (error as Error).name === "AbortError"
              ? atm
              : { ...atm, distance: "Route unavailable" };
          }
        }),
      );

      if (!controller.signal.aborted) {
        setAtms(
          updated.sort((first, second) => {
            if (first.distance === "Route unavailable") return 1;
            if (second.distance === "Route unavailable") return -1;
            return parseFloat(first.distance) - parseFloat(second.distance);
          }),
        );
      }
    };

    void updateDistances();
    return () => controller.abort();
  }, [currentLocation, atms.length]);

  const recommendedAtm = atms[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F5F7FA",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#16324F",
          mb: 4,
        }}
      >
        📍 Live Nearby ATMs
      </Typography>

      <Card
        sx={{
          p: 4,
          borderRadius: 5,
          background: "linear-gradient(135deg,#16324F,#0F766E)",
          color: "white",
          mb: 4,
        }}
      >
        <Typography variant="h6">📍 NEAREST LIVE ATM</Typography>

        <Typography variant="h3" sx={{ mt: 2, fontWeight: "bold" }}>
          🏧 {recommendedAtm?.name ?? status}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          {recommendedAtm?.operator ?? "OpenStreetMap location"}
        </Typography>

        <Typography sx={{ mt: 3 }}>Live data status</Typography>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {recommendedAtm ? "LIVE" : "--"}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Distance: {recommendedAtm?.distance ?? "Unavailable"}
        </Typography>

        <Typography>Cash availability requires a provider API</Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            background: "white",
            color: "#16324F",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/map")}
        >
          Navigate Now
        </Button>
      </Card>

      <Typography
        variant="h5"
        sx={{ color: "#16324F", fontWeight: "bold", mb: 3 }}
      >
        {atms.length} Nearby ATMs Found
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {atms.slice(1, 4).map((atm, index) => (
          <Card
            key={atm.id}
            sx={{
              width: 320,
              p: 3,
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-6px)" },
            }}
          >
            <Chip
              label={index === 0 ? "Next nearest" : "Nearby"}
              color="success"
              sx={{ mb: 2 }}
            />

            <Typography sx={{ fontWeight: "bold", color: "#16324F" }}>
              #{index + 2}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              🏧 {atm.name}
            </Typography>

            <Typography>{atm.operator ?? "OpenStreetMap location"}</Typography>

            <Typography sx={{ mt: 2 }}>Distance: {atm.distance}</Typography>

            <Typography sx={{ mt: 1, color: "#16A34A", fontWeight: "bold" }}>
              Live location data
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Cash availability requires a provider API
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background: "linear-gradient(135deg,#16324F,#0F766E)",
              }}
              onClick={() => navigate("/map")}
            >
              Navigate
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
