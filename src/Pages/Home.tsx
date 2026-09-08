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
            Nearby Eligible ATMs
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#00175A",
            }}
          >
            24
          </Typography>
        </Card>

        <Card sx={{ p: 3, flex: 1 }}>
          <Typography color="gray">
            Success Rate
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#16A34A",
            }}
          >
            96%
          </Typography>
        </Card>

        <Card sx={{ p: 3, flex: 1 }}>
          <Typography color="gray">
            AI Accuracy
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2563EB",
            }}
          >
            94%
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
          🤖 AI Recommendation
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Recommended ATM
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          🏧 HDFC ATM - Connaught Place
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Distance: 0.8 KM
        </Typography>

        <Typography
          sx={{
            color: "#16A34A",
            fontWeight: "bold",
          }}
        >
          Success Probability: 96%
        </Typography>
      </Card>
    </Box>
  );
}