import React, { useState, useEffect } from 'react';
import {
    // Box,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    // Button,
    CardActions,
    CardContent,
} from "@mui/material";

export interface Banner {
    _id: number;
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

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User Banners
            </Typography>
            <Grid container spacing={8}>
                {banners.map((card: Banner) => (
                    <Grid item key={card._id} xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
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
                            <CardActions>
                                {/* Button Actions Here */}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
