import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        background: "#00175A",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        p: 3,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        💵 CashReady
      </Typography>

      <List sx={{ mt: 4 }}>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/search")}>
          <ListItemText primary="Cash Search" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/results")}>
          <ListItemText primary="ATM Results" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/map")}>
          <ListItemText primary="Map View" />
        </ListItemButton>

      </List>
    </Box>
  );
}