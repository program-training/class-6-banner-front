// interface ClickData {
//     _id: string;
//     banner_id: string;
//     clicks?: { [key: string]: number };
// }

// async function getTopBannerIdsWithClicks(url: string): Promise<Array<{banner_id: string, clicks: number}>> {
//     try {
//         const response = await fetch(url);
//         const data: ClickData[] = await response.json();

//         const clickCounts = data.reduce((acc: { [key: string]: number }, item) => {
//             if (item.clicks) {
//                 Object.keys(item.clicks).forEach(date => {
//                     if
//                     acc[item.banner_id] = (acc[item.banner_id] || 0) + item.clicks[date];
//                 });
//             }
//             return acc;
//         }, {});

//         return Object.entries(clickCounts)
//                      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
//                      .slice(0, 5)
//                      .map(([banner_id, clicks]) => ({ banner_id, clicks }));
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }

// getTopBannerIdsWithClicks('http://localhost:8008/bannerclicks/').then(topBannerIdsWithClicks => {
//     console.log('Top 5 Banner IDs with Clicks:', topBannerIdsWithClicks);
// });
