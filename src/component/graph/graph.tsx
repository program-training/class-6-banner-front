import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, ResponsiveContainer, Area } from 'recharts';
import { useParams } from 'react-router-dom';
interface ChartData {
    date: string;
    clicks: number;
}
export default function Statistic() {
    const [data, setData] = useState<ChartData[]>([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8008/bannerclicks/${id}`);
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
                <Grid item xs={12} sx={{ height: '45vh', display: 'flex', justifyContent: 'center' }}>
                    <ResponsiveContainer width="80%" height="80%" style={{ backgroundColor: '#B2DFDB', padding: '1em', borderRadius: '0.8em', border: 'solid black 0.1em' }}>
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
                            <Area type="monotone" dataKey="clicks" stroke="#8884D8" fill="#8884D8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Box>
    );
}