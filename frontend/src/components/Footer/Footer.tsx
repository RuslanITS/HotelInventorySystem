import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          Hotel Inventory System · Inventory Management Laboratory · © 2026
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
