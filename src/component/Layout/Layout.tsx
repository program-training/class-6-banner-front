import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer' 

function Layout() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div className='lay' style={{ width: "100vw", backgroundColor: 'white' }}>
                <Header />
                <div style={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1, 
                }}>
                    <Outlet />
                </div>
                <Footer /> 
            </div>
        </div>
    )
}

export default Layout
