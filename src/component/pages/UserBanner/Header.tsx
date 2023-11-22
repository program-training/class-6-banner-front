
import React from 'react';
// import './header.css';
import { AppBar, Toolbar, Button, IconButton, Stack, Typography, Grid } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function Header() {
    const usernameString = localStorage.getItem('username');
    const username = usernameString !== null ? JSON.parse(usernameString) : '';


    const handleSignOut = () => {
        // Your logic for signing out
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={handleSignOut} sx={{ color: "white" }}>Sign Out</Button>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <IconButton aria-label="home">
                                <HomeOutlinedIcon sx={{ color: "white" }} />
                            </IconButton>

                            <Stack direction="row" spacing={1} alignItems="center" color="white">
                                <AccountCircleIcon />
                                <Typography variant="h6"> </Typography>
                                <Stack direction="row" spacing={1} alignItems="center" color="white">
                                    <Typography variant="h6">{username ? `Hello ${username}`+ " !" : ''}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

            </Toolbar>
        </AppBar>
    );
}
