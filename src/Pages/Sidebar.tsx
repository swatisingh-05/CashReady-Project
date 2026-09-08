import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#00175A",
        color: "white",
        p: 3,
        position: "fixed",
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        💵 CashReady
      </Typography>

      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemText primary="🏠 Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/search")}>
          <ListItemText primary="🔍 Cash Search" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/results")}>
          <ListItemText primary="🏧 ATM Results" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/map")}>
          <ListItemText primary="🗺 Navigation" />
        </ListItemButton>

        <ListItemButton
          onClick={() => navigate("/banker-dashboard")}
        >
          <ListItemText primary="📊 Operations Center" />
        </ListItemButton>
      </List>
    </Box>
  );
}
