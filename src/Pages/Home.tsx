import {
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#16324F,#0F766E)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Card
        sx={{
          width: 900,
          p: 6,
          borderRadius: 6,
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(8, 25, 92, 0.28)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#16324F",
          }}
        >
          💵 CashReady
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: "#64748B",
            fontSize: 20,
          }}
        >
          Never Visit an Empty ATM Again
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 4,
            mt: 6,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              width: 300,
              p: 4,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1">👤</Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#16324F" }}
            >
              Customer Portal
            </Typography>

            <Typography sx={{ mt: 2, color: "#475569", minHeight: 72 }}>
              Find nearby ATMs capable of fulfilling your withdrawal request.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background: "linear-gradient(135deg,#16324F,#0F766E)",
                borderRadius: 2,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/search")}
            >
              Enter Customer Portal
            </Button>
          </Card>

          <Card
            sx={{
              width: 300,
              p: 4,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1">🏦</Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#16324F" }}
            >
              Banker Portal
            </Typography>

            <Typography sx={{ mt: 2, color: "#475569", minHeight: 72 }}>
              Monitor ATM health, forecast cash availability and manage operations.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                background: "linear-gradient(135deg,#16324F,#0F766E)",
                borderRadius: 2,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/banker-dashboard")}
            >
              Enter Banker Portal
            </Button>
          </Card>
        </Box>
      </Card>
    </Box>
  );
}