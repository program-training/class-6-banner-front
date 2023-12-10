import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ClickData {
    _id: string;
    banner_id: string;
    clicks?: { [key: string]: number };
}
interface ChartData {
    banner_id: string;
    clicks: number;
}

async function getBannerName(bannerId:string) {
    try {
        const response = await fetch(`https://serverbanners.onrender.com/banners/${bannerId}`);
        const bannerData = await response.json();
        return bannerData.image.alt;
    } catch (error) {
        console.error('Error fetching banner name:', error);
        return '';
    }
}

async function getTopBannerIdsWithClicks(url: string): Promise<Array<{ banner_id: string, clicks: number }>> {
    try {
        const response = await fetch(url);
        const data: ClickData[] = await response.json();

        const clickCounts: { [key: string]: number } = data.reduce((acc: { [key: string]: number }, item: ClickData) => {
            if (item.clicks) {
                Object.keys(item.clicks).forEach((date: string) => {
                    if(item.clicks)
                    acc[item.banner_id] = (acc[item.banner_id] || 0) + item.clicks[date];
                });
            }
            return acc;
        }, {});

        const bannerIds = Object.entries(clickCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const bannersWithNames = await Promise.all(
            bannerIds.map(async ([banner_id, clicks]) => ({
                banner_id,
                clicks,
                bannername: await getBannerName(banner_id)
            }))
        );

        return bannersWithNames;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
export default function Statistic() {

    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        getTopBannerIdsWithClicks('http://localhost:8008/bannerclicks/')
            .then(data => {
                setChartData(data);
            });
    }, []);

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
    <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>

        <Grid item xs={8}> 
            <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center' }}> 
                <ResponsiveContainer width="90%" height="90%" style={{ backgroundColor: '#b2dfdb', padding: '1em', borderRadius: '0.8em', border: 'solid black 0.1em' }}>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 10, 
                            right: 30,
                            left: 20,
                            bottom: 30, 
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bannername" tick={{ fill: '#black', fontSize: 12 }} tickFormatter={(value) => value.substring(0, 17)} />
                        <YAxis tick={{ fill: '#black' }} axisLine={{ stroke: 'black' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="clicks" fill="#5e35b1" />
                        <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize="16"> 
                            Popular Banner Views
                        </text>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Grid>

    </Grid>
</Box>
    );
}