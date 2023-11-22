import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Container } from '@mui/material';

export interface Banner {
  _id: string;
  image: {
    url: string;
    alt: string;
  };
  text: string;
  createdAt: Date;
  author: string;
  category: string;
  rating: number;
  sale?: number;
  productID: number;
}

export default function BannerDetails() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const params = useParams();
  console.log(params);


  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/banners/${params.id}`);
        setBanner(response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    if (params.id) {
      fetchBanner();
    }
  }, [params.id]);

  if (!banner) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}> {/* שינוי גודל הכרטיס */}
      <CardMedia
        component="img"
        height="140"
        image={banner.image.url}
        alt={banner.image.alt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {banner.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {banner.text}
        </Typography>
        <Typography variant="body2">
          Author: {banner.author}
        </Typography>
        <Typography variant="body2">
          Rating: {banner.rating}
        </Typography>
        {banner.sale && (
          <Typography variant="body2">
            Sale: {banner.sale}%
          </Typography>
        )}
        <Typography variant="body2">
          Product ID: {banner.productID}
        </Typography>
        <Typography variant="body2">
          Created At: {new Date(banner.createdAt).toLocaleDateString()}
        </Typography>
        {banner._id && (
          <Typography variant="body2">
            Banner ID: {banner._id}
          </Typography>
        )}
      </CardContent>
    </Card>
  </Container>
  
  );
}
