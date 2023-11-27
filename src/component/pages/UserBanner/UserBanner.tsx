import { useState, useEffect } from "react";
import {Container,Typography,Card,CardActions,CardContent,CardActionArea,CardMedia,Button,CircularProgress,} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../interface/interface";
import { deleteBanner, fetchBanners } from "../../../services/banners.service";

export default function UserBanners() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[] | null>(null);
  
  const userName = localStorage.getItem("username");
  if (!userName) {
    navigate("/");
  }
  
  async function getBanners(){
    const data = await fetchBanners() 
    if (data)
    setBanners (data)}

  useEffect(() => {
    getBanners()
  }, [banners]);

  const deleteBannerById = async(id:string)=>{
    const response = await deleteBanner(id)
    if (response && banners) {
    setBanners(banners.filter((banner) => banner._id !== id))
    }
  }


  if (!banners) {
    return (
      <div
        style={{
          minHeight: "50vh",
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
    <Container
      sx={{
        padding: "2rem",
        maxWidth: "1200px",
        marginTop: "8px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#00796b",
          marginTop: "20px",
        }}
      >
        User Banners
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {banners.map((card: Banner) => (
          <CardActionArea
            onClick={() => navigate(`/bannerPage/${card._id}`)}
            style={{ width: "300px", transition: "transform 0.3s ease" }}
          >
            <Card
              sx={{
                width: "300px",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
                border: "1px solid #ccc",
                backgroundColor: "#ffffff",
                "&:hover": {
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                  border: "1px solid #00796b",
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: "340px",
                  objectFit: "contain",
                }}
                image={card.image.url}
                title={card.image.alt}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", color: "#005662" }}
                >
                  {" "}
                  {card.image.alt}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editBanner/${card._id}`);
                  }}
                  size="small"
                  sx={{
                    backgroundColor: "#009688",
                    color: "white",
                    "&:hover": { backgroundColor: "#00796b" },
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#e57373",
                    color: "white",
                    "&:hover": { backgroundColor: "#ef5350" },
                  }}
                  onClick={(e) => {
                    deleteBannerById(card._id);
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
