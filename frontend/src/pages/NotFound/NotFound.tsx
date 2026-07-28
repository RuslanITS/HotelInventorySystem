import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography variant="h1" color="primary">
          404
        </Typography>

        <Typography variant="h4">
          Page Not Found
        </Typography>

        <Typography color="text.secondary">
          Sorry, the page you are looking for doesn't exist.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;