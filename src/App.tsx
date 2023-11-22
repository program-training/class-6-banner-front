// import ErrorBoundary from './component/Error'
import MyRouter from "./component/routers/MyRouters"
// import Footer from "./component/pages/UserBanner/Footer"

function App() {
  return (
    <div>
    <div className='app' style={{ justifyContent: "center", alignItems: "center" }}>
      {/* <ErrorBoundary> */}
      <MyRouter />
      {/* </ErrorBoundary> */}
    </div>
    </div>
  )
}

export default App