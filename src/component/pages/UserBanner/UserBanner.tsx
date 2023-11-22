import React, { useState, useEffect } from 'react';
import {
    // Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    Button,
    CardActions,
    CardContent,
    
} from "@mui/material";
import { Link } from 'react-router-dom'; // Import Link

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
    product_id: number;
}

export default function UserBanners() {
    const [banners, setBanners] = useState<Banner[]>([]);

    useEffect(() => {
        async function fetchBanners() {
            try {
                const response = await fetch('http://localhost:8008/api/banners/');
                const data = await response.json();
                setBanners(data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        }

        fetchBanners();
    }, []);
    const deleteBanner = async (id: string) => {
        try {
            await fetch(`http://localhost:8008/api/banners/${id}`, {
                method: 'DELETE',
            });
            // Update the state to reflect the deletion
            setBanners(banners.filter(banner => banner._id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    }

    return (
       
        <Container sx={{ padding: '2rem', maxWidth: '1200px' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                User Banners
            </Typography>
            <Grid container spacing={4}>
                {banners.map((card: Banner) => (
                    <Grid item key={card._id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: '10px', margin: 'auto' }}>
                            <CardMedia
                                sx={{ height: 200 }}
                                image={card.image.url}
                                title={card.image.alt}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {card.category}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {card.text}
                                </Typography>
                                {card.sale && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Sold: {card.sale}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Link to={`/editBanner/${card._id}`} style={{ textDecoration: 'none' }}>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="small"
                                    color="secondary"
                                    onClick={() => deleteBanner(card._id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
    

