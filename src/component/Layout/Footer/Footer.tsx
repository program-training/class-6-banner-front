import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[400]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1.25rem",
                color: "#333", 
                marginBottom: "10px"
              }}
            >
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              At "Banner Plus", we specialize in creating unique banners tailored to every event, business, or marketing need. If you're looking to highlight your business, promote a product or service, or add color and life to a special event, you're in the right place!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="1.25rem"
              color="#333" 
              gutterBottom
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hatsira 13 Petah Tikva, Israel
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: Kapatz@digital.idf.il
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: 1111
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              fontSize="1.25rem"
              color="#333" 
            >
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/idfonline/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/idfonline/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://twitter.com/idfonline" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://www.idf.il/">
              IDF Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}