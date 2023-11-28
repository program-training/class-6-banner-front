import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import {Card,CardMedia,CardContent,Typography,Container,} from "@mui/material";
import { Banner } from "../../interface/interface";
import { fetchBannerById } from "../../../services/banners.service";

export default function BannerPage() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const { id } = useParams();

  async function getBanner(id:string) {
    const data = await fetchBannerById(id);
    if (data) setBanner(data);
  }

  useEffect(() => {
    if (id) {
      getBanner(id);
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
          <div>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{ marginY: "3rem" }}
              >
                {banner.image.alt}
              </Typography>
              <Typography
                component="div"
                variant="h6"
                sx={{ marginY: "1rem", width: "65%" }}
              >
                {banner.text}
              </Typography>
              <Typography variant="body2">
                Category: {banner.category}
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
