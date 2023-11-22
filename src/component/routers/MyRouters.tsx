import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "../pages/log-in/LogIn";
import SignIn from "../pages/Sing-in/Sing-in";
import BannerPage from "../pages/BannerPage/BannerPage";
import AddBanner from "../pages/addBanner/AddBanner";
import EditBanner from "../pages/EditBanner/EditBanner";
import UserBanners from "../pages/UserBanner/UserBanner";

function MyRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
        {/* <Route element={<Layout/>}> */}
          <Route path="/" element={<LogIn />} />
          <Route path="/singIn" element={<SignIn />} />
           <Route path="/bannerPage/:id" element={<BannerPage />} />
          <Route path="/addBanner" element={<AddBanner />} />
          <Route path="/userBanners" element={<UserBanners />} />
          <Route path="/editBanner/:id" element={<EditBanner />} />
         {/* </Route> */}
      </Routes>
    </Router>
  );
}
export default MyRouter;
