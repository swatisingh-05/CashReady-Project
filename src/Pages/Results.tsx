import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();

  const atms = [
    {
      rank: "#1",
      name: "HDFC ATM",
      location: "Connaught Place",
      distance: "0.8 KM",
      score: "96%",
      status: "Best Match",
    },
    {
      rank: "#2",
      name: "SBI ATM",
      location: "Rajiv Chowk",
      distance: "1.2 KM",
      score: "91%",
      status: "Recommended",
    },
    {
      rank: "#3",
      name: "ICICI ATM",
      location: "Barakhamba Road",
      distance: "1.8 KM",
      score: "87%",
      status: "Available",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#F5F7FA",
        p: 4,
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#00175A",
          mb: 4,
        }}
      >
        🤖 AI Recommended ATMs
      </Typography>

      {/* Hero Recommendation */}
      <Card
        sx={{
          p: 4,
          borderRadius: 5,
          background:
            "linear-gradient(135deg,#00175A,#006FCF)",
          color: "white",
          mb: 4,
        }}
      >
        <Typography variant="h6">
          🏆 BEST MATCH FOUND
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 2,
            fontWeight: "bold",
          }}
        >
          🏧 HDFC ATM
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Connaught Place
        </Typography>

        <Typography sx={{ mt: 3 }}>
          Success Probability
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
          }}
        >
          96%
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Distance: 0.8 KM
        </Typography>

        <Typography>
          Can Fulfil ₹50,000 Request
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 4,
            background: "white",
            color: "#00175A",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/map")}
        >
          Navigate Now
        </Button>
      </Card>

      {/* Eligible ATM Count */}
      <Typography
        variant="h5"
        sx={{
          color: "#00175A",
          fontWeight: "bold",
          mb: 3,
        }}
      >
        3 Eligible ATMs Found
      </Typography>

      {/* ATM Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {atms.map((atm) => (
          <Card
            key={atm.name}
            sx={{
              width: 320,
              p: 3,
              borderRadius: 4,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
              },
            }}
          >
            <Chip
              label={atm.status}
              color="success"
              sx={{ mb: 2 }}
            />

            <Typography
              sx={{
                fontWeight: "bold",
                color: "#00175A",
              }}
            >
              {atm.rank}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              🏧 {atm.name}
            </Typography>

            <Typography>
              {atm.location}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Distance: {atm.distance}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#16A34A",
                fontWeight: "bold",
              }}
            >
              AI Score: {atm.score}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              Can fulfil requested amount
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background:
                  "linear-gradient(135deg,#00175A,#006FCF)",
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