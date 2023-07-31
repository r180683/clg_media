import Header from '../Header'
import MobileHeader from '../MobileHeader'
import './index.css'

const HomeContent=()=>(
    <div className="home-content-container">
        <div className="home-content-profile-container">
            <Header />
        </div>
        <div className="home-content-text-container">
            <h1>vghbjn</h1>
        </div>
        <div className="mobile-header-container">
            <MobileHeader />
        </div>
    </div>
)

export default HomeContent