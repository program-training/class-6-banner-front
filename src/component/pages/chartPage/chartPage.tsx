// import { Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// interface BannerClick {
//   _id: string;
//   banner_id: string;
//   clicks: {
//     [date: string]: number;
//   };
// }

// const Chart = () => {
//   const [chartData, setChartData] = useState<{ rating: { [date: string]: number; }; }[]>([]);

//   useEffect(() => {
//     fetchPopularBanners();
//   }, []);

//   const fetchPopularBanners = async () => {
//     try {
//       const response = await axios.get<BannerClick[]>('http://localhost:8008/bannerclicks/');
//       console.log(response.data);

//       const data = response.data.map((entry) => ({
//         banner_id: entry.banner_id,
//         rating: entry.clicks,
//       }));

//       setChartData(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <Typography fontSize="30px">Banner Rating Chart</Typography>
//       <BarChart width={600} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//         <XAxis dataKey="banner" />
//         <YAxis />
//         <Tooltip />
//         <Legend />

//         {chartData.map((entry, index) => (
//           <Bar
//             key={index}
//             dataKey="rating"
//             data={[entry]}
//             fill={`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`}
//             barSize={30}
//             radius={[10, 10, 0, 0]}
//           />
//         ))}
//       </BarChart>
//     </>
//   );
// };

// export default Chart;

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface BannerClick {
  _id: string;
  banner_id: string;
  clicks: {
    [date: string]: number;
  };
}

const Chart = () => {
  const [chartData, setChartData] = useState<BannerClick[]>([]);

  useEffect(() => {
    fetchPopularBanners();
  }, []);

  const fetchPopularBanners = async () => {
    try {
      const response = await axios.get<BannerClick[]>('http://localhost:8008/bannerclicks/');
      console.log(response.data);

      const data = response.data.map((entry) => ({
        banner_id: entry.banner_id,
        rating: entry.clicks,
      }));

      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const banner_id = payload[0].payload.banner_id;
      const rating = payload[0].clicks;

      return (
        <div style={{ background: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p>{`Banner ID: ${banner_id}`}</p>
          <p>{`Rating: ${rating}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Typography fontSize="30px">Banner Rating Chart</Typography>
      <BarChart width={600} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="banner_id" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />

        <Bar
          dataKey="rating"
          fill={`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.6)`}
          barSize={30}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </>
  );
};

export default Chart;
