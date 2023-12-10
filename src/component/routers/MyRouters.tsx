import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "../pages/log-in/LogIn";
import SignIn from "../pages/Sing-in/Sign-in";
import BannerPage from "../pages/BannerPage/BannerPage";
import EditBanner from "../pages/EditBanner/EditBanner";
import UserBanners from "../pages/UserBanner/UserBanner";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import AllProduct from "../pages/AllProduct/AllProduct";
import AddBanner from "../pages/addBanner/addBanner";
import Layout from "../Layout/Layout";
import Charts from "../pages/chartPage/chartPage";

function MyRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
          <Route path="banner/" element={<LogIn />} />
          <Route path="banner/singIn" element={<SignIn />} />
          <Route path="banner/forgetPassword" element={<ForgetPassword/>} />
        <Route element={<Layout/>}>
           <Route path="banner/bannerPage/:id" element={<BannerPage />} />
           <Route path="banner/allProduct" element={<AllProduct />} />
          <Route path="banner/addBanner/:id" element={<AddBanner />} />
          <Route path="banner/userBanners" element={<UserBanners />} />
          <Route path="banner/editBanner/:id" element={<EditBanner />} />
          <Route path="banner/chartPage" element={<Charts />} />
         </Route>
      </Routes>
    </Router>
  );
}
export default MyRouter;
