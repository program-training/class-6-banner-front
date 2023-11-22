import { useState, useEffect } from "react";
import {Container,Typography, Card,CardMedia,Button,CardActions,CardContent,CardActionArea,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../interface";
import axios from "axios";
import Header from "./Header";

export default function UserBanners() {
  const Navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get("http://localhost:8008/api/banners");
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);
  const deleteBanner = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8008/api/banners/${id}`);
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };
  return (
      
    <Container sx={{ padding: "2rem", maxWidth: "1200px" }}>
        <Header/>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        User Banners
      </Typography>
      <div style={{display:'flex'}}>
        {banners.map((card: Banner) => (
          <CardActionArea
            onClick={() => {
              Navigate(`/bannerPage/${card._id}`);
            }}
          >
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 3,
                borderRadius: "10px",
                margin: "auto",
              }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={card.image.url}
                title={card.image.alt}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {card.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.text}
                </Typography>
                {card.sale && (
                  <Typography variant="body2" color="text.secondary">
                    Sold: {card.sale}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(), Navigate("/editBanner/${card._id}");
                  }}
                  size="small"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={(e) => {
                    deleteBanner(card._id);
                    e.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </CardActionArea>
        ))}
      </div>
    </Container>
  );
}
