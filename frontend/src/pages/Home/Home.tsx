import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

const sections = [
  { title: "Categories", description: "Organize hotel assets by type.", path: "/categories" },
  { title: "Locations", description: "Keep track of rooms and hotel areas.", path: "/locations" },
  { title: "Items", description: "Manage every registered hotel asset.", path: "/items" },
] as const;

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
          Hotel Asset Manager
        </Typography>
        <Typography color="inherit" sx={{ maxWidth: 620, mx: "auto", mb: 3 }}>
          A simple laboratory application for tracking hotel inventory, locations and categories.
        </Typography>
        <Button component={RouterLink} to="/items" variant="contained" color="secondary">
          Open inventory
        </Button>
      </Box>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid key={section.path} size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 3, boxShadow: "none" }}>
              <CardActionArea component={RouterLink} to={section.path} sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {section.title}
                  </Typography>
                  <Typography color="text.secondary">{section.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
