// import ErrorBoundary from './component/Error'
import MyRouter from "./component/routers/MyRouters"
// import Footer from "./component/pages/UserBanner/Footer"
import Header from "./component/pages/UserBanner/Header"
function App() {
  return (
    <div>
      <Header/>
    <div className='app' style={{ justifyContent: "center", alignItems: "center" }}>
      {/* <ErrorBoundary> */}
      <MyRouter />
      {/* </ErrorBoundary> */}
    </div>
    </div>
  )
}

export default App