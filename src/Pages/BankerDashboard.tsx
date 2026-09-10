import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function BankerDashboard() {
  const navigate = useNavigate();

  const kpis = [
    {
      title: "Active ATMs",
      value: "2,450",
      color: "#22C55E",
    },
    {
      title: "Cash Availability",
      value: "98.7%",
      color: "#3B82F6",
    },
    {
      title: "Forecast Accuracy",
      value: "96%",
      color: "#8B5CF6",
    },
    {
      title: "Critical Alerts",
      value: "12",
      color: "#EF4444",
    },
  ];

  return (
    <>

    <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 4,
    pb: 2,
    borderBottom: "1px solid #E5E7EB",
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      color: "#00175A",
    }}
  >
    📊 CashReady Operations Center
  </Typography>

  <Box
    sx={{
      display: "flex",
      gap: 2,
    }}
  >
    <Button onClick={() => navigate("/banker-dashboard")}>
      Dashboard
    </Button>

    <Button onClick={() => navigate("/map")}>
      ATM Locator
    </Button>

    <Button onClick={() => navigate("/forecast")}>
      Forecast
    </Button>

    <Button onClick={() => navigate("/analytics")}>
      Analytics
    </Button>

    <Button onClick={() => navigate("/reports")}>
      Reports
    </Button>
  </Box>
  
</Box>
    <Box
      sx={{
        p: 3,
        bgcolor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* PAGE TITLE */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#00175A",
          mb: 3,
        }}
      >
        📊 CashReady Operations Center
      </Typography>

      {/* KPI CARDS */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: 3,
        }}
      >
        {kpis.map((item) => (
          <Card
            key={item.title}
            sx={{
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "#64748B",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* OPERATIONS SECTION */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 3,
          mt: 4,
        }}
      >
        {/* ATM MAP */}

        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            🗺 Live ATM Network
          </Typography>

          <Box
            sx={{
              mt: 2,
              height: 400,
              borderRadius: 3,
              background:
                "linear-gradient(135deg,#CBD5E1,#E2E8F0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">
              ATM Map Integration Area
            </Typography>
          </Box>
        </Card>

        {/* AI FORECAST */}

        <Card
          sx={{
            borderRadius: 4,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            🤖 AI Forecast Engine
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography color="text.secondary">
              Tomorrow Cash Demand
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#00175A",
              }}
            >
              ₹4.8 Cr
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography color="text.secondary">
              Refill Recommendation
            </Typography>

            <Typography
              sx={{
                color: "#22C55E",
                fontWeight: 700,
                mt: 1,
              }}
            >
              18 ATMs Require Refill
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography color="text.secondary">
              Risk Level
            </Typography>

            <Typography
              sx={{
                color: "#F59E0B",
                fontWeight: 700,
                mt: 1,
              }}
            >
              Moderate
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* ALERTS + ANALYTICS */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          mt: 4,
        }}
      >
        {/* ALERTS */}

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            ⚠ Cash Risk Alerts
          </Typography>

          {[
            "ATM-101 Cash Below Threshold",
            "ATM-204 Refill Required",
            "ATM-315 Forecast Variance High",
            "ATM-442 Cash Out Risk",
          ].map((alert) => (
            <Box
              key={alert}
              sx={{
                p: 2,
                mb: 1,
                borderRadius: 2,
                bgcolor: "#FEF2F2",
              }}
            >
              <Typography>{alert}</Typography>
            </Box>
          ))}
        </Card>

        {/* ANALYTICS */}

        <Card
          sx={{
            p: 3,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 700,
            }}
          >
            📈 Banking Analytics
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography>
              Monthly Savings
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "#22C55E",
                fontWeight: 700,
              }}
            >
              $1.2M
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography>
              Forecast Accuracy
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "#8B5CF6",
                fontWeight: 700,
              }}
            >
              96%
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              bgcolor: "#00175A",
            }}
          >
            View Full Report
          </Button>
        </Card>
      </Box>

      {/* ATM HEALTH */}

      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 700,
          }}
        >
          ✅ ATM Health Monitoring
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 2,
          }}
        >
          {[
            "ATM-101",
            "ATM-204",
            "ATM-315",
            "ATM-442",
            "ATM-518",
            "ATM-697",
          ].map((atm) => (
            <Card
              key={atm}
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#F0FDF4",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                }}
              >
                {atm}
              </Typography>

              <Typography
                sx={{
                  color: "#22C55E",
                }}
              >
                Online
              </Typography>
            </Card>
          ))}
        </Box>
      </Card>
    </Box>
    </>
  );
}