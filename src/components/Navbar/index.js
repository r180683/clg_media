import {Link} from 'react-router-dom'
import './index.css'

const Navbar=()=>{

    const getProfileCharacter=()=>{
        const currentUserDetails=localStorage.getItem("currentUserDetails")
        const currentUser=JSON.parse(currentUserDetails)
        return currentUser.name[0]
    }

    const getCollegeName=()=>{
        const currentUserDetails=localStorage.getItem("currentUserDetails")
        const currentUser=JSON.parse(currentUserDetails)
        return currentUser.clg
    }

    return(
        <div className="navbar-page-container">
            <div className="navbar-header-container">
                <div className="navbar-profile-container">
                    <Link className="navbar-profile-btn-container" to="/profile-details">
                        <button className="navbar-profile-btn" type="button">{getProfileCharacter()}</button>
                    </Link>
                    <h1 className="navbar-clg-name">{getCollegeName()}</h1>
                    <Link className="navabr-mlogo" to="/about-college-media">
                        <span className="navbar-mobile-logo-name">College Media</span>
                    </Link>
                </div>
                <div className="navbar-app-logo-container">
                    <Link to="/about-college-media">
                        <img className="navbar-logo" src="https://img.freepik.com/premium-vector/cm-mc-circle-shape-branding-minimal-logo_649646-13.jpg" alt="App-logo" />
                    </Link>
                    <h1 className="navbar-logo-name">College Media</h1>
                </div>
            </div>
        </div>
    )
}

export default Navbar