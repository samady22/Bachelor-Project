import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <Box bgcolor="#2b3947" color={"white"}>
        <Container maxWidth="xs">
          <Typography textAlign={"center"}>
            Hikmatullah Samady Copyright © {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
