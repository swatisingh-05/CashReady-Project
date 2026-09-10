import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      text: "Cash Search",
      icon: <SearchIcon />,
      path: "/search",
    },
    {
      text: "ATM Results",
      icon: <LocationOnIcon />,
      path: "/results",
    },
    {
      text: "Map View",
      icon: <MapIcon />,
      path: "/map",
    },
    {
      text: "Banker Dashboard",
      icon: <AccountBalanceIcon />,
      path: "/banker-dashboard",
    },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        background: "#00175A",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        p: 3,
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          💵 CashReady
        </Typography>

        <Typography
          sx={{
            color: "#A5B4FC",
            fontSize: 14,
            mt: 1,
          }}
        >
          AI-Powered ATM Intelligence
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 3,
              mb: 1,
              color: "white",

              backgroundColor:
                location.pathname === item.path
                  ? "#0A2A8A"
                  : "transparent",

              "&:hover": {
                bgcolor: "#0A2A8A",
                transform: "translateX(5px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "white",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}