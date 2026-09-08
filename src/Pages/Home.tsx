import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Coordinates = [number, number];

type NearbyAtm = {
  id: number;
  name: string;
  location: Coordinates;
  operator?: string;
};

type CashStatus = {
  available: boolean | null;
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

function formatDistance(distance: number) {
  return distance < 1
    ? `${Math.max(0.1, Math.round(distance * 10) / 10)} KM`
    : `${Math.round(distance * 10) / 10} KM`;
}

export default function Home() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [nearbyAtms, setNearbyAtms] = useState<NearbyAtm[]>([]);
  const [locationStatus, setLocationStatus] = useState("Finding your location...");
  const [dataStatus, setDataStatus] = useState("Loading live ATM data...");
  const [recommendedDistance, setRecommendedDistance] = useState("Calculating...");
  const [cashAvailability, setCashAvailability] = useState("Loading...");
  const recommendedAtm = nearbyAtms[0] ?? null;

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("GPS unavailable");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setCurrentLocation([coords.latitude, coords.longitude]);
        setLocationStatus("Live location enabled");
      },
      () => setLocationStatus("Location permission unavailable"),
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 10000 },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!currentLocation) return;

    const controller = new AbortController();
    const [latitude, longitude] = currentLocation;
    const query = `[out:json][timeout:15];node[amenity=atm](around:5000,${latitude},${longitude});out;`;
    const endpoints = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://overpass.private.coffee/api/interpreter",
    ];

    setDataStatus("Refreshing live ATM data...");

    const loadAtms = async () => {
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
              (first, second) =>
                distanceInKm(first.location, currentLocation) -
                distanceInKm(second.location, currentLocation),
            );

          setNearbyAtms(atms);
          setDataStatus(`${atms.length} nearby ATM${atms.length === 1 ? "" : "s"} found`);
          return;
        }
      } catch (error) {
        if (controller.signal.aborted) return;
      }

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            body: query,
            headers: { "Content-Type": "text/plain" },
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(8000),
            ]),
          });
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
              (first, second) =>
                distanceInKm(first.location, currentLocation) -
                distanceInKm(second.location, currentLocation),
            );

          setNearbyAtms(atms);
          setDataStatus(`${atms.length} nearby ATM${atms.length === 1 ? "" : "s"} found`);
          return;
        } catch (error) {
          if (controller.signal.aborted) return;
        }
      }

      setNearbyAtms([]);
      setDataStatus("Live ATM data unavailable");
    };

    void loadAtms();
    return () => controller.abort();
  }, [currentLocation]);

  useEffect(() => {
    if (!currentLocation || !recommendedAtm) {
      setRecommendedDistance("Unavailable");
      return;
    }

    const controller = new AbortController();
    const [currentLatitude, currentLongitude] = currentLocation;
    const [atmLatitude, atmLongitude] = recommendedAtm.location;
    setRecommendedDistance("Calculating road distance...");

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${currentLongitude},${currentLatitude};${atmLongitude},${atmLatitude}?overview=false`,
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
      .then((data: { routes?: Array<{ distance: number }> }) => {
        const route = data.routes?.[0];
        if (route) setRecommendedDistance(formatDistance(route.distance / 1000));
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setRecommendedDistance("Route unavailable");
        }
      });

    return () => controller.abort();
  }, [currentLocation, recommendedAtm]);

  useEffect(() => {
    if (!recommendedAtm) {
      setCashAvailability("Unavailable");
      return;
    }

    const controller = new AbortController();
    const [latitude, longitude] = recommendedAtm.location;

    fetch(`/api/atm-status?lat=${latitude}&lon=${longitude}&radius=5000`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data: CashStatus) => {
        setCashAvailability(
          data.available === true
            ? "Available"
            : data.available === false
              ? "Unavailable"
              : "Provider needed",
        );
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setCashAvailability("API offline");
      });

    return () => controller.abort();
  }, [recommendedAtm]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F5F7FA",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#00175A",
          }}
        >
          💵 CashReady
        </Typography>

        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#94A3B8",
          }}
        >
          Welcome, Shivam 👋
        </Typography>
      </Box>

      <Card
        sx={{
          p: 5,
          borderRadius: 6,
          background:
            "linear-gradient(135deg,#00175A,#006FCF)",
          color: "white",
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              Never Visit an
              <br />
              Empty ATM Again
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Find Cash Before You Chase Cash
            </Typography>

            <Typography sx={{ mt: 4 }}>
              Daily Withdrawal Limit
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
              }}
            >
              ₹75,000
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                background: "white",
                color: "#00175A",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/search")}
            >
              FIND NEARBY ATMS
            </Button>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              minWidth: 250,
            }}
          >
            <Typography
              sx={{
                fontSize: "120px",
              }}
            >
              🏧
            </Typography>

            <Typography variant="h5">
              AI Powered ATM Discovery
            </Typography>
          </Box>
        </Box>
      </Card>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          mb: 4,
        }}
      >
        <Card sx={{ p: 3, flex: 1 }}>
          <Typography color="gray">
            Nearby ATMs (live)
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#00175A",
            }}
          >
            {nearbyAtms.length || (dataStatus.includes("unavailable") ? "--" : "...")}
          </Typography>
        </Card>

        <Card sx={{ p: 3, flex: 1 }}>
          <Typography color="gray">
            Live ATM data
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#16A34A",
            }}
          >
            {nearbyAtms.length ? "LIVE" : "--"}
          </Typography>
        </Card>

        <Card sx={{ p: 3, flex: 1 }}>
          <Typography color="gray">
            Cash availability
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            {cashAvailability}
          </Typography>
        </Card>
      </Box>

      <Card
        sx={{
          p: 4,
          borderRadius: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#00175A",
          }}
        >
          📍 Live ATM Recommendation
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Recommended ATM
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          🏧 {recommendedAtm?.name ?? dataStatus}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          {recommendedAtm?.operator ?? locationStatus}
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            fontWeight: "bold",
          }}
        >
          Distance: {recommendedDistance}
        </Typography>
      </Card>
    </Box>
  );
}