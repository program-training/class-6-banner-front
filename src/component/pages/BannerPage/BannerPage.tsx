import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Card,CardMedia,CardContent,Typography,Container} from "@mui/material";
import { Banner } from "../../interface";

const api = import.meta.env.VITE_MY_SERVER;

export default function BannerPage() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${api}/api/banners/${id}`);
        setBanner(response.data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    if (id) {
      fetchBanner();
    }
  }, [id]);

  if (!banner) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <h4>Loading...</h4>
      </div>
    );
  }
  return (
    <Box>
      <Container
        sx={{ display: "flex", justifyContent: "center", margin: "3rem" }}
      >
        <Card
          sx={{
            backgroundColor: "#f5f5f5",
            width: "90%",
            margin: "0 auto",
            maxWidth: "90rem",
            boxShadow: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {/* שינוי גודל הכרטיס */}
          <div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ marginY: "3rem" }}
              >
                {banner.category}
              </Typography>
              <Typography
                component="div"
                variant="h6"
                sx={{ marginY: "1rem", width: "65%" }}
              >
                {banner.text}
              </Typography>
              <Typography variant="body2">Author: {banner.author}</Typography>
              <Typography variant="body2">Rating: {banner.rating}</Typography>
              {banner.sale && (
                <Typography variant="body2">Sale: {banner.sale}%</Typography>
              )}
              <Typography variant="body2">
                Product ID: {banner.productID}
              </Typography>
              <Typography variant="body2">
                Created At: {new Date(banner.createdAt).toLocaleDateString()}
              </Typography>
              {banner._id && (
                <Typography variant="body2">Banner ID: {banner._id}</Typography>
              )}
            </CardContent>
          </div>
          <div style={{ width: "50%", height: "auto", margin: "0.5rem" }}>
            <CardMedia
              component="img"
              height="auto"
              image={banner.image.url}
              alt={banner.image.alt}
            />
          </div>
        </Card>
      </Container>
    </Box>
  );
}
