import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [loginMenuAnchor, setLoginMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleLoginMenuClose = () => {
    setLoginMenuAnchor(null);
  };

  const kpis = [
    { title: "ATMs Monitored", value: "2,450" },
    { title: "Cash Availability", value: "98.7%" },
    { title: "Forecast Accuracy", value: "96%" },
    { title: "Monthly Savings", value: "$1.2M" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <Box
        sx={{
          bgcolor: "#001B6E",
          color: "#fff",
          px: 4,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>
          AI Powered ATM Banking Platform
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Support | Locate ATM</Typography>
          <Button
            size="small"
            onClick={(event) =>
              setLoginMenuAnchor(event.currentTarget)
            }
            sx={{
              ml: 1,
              minWidth: "auto",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* HEADER */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#001B6E",
        }}
      >
        <Toolbar
          sx={{
            py: 2,
            gap: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              minWidth: 250,
            }}
          >
            🏦 CashReady
          </Typography>

          <TextField
            fullWidth
            placeholder="What are you looking for today?"
          />

          <Button
            variant="contained"
            id="login-button"
            aria-controls={
              loginMenuAnchor ? "login-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={loginMenuAnchor ? "true" : undefined}
            onClick={(event) =>
              setLoginMenuAnchor(event.currentTarget)
            }
            sx={{
              bgcolor: "#001B6E",
              px: 4,
              py: 1.5,
              borderRadius: 3,
            }}
          >
            Login
          </Button>

          <Menu
            id="login-menu"
            anchorEl={loginMenuAnchor}
            open={Boolean(loginMenuAnchor)}
            onClose={handleLoginMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleLoginMenuClose();
                navigate("/login/customer");
              }}
            >
              Login as Customer
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLoginMenuClose();
                navigate("/login/banker");
              }}
            >
              Login as Banker
            </MenuItem>
          </Menu>
        </Toolbar>

        {/* MENU */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            py: 2,
            borderTop: "1px solid #E5E7EB",
            bgcolor: "#fff",
          }}
        >
          {[
            "Dashboard",
            "ATM Locator",
            "Cash Forecasting",
            "Bank Analytics",
            "Operations Center",
            "Reports",
            "Contact",
          ].map((item) => (
            <Typography
              key={item}
              sx={{
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": {
                  color: "#006FCF",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg,#001B6E 0%,#003B8F 50%,#006FCF 100%)",
          color: "#fff",
          minHeight: "500px",
          px: 8,
          py: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 650,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
            }}
          >
            AI Powered ATM Cash Management
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
            }}
          >
            Real-time ATM Monitoring, Predictive Cash Forecasting,
            Smart Route Optimization and Enterprise Banking Analytics.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#00D4FF",
              color: "#001B6E",
              mr: 2,
              fontWeight: 700,
            }}
          >
            Explore Platform
          </Button>

          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "#fff",
              borderColor: "#fff",
            }}
          >
            Request Demo
          </Button>
        </Box>

        {/* Right Side Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Card
            sx={{
              p: 3,
              minWidth: 250,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4">
              98.7%
            </Typography>

            <Typography>
              Cash Availability
            </Typography>
          </Card>

          <Card
            sx={{
              p: 3,
              minWidth: 250,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4">
              2,450
            </Typography>

            <Typography>
              ATMs Monitored
            </Typography>
          </Card>
        </Box>
      </Box>

      {/* KPI SECTION */}
      <Box
        sx={{
          bgcolor: "#F8FAFC",
          py: 6,
          px: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 5,
          }}
        >
          Operations Overview
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 3,
          }}
        >
          {kpis.map((item) => (
            <Card
              key={item.title}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 4,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#001B6E",
                }}
              >
                {item.value}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {item.title}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}