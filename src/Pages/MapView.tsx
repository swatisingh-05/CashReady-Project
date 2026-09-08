import {
  Box,
  Button,
  Card,
  Typography,
  Chip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coordinates = [number, number];

type NearbyAtm = {
  id: number;
  name: string;
  location: Coordinates;
  operator?: string;
};

type RouteSummary = {
  distance: string;
  duration: string;
};

type CashStatus = {
  available: boolean | null;
  status: string;
  lastUpdated: string | null;
  source: string;
  message?: string;
};

const fallbackLocation: Coordinates = [28.6328, 77.2197];

function straightLineDistanceKm(from: Coordinates, to: Coordinates) {
  const earthRadiusKm = 6371;
  const latitudeDelta = ((to[0] - from[0]) * Math.PI) / 180;
  const longitudeDelta = ((to[1] - from[1]) * Math.PI) / 180;
  const latitudeOne = (from[0] * Math.PI) / 180;
  const latitudeTwo = (to[0] * Math.PI) / 180;
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.sin(longitudeDelta / 2) ** 2 *
      Math.cos(latitudeOne) *
      Math.cos(latitudeTwo);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function formatDistance(distanceKm: number) {
  return distanceKm < 1
    ? `${Math.max(0.1, Math.round(distanceKm * 10) / 10)} KM`
    : `${Math.round(distanceKm * 10) / 10} KM`;
}

function formatDuration(durationMinutes: number) {
  if (durationMinutes < 1) return "Less than 1 Minute";
  return `${Math.round(durationMinutes)} Minute${Math.round(durationMinutes) === 1 ? "" : "s"}`;
}

function distanceFromCurrentLocation(atm: NearbyAtm, currentLocation: Coordinates) {
  return straightLineDistanceKm(currentLocation, atm.location);
}

const markerIcon = L.icon({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function NavigationController({
  navigationStarted,
  currentLocation,
  selectedAtm,
  routePath,
}: {
  navigationStarted: boolean;
  currentLocation: Coordinates;
  selectedAtm: NearbyAtm | null;
  routePath: Coordinates[];
}) {
  const map = useMap();
  const [currentLatitude, currentLongitude] = currentLocation;
  const atmLatitude = selectedAtm?.location[0];
  const atmLongitude = selectedAtm?.location[1];

  useEffect(() => {
    if (navigationStarted && atmLatitude !== undefined && atmLongitude !== undefined) {
      map.fitBounds(
        L.latLngBounds(
          routePath.length
            ? routePath
            : [
                [currentLatitude, currentLongitude],
                [atmLatitude, atmLongitude],
              ],
        ),
        {
          padding: [48, 48],
          maxZoom: 16,
        },
      );
    }
  }, [
    atmLatitude,
    atmLongitude,
    currentLatitude,
    currentLongitude,
    map,
    navigationStarted,
    routePath,
  ]);

  useEffect(() => {
    if (!navigationStarted) {
      map.setView(currentLocation);
    }
  }, [currentLocation, map, navigationStarted]);

  return null;
}

export default function MapView() {
  const navigate = useNavigate();
  const [navigationStarted, setNavigationStarted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>(
    fallbackLocation,
  );
  const [nearbyAtms, setNearbyAtms] = useState<NearbyAtm[]>([]);
  const [locationStatus, setLocationStatus] = useState(
    "Finding your location...",
  );
  const [atmStatus, setAtmStatus] = useState("Loading nearby ATMs...");
  const [routeSummary, setRouteSummary] = useState<RouteSummary>({
    distance: "Calculating...",
    duration: "Calculating...",
  });
  const [cashStatus, setCashStatus] = useState<CashStatus>({
    available: null,
    status: "loading",
    lastUpdated: null,
    source: "cashready-api",
  });
  const [routePath, setRoutePath] = useState<Coordinates[]>([]);
  const lastFetchedLocation = useRef<Coordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("GPS unavailable; showing Delhi demo location");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setCurrentLocation([coords.latitude, coords.longitude]);
        setLocationStatus("Live location enabled");
      },
      () => {
        setLocationStatus("Location permission unavailable; showing demo location");
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const previousLocation = lastFetchedLocation.current;
    const movedLatitude = previousLocation
      ? Math.abs(previousLocation[0] - currentLocation[0])
      : 1;
    const movedLongitude = previousLocation
      ? Math.abs(previousLocation[1] - currentLocation[1])
      : 1;

    if (movedLatitude < 0.002 && movedLongitude < 0.002) return;

    const controller = new AbortController();
    const [latitude, longitude] = currentLocation;
    const query = `[out:json][timeout:15];node[amenity=atm](around:5000,${latitude},${longitude});out;`;
    const endpoints = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
    ];

    setNearbyAtms([]);
    setAtmStatus("Refreshing nearby ATMs...");
    lastFetchedLocation.current = currentLocation;

    const loadNearbyAtms = async () => {
      try {
        const west = longitude - 0.06;
        const east = longitude + 0.06;
        const south = latitude - 0.06;
        const north = latitude + 0.06;
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
        if (response.ok) {
          const places: Array<{
            place_id: number;
            lat: string;
            lon: string;
            display_name: string;
          }> = await response.json();
          const atms = places
            .map((place) => ({
              id: place.place_id,
              name: place.display_name.split(",")[0] || "Nearby ATM",
              location: [Number(place.lat), Number(place.lon)] as Coordinates,
              operator: place.display_name,
            }))
            .sort(
              (firstAtm, secondAtm) =>
                distanceFromCurrentLocation(firstAtm, currentLocation) -
                distanceFromCurrentLocation(secondAtm, currentLocation),
            );
          setNearbyAtms(atms);
          setAtmStatus(`${atms.length} nearby ATM${atms.length === 1 ? "" : "s"} found`);
          return;
        }
      } catch (error) {
        if (controller.signal.aborted) return;
      }

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(
            endpoint,
            {
              method: "POST",
              body: query,
              headers: { "Content-Type": "text/plain" },
              signal: AbortSignal.any([
                controller.signal,
                AbortSignal.timeout(8000),
              ]),
            },
          );
          if (!response.ok) continue;

          const data: {
            elements?: Array<{
              id: number;
              lat: number;
              lon: number;
              tags?: Record<string, string>;
            }>;
          } = await response.json();
          const atms = (data.elements ?? [])
            .map((element) => ({
              id: element.id,
              name: element.tags?.name ?? element.tags?.operator ?? "Nearby ATM",
              location: [element.lat, element.lon] as Coordinates,
              operator: element.tags?.operator,
            }))
            .sort(
              (firstAtm, secondAtm) =>
                distanceFromCurrentLocation(firstAtm, currentLocation) -
                distanceFromCurrentLocation(secondAtm, currentLocation),
            );

          setNearbyAtms(atms);
          setAtmStatus(
            atms.length
              ? `${atms.length} nearby ATM${atms.length === 1 ? "" : "s"} found`
              : "No mapped ATMs found within 5 km",
          );
          return;
        } catch (error) {
          if (controller.signal.aborted) return;
        }
      }

      setAtmStatus("Live ATM service unavailable; no ATM data returned");
    };

    void loadNearbyAtms();

    return () => controller.abort();
  }, [currentLocation]);

  const selectedAtm = nearbyAtms[0] ?? null;

  useEffect(() => {
    if (!selectedAtm) {
      setCashStatus({
        available: null,
        status: "unavailable",
        lastUpdated: null,
        source: "no-atm-selected",
      });
      return;
    }

    const controller = new AbortController();
    const [latitude, longitude] = selectedAtm.location;

    fetch(`/api/atm-status?lat=${latitude}&lon=${longitude}&radius=5000`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: CashStatus) => setCashStatus(data))
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setCashStatus({
            available: null,
            status: "unavailable",
            lastUpdated: null,
            source: "cashready-api",
            message: "Start the CashReady API server to load cash status.",
          });
        }
      });

    return () => controller.abort();
  }, [selectedAtm]);

  useEffect(() => {
    if (!selectedAtm) {
      setRoutePath([]);
      setRouteSummary({
        distance: "Unavailable",
        duration: "Unavailable",
      });
      return;
    }

    const controller = new AbortController();
    const [currentLatitude, currentLongitude] = currentLocation;
    const [atmLatitude, atmLongitude] = selectedAtm.location;
    setRoutePath([currentLocation, selectedAtm.location]);
    setRouteSummary({ distance: "Calculating...", duration: "Calculating..." });

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${currentLongitude},${currentLatitude};${atmLongitude},${atmLatitude}?overview=full&geometries=geojson`,
      {
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(10000),
        ]),
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error("Route service unavailable");
        return response.json();
      })
      .then((data: {
        routes?: Array<{
          distance: number;
          duration: number;
          geometry?: { coordinates: Array<[number, number]> };
        }>;
      }) => {
        const route = data.routes?.[0];
        if (!route) return;

        if (route.geometry?.coordinates.length) {
          setRoutePath(
            route.geometry.coordinates.map(
              ([longitude, latitude]) => [latitude, longitude],
            ),
          );
        }

        setRouteSummary({
          distance: formatDistance(route.distance / 1000),
          duration: formatDuration(route.duration / 60),
        });
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setRouteSummary({
            distance: "Route unavailable",
            duration: "Unavailable",
          });
        }
      });

    return () => controller.abort();
  }, [currentLocation, selectedAtm]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#00175A",
          mb: 4,
        }}
      >
        🗺 ATM Navigation Intelligence
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "350px 1fr" },
          gap: 3,
        }}
      >
        {/* Left Panel */}
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#00175A",
            }}
          >
            Selected ATM
          </Typography>

          <Typography sx={{ mt: 2 }}>
            🏧 {selectedAtm?.name ?? "Searching nearby ATMs..."}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            {selectedAtm?.operator ?? "Live OpenStreetMap data"}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Distance: {routeSummary.distance}
          </Typography>

          <Typography sx={{ mt: 1 }}>
            ETA: {routeSummary.duration}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            <Chip
              label="Location verified"
              color="success"
            />

            <Chip
              label={
                cashStatus.available === true
                  ? "Cash available"
                  : cashStatus.available === false
                    ? "Cash unavailable"
                    : "Cash status unavailable"
              }
              color={cashStatus.available === true ? "success" : "warning"}
            />
          </Box>

          <Card
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#EEF5FF",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              🤖 AI Advice
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {cashStatus.available === true
                ? "The configured provider reports cash is available."
                : cashStatus.available === false
                  ? "The configured provider reports this ATM is out of cash."
                  : cashStatus.message ??
                    "Cash availability requires a configured bank or ATM-network API."}
            </Typography>

            {cashStatus.lastUpdated && (
              <Typography sx={{ mt: 1, color: "#64748B" }}>
                Provider updated: {new Date(cashStatus.lastUpdated).toLocaleString()}
              </Typography>
            )}
          </Card>

          <Card
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#F8FAFC",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              📍 Route Summary
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {locationStatus}
            </Typography>

            <Typography sx={{ mt: 1, color: "#64748B" }}>
              {atmStatus}
            </Typography>

            <Typography>
              Destination: {selectedAtm?.name ?? "No nearby ATM selected"}
            </Typography>

            <Typography>
              Route Distance: {routeSummary.distance}
            </Typography>

            <Typography>
              Travel Time: {routeSummary.duration}
            </Typography>
          </Card>

          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              navigate("/map");
              setNavigationStarted(true);
            }}
            sx={{
              mt: 3,
              background:
                "linear-gradient(135deg,#00175A,#006FCF)",
            }}
          >
            Start Navigation
          </Button>
        </Card>

        {/* Map Area */}
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
          }}
        >
          <MapContainer
            center={currentLocation}
            zoom={15}
            scrollWheelZoom
            style={{ height: "600px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={currentLocation} icon={markerIcon}>
              <Popup>📍 Your live location</Popup>
            </Marker>

            {nearbyAtms.map((atm) => (
              <Marker key={atm.id} position={atm.location} icon={markerIcon}>
                <Popup>
                  🏧 {atm.name}
                  {atm.operator ? ` (${atm.operator})` : ""}
                </Popup>
              </Marker>
            ))}

            {selectedAtm && (
              <Polyline
                positions={routePath}
                pathOptions={{ color: "#006FCF", weight: 5 }}
              />
            )}
            <NavigationController
              currentLocation={currentLocation}
              navigationStarted={navigationStarted}
              routePath={routePath}
              selectedAtm={selectedAtm}
            />
          </MapContainer>
        </Card>
      </Box>
    </Box>
  );
}