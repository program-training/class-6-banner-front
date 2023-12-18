import { Box, Grid, MenuItem, Select, SelectChangeEvent, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartData, Click, ClickData3 } from '../interface/interface';
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


async function getTopBannerIdsWithClicks(url: string, selectedDates: string[]): Promise<Array<{ banner_id: string, clicks: number }>> {
    try {
        const response = await fetch(url);
        const data: ClickData3[] = await response.json();

        const clickCounts: { [key: string]: number } = data.reduce((acc: { [key: string]: number }, item: ClickData3) => {
            item.clicks.forEach((click: Click) => {
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
export default function Statistic3() {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [numBannersToShow, setNumBannersToShow] = useState<number>(5);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);


    useEffect(() => {
        fetch(`http://localhost:8008/bannerclicks/`)
            .then(response => response.json())
            .then(data => {
                const dates = new Set<string>();
                data.forEach((clickData: ClickData3) => {
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
        <Box sx={{ width: '100vw', height: '100vh', p: 3, bgcolor: 'background.default' }}>
            <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                Analysis of clicks on banners
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 1, mb: 3 }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={chartData}
                                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="bannername"
                                    tick={{ fill: 'black', fontSize: 12 }}
                                    tickFormatter={(value) => value.length > 8 ? `${value.substring(0, 8)}...` : value}
                                />
                                <YAxis tick={{ fill: 'black' }} axisLine={{ stroke: 'black' }} />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36} />
                                <Bar dataKey="clicks" fill="#5e35b1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>

                    <Typography variant="h6" gutterBottom>
                        Choose Date:
                    </Typography>
                    <Select
                        value={selectedDate}
                        onChange={handleDateChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{ mb: 3, width: '100%' }}
                    >
                        <MenuItem value="">
                            <em>Choose Day </em>
                        </MenuItem>
                        {availableDates.map((date) => (
                            <MenuItem key={date} value={date}>{date}</MenuItem>
                        ))}
                    </Select>


                    <Slider
                        value={numBannersToShow}
                        min={3}
                        max={7}
                        step={1}
                        valueLabelDisplay="auto"
                        onChange={handleSliderChange}
                        sx={{
                            width: '60%',
                            color: '#5e35b1',
                            '& .MuiSlider-thumb': {
                                width: 28,
                                height: 28,
                                backgroundColor: '#fff',
                                border: '2px solid currentColor',
                                '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                                    boxShadow: 'inherit',
                                },
                            },
                            '& .MuiSlider-track': {
                                height: 10,
                                borderRadius: 4,
                            },
                            '& .MuiSlider-rail': {
                                height: 10,
                                borderRadius: 4,
                            },
                            '& .MuiSlider-mark': {
                                backgroundColor: '#bfbfbf',
                                height: 8,
                                width: 1,
                                '&.MuiSlider-markActive': {
                                    opacity: 1,
                                    backgroundColor: 'currentColor',
                                },
                            },
                        }}
                    />

                </Grid>
            </Grid>
        </Box>

    );
}