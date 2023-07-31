import { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import {AiFillHome,AiFillSetting} from 'react-icons/ai'
import {MdTravelExplore} from 'react-icons/md'
import {IoMdAddCircle} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import {GoTrophy} from 'react-icons/go'
import {FaUserGraduate} from 'react-icons/fa'
import Cookies from 'js-cookie'
import './index.css'



class Header extends Component{
    state={isHome:true,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false,isProfile:false,isSettings:false}

    activeHomeTab=()=>{
        this.setState({isHome:true,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false,isProfile:false,isSettings:false})
    }

    activeAlumniTab=()=>{
        this.setState({isHome:false,isAlumni:true,isAddPost:false,isAchievements:false,isExplore:false,isProfile:false,isSettings:false})
    }

    activeAddPostTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:true,isAchievements:false,isExplore:false,isProfile:false,isSettings:false})
    }

    activeAchievementsTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:true,isExplore:false,isProfile:false,isSettings:false})
    }

    activeExploreTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:true,isProfile:false,isSettings:false})
    }

    activeProfileTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false,isProfile:true,isSettings:false})
    }

    activeSettingsTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false,isProfile:false,isSettings:true})
    }

    ClickLogout=()=>{
        const {history}=this.props 
        Cookies.remove("jwt_token")
        localStorage.removeItem("currentUserDetails")
        history.replace("/login")
    }


    render(){
        const {isHome,isAlumni,isAddPost,isAchievements,isExplore,isProfile,isSettings}=this.state 
        const homeCls=isHome?"header-option-active-tab":""
        const alumniCls=isAlumni?"header-option-active-tab":""
        const addPostCls=isAddPost?"header-option-active-tab":""
        const achievementsCls=isAchievements?"header-option-active-tab":""
        const exploreCls=isExplore?"header-option-active-tab":""
        const profileCls=isProfile?"header-option-active-tab":""
        const settingsCls=isSettings?"header-option-active-tab":""

        
        return(
            <ul className="desktop-header-container">
                <Link onClick={this.activeHomeTab} to="/" className={`desktop-header-option-container`}>  
                    <li  className="desktop-header-list-item" >
                        <AiFillHome className="header-option-logo" />
                        <span className={`header-option-name ${homeCls}`}>Home</span>
                    </li>
                </Link>
                <Link onClick={this.activeAlumniTab} to="/alumni" className={`desktop-header-option-container`}>  
                    <li className="desktop-header-list-item" >
                        <FaUserGraduate className="header-option-logo" />
                        <span className={`header-option-name ${alumniCls}`}>Alumni</span>
                    </li>
                </Link>
                <Link onClick={this.activeAddPostTab} to="/add-post" className={`desktop-header-option-container`}>  
                    <li className="desktop-header-list-item" >
                        <IoMdAddCircle className="header-option-logo" />
                        <span className={`header-option-name ${addPostCls}`}>Add Post</span>
                    </li>
                </Link>
                <Link onClick={this.activeAchievementsTab} to="/achievements" className={`desktop-header-option-container `}>  
                    <li className="desktop-header-list-item" >
                        <GoTrophy className="header-option-logo" />
                        <span className={`header-option-name ${achievementsCls}`}>Achievements</span>
                    </li>
                </Link>
                <Link onClick={this.activeExploreTab} to="/explore" className={`desktop-header-option-container`}>  
                    <li className="desktop-header-list-item" >
                        <MdTravelExplore className="header-option-logo" />
                        <span className={`header-option-name  ${exploreCls}`}>Explore</span>
                    </li>
                </Link>
                <Link onClick={this.activeProfileTab} to="/profile" className={`desktop-header-option-container`}>  
                    <li className="desktop-header-list-item" >
                        <CgProfile className="header-option-logo" />
                        <span className={`header-option-name  ${profileCls}`} >Profile</span>
                    </li>
                </Link>
                <Link onClick={this.activeSettingsTab} to="/settings" className={`desktop-header-option-container`}>  
                    <li className="desktop-header-list-item" >
                        <AiFillSetting className="header-option-logo" />
                        <span className={`header-option-name  ${settingsCls}`}>Settings</span>
                    </li>
                </Link>
                <div classname="desktop-logout-btn-container">
                    <button onClick={this.ClickLogout} className="desktop-logout-btn" type="button">Log out</button>
                </div>
            </ul>
        )
    }
}

export default withRouter(Header)