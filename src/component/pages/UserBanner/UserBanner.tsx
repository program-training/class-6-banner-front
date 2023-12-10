import { Container, Typography, Card, CardActions, CardContent, CardActionArea, CardMedia, Button, CircularProgress, Modal, Fade, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../interface/interface";
import { deleteBanner } from "../../../services/banners.service";
import { useAppDispatch, useAppSelector } from "../../../rtk/hooks";
import { setBanners } from "../../../rtk/bannersSlice";
import Statistic from "../../graph/graph2";
import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function UserBanners() {


  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { banners, status, error } = useAppSelector((state) => state.banners);
  const Navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'createdAt' | 'sale'>('rating');
  const [sliderIndex, setSliderIndex] = useState(0);

  const sortedBanners = React.useMemo(() => {
    const sorted = [...banners];
    if (sortOrder) {
      if (sortBy === 'rating') {
        sorted.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
      } else if (sortBy === 'createdAt') {
        sorted.sort((a, b) => sortOrder === 'asc' ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortBy === 'sale') {
        sorted.sort((a, b) => sortOrder === 'asc' ? (a.sale || 0) - (b.sale || 0) : (b.sale || 0) - (a.sale || 0));
      }
    }
    return sorted;
  }, [banners, sortOrder, sortBy]);


  const toggleSort = (type: 'rating' | 'createdAt' | 'sale') => {
    setSortBy(type);
    setSortOrder(sortOrder === 'asc' || sortOrder === null ? 'desc' : 'asc');
  };

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (!userName) {
      Navigate("/banner/");
    }
  }, [Navigate]);


  const deleteBannerById = async (id: string) => {
    const response = await deleteBanner(id)
    if (response && banners) {
      dispatch(setBanners(banners.filter((banner) => banner._id !== id)))
    }
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (status === 'loading') {
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

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  const bannersPerPage = 6;
  const displayedBanners = sortedBanners.slice(sliderIndex, sliderIndex + bannersPerPage);

  const handleNext = () => {
    setSliderIndex((prevIndex) =>
      Math.min(prevIndex + bannersPerPage, sortedBanners.length - bannersPerPage));
  };

  const handlePrev = () => {
    setSliderIndex((prevIndex) => Math.max(prevIndex - bannersPerPage, 0));
  };


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
      <Button
        onClick={() => toggleSort('rating')}
        sx={{
          marginBottom: "23px",
          marginRight: "15px",

          backgroundColor: sortBy === 'rating' ? '#00796b' : '#e0e0e0',
          color: sortBy === 'rating' ? 'white' : 'black',
          ':hover': {
            backgroundColor: sortBy === 'rating' ? '#005662' : '#bdbdbd',
          },
        }}
      >
        sort by rating {sortBy === 'rating' && (sortOrder === 'asc' ? '↓' : '↑')}
      </Button>
      <Button
        onClick={() => toggleSort('createdAt')}
        sx={{
          marginBottom: "23px",
          marginRight: "15px",
          backgroundColor: sortBy === 'createdAt' ? '#00796b' : '#e0e0e0',
          color: sortBy === 'createdAt' ? 'white' : 'black',
          ':hover': {
            backgroundColor: sortBy === 'createdAt' ? '#005662' : '#bdbdbd',
          },
        }}
      >
        sort by Production date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↓' : '↑')}
      </Button>
      <Button
        onClick={() => toggleSort('sale')}
        sx={{
          marginBottom: "23px",
          backgroundColor: sortBy === 'sale' ? '#00796b' : '#e0e0e0',
          color: sortBy === 'sale' ? 'white' : 'black',
          ':hover': {
            backgroundColor: sortBy === 'sale' ? '#005662' : '#bdbdbd',
          },
        }}
      >
        sort by sales {sortBy === 'sale' && (sortOrder === 'asc' ? '↓' : '↑')}
      </Button>

      <Button onClick={handleOpenModal} sx={{ marginBottom: '23px', backgroundColor: '#00796b', color: 'white', marginLeft: '400px' }}>
        Graph Popular Banners
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '80%',
              margin: 'auto',
              marginTop: '50px',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: '#cdfffb'
            }}
          >
            <Typography variant="h5"
              sx={{
                borderBottom: '2px solid #b2dfdb',
                paddingBottom: '5px',
                marginBottom: '15px',
              }}
            >The most popular banners</Typography>
            <Statistic />
            <Button onClick={handleCloseModal} sx={{ marginTop: '20px', alignSelf: 'flex-end' }}>
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
     

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        {displayedBanners.map((card: Banner) => (
          <CardActionArea
            key={Date.now() * Math.random()}
            onClick={() => Navigate(`/banner/bannerPage/${card.id}`)}
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
                    Navigate(`/banner/editBanner/${card._id}`);
                  }}
                  size="small"
                  sx={{
                    backgroundColor: "#009688",
                    color: "white",
                    "&:hover": { backgroundColor: "#00796b" },
                  }}           >
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
                  }}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </CardActionArea>
        ))}
        
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
      <Button onClick={handlePrev} disabled={sliderIndex === 0}>
        <ArrowBackIosIcon /> Prev Banners
      </Button>
      <Button onClick={handleNext} disabled={sliderIndex >= sortedBanners.length - bannersPerPage}>
        Next Banners <ArrowForwardIosIcon />
      </Button>
      </div>
    </Container>
  );
}



