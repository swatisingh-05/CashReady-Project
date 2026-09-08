import {
  Box,
  Button,
  Card,
  Typography,
  Chip,
} from "@mui/material";

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
            <Typography fontWeight="bold">
              🤖 AI Advice
            </Typography>

            <Typography sx={{ mt: 1 }}>
              This ATM has the highest probability
              of fulfilling your ₹50,000 request.
            </Typography>
          </Card>

          <Card
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#F8FAFC",
            }}
          >
            <Typography fontWeight="bold">
              📍 Route Summary
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Current Location: Rajiv Chowk
            </Typography>

            <Typography>
              Destination: HDFC ATM
            </Typography>

            <Typography>
              Route Distance: 0.8 KM
            </Typography>

            <Typography>
              Travel Time: 4 Minutes
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

        {/* Map Area */}
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
          }}
        >
          <Box
            sx={{
              height: "600px",
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#DCEEFF",

              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.6) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  rgba(255,255,255,0.6) 1px,
                  transparent 1px
                )
              `,

              backgroundSize: "50px 50px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                fontWeight: "bold",
                color: "#00175A",
              }}
            >
              📍 Current Location
            </Typography>

            <Typography
              sx={{
                position: "absolute",
                top: 120,
                right: 100,
                fontWeight: "bold",
                color: "#DC2626",
              }}
            >
              🏧 HDFC ATM
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#00175A",
              }}
            >
              🗺 Smart Route Visualization
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}