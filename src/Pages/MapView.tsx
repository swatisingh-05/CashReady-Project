import {
  Box,
  Button,
  Card,
  Typography,
  Chip,
} from "@mui/material";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

export default function MapView() {
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
          gridTemplateColumns: "350px 1fr",
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
            🏧 HDFC ATM
          </Typography>

          <Typography sx={{ mt: 1 }}>
            Connaught Place
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Distance: 0.8 KM
          </Typography>

          <Typography sx={{ mt: 1 }}>
            ETA: 4 Minutes
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
              label="AI Score 96%"
              color="success"
            />

            <Chip
              label="Cash Available"
              color="primary"
            />
          </Box>

          <Card
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#EEF5FF",
            }}
          >
            <Typography
            sx={{
             fontWeight: "bold",
    }}
               >
  🤖 AI Advice
</Typography>

            <Typography sx={{ mt: 1 }}>
              This ATM has the highest
              probability of fulfilling
              your ₹50,000 request.
            </Typography>
          </Card>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              background:
                "linear-gradient(135deg,#00175A,#006FCF)",
            }}
          >
            Start Navigation
          </Button>
        </Card>

        {/* Real Map */}
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
          }}
        >
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={13}
            style={{
              height: "600px",
              width: "100%",
              borderRadius: "16px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Current Location */}
            <Marker position={[28.6139, 77.209]}>
              <Popup>
                📍 Current Location
              </Popup>
            </Marker>

            {/* ATM */}
            <Marker position={[28.6328, 77.2197]}>
              <Popup>
                🏧 HDFC ATM
                <br />
                Cash Available
              </Popup>
            </Marker>
          </MapContainer>
        </Card>
      </Box>
    </Box>
  );
}