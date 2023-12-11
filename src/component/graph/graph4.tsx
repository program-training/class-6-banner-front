import { Box, Grid, MenuItem, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartData } from '../interface/interface';
// const api = import.meta.env.VITE_MY_SERVER;

async function getBannerName(bannerId: string) {
    try {
        const response = await fetch(`http://localhost:8008/banners/${bannerId}`);
        const bannerData = await response.json();
        return bannerData.image.alt;
    } catch (error) {
        console.error('Error fetching banner name:', error);
        return '';
    }
}
interface Click {
    date: string;
    count: number;
}

interface ClickData {
    _id: string;
    banner_id: string;
    clicks: Click[];
}

async function getTopBannerIdsWithClicks(url: string, selectedDates: string[]): Promise<Array<{ banner_id: string, clicks: number }>> {
    try {
        const response = await fetch(url);
        const data: ClickData[] = await response.json();

        const clickCounts: { [key: string]: number } = data.reduce((acc: { [key: string]: number }, item: ClickData) => {
            item.clicks.forEach((click) => {
                if (selectedDates.includes(click.date)) {
                    acc[item.banner_id] = (acc[item.banner_id] || 0) + click.count;
                }
            });
            return acc;
        }, {});

        const bannerIds = Object.entries(clickCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 7);

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
    const [numBannersToShow, setNumBannersToShow] = useState<number>(5);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);


    useEffect(() => {
        fetch(`http://localhost:8008/bannerclicks/`)
            .then(response => response.json())
            .then(data => {
                const dates = new Set<string>();
                data.forEach((clickData: ClickData) => {
                    clickData.clicks.forEach(click => dates.add(click.date));
                });
                setAvailableDates(Array.from(dates));
            });
    }, []);

    useEffect(() => {
        if (selectedDate) {
            getTopBannerIdsWithClicks(`http://localhost:8008/bannerclicks/`, [selectedDate])
                .then(data => {
                    const sortedBanners = data.sort((a, b) => b.clicks - a.clicks);
                    const topBanners = sortedBanners.slice(0, numBannersToShow);
                    setChartData(topBanners);
                });
        }
    }, [numBannersToShow, selectedDate]);

    const handleSliderChange = (event: Event, value: number | number[]) => {
        setNumBannersToShow(value as number);
    };
    const handleDateChange = (event: SelectChangeEvent<string>) => {
        setSelectedDate(event.target.value);
    };
    

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2em' }}>
                <Grid item xs={8}>
                    <Box sx={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Select Number of Popular Banners:
                        </Typography>
                        <Slider
                            value={numBannersToShow}
                            min={3}
                            max={7}
                            step={1}
                            valueLabelDisplay="auto"
                            onChange={handleSliderChange}
                            sx={{ width: '30%' }}
                        />
                        <ResponsiveContainer width="90%" height="90%" style={{ backgroundColor: '#b2dfdb', padding: '1em', borderRadius: '0.8em', border: 'solid black 0.1em' }}>
                            <BarChart
                                width={300}
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
                                <XAxis dataKey="bannername" tick={{ fill: '#black', fontSize: 12 }} tickFormatter={(value) => value.length > 8 ? `${value.substring(0, 8)}...` : value} />
                                <YAxis tick={{ fill: '#black' }} axisLine={{ stroke: 'black' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="clicks" fill="#5e35b1" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Select
                            value={selectedDate}
                            onChange={handleDateChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Choose Day</em>
                            </MenuItem>
                            {availableDates.map((date) => (
                                <MenuItem key={date} value={date}>{date}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}