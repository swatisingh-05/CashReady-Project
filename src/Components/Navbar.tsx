import { Box, Avatar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      sx={{
        height: 80,
        bgcolor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        CashReady AI
      </Typography>

      <Avatar sx={{ bgcolor: "#00175A" }}>
        S
      </Avatar>
    </Box>
  );
}