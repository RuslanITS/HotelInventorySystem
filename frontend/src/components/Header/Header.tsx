import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "64px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Mini Chat
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;