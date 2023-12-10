import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, ResponsiveContainer, Area } from 'recharts';
import { useParams } from 'react-router-dom';
import { ChartData2 } from '../interface/interface';
const api = import.meta.env.VITE_MY_SERVER;

export default function Statistic() {
    const [data, setData] = useState<ChartData2[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/bannerclicks/${id}`);
                const result = await response.json();
                const formattedData = Object.keys(result.clicks).map(date => ({
                    date: date,
                    clicks: result.clicks[date]
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    
    
    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>
            <Grid item xs={12} sx={{ height: '45vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ marginBottom: '1em' }}>
                Banner View Count
                </Typography>
                <ResponsiveContainer width="80%" height="80%" style={{ backgroundColor: '#E8EAF6', padding: '1em', borderRadius: '0.8em', border: 'solid #9FA8DA 0.1em' }}>
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 4" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="clicks" stroke="#7986CB" fill="#7986CB" />
                    </AreaChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    </Box>
    

    

    );
}