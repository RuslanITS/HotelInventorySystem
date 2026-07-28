import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant="body2"
          color="text.secondary"
        >
          © {new Date().getFullYear()} Mini Chat. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;