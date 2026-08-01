import { Box, Button, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Typography variant="h2" color="primary" sx={{ fontWeight: 800 }}>404</Typography>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>Page not found</Typography>
        <Typography color="text.secondary">The requested page does not exist.</Typography>
        <Button component={RouterLink} to="/" variant="contained">Go home</Button>
      </Box>
    </Paper>
  );
};

export default NotFound;
