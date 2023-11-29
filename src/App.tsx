import { useEffect } from "react";
import MyRouter from "./component/routers/MyRouters"
import { fetchBanners } from "./rtk/bannersSlice";
import { useAppDispatch } from "./rtk/hooks";


function App() {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(fetchBanners());
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div className='app' style={{ justifyContent: "center", alignItems: "center" }}>
      <MyRouter />
    </div>
  )
}

export default App