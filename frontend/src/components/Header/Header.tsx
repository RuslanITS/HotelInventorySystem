import { AppBar, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Locations", path: "/locations" },
  { label: "Items", path: "/items" },
] as const;

const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 72,
            gap: 2,
            flexWrap: "wrap",
            py: 1,
          }}
        >
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: 0.2,
              mr: "auto",
            }}
          >
            Hotel Inventory System
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }}>
            {navigation.map((item) => {
              const isActive = item.path === "/"
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <Button
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  sx={{
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.18)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.24)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
