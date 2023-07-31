import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdAddCircleOutline} from 'react-icons/io'
import {AiOutlineHome} from 'react-icons/ai'
import {MdTravelExplore} from 'react-icons/md'
import {GoTrophy} from 'react-icons/go'
import {FaUserGraduate} from 'react-icons/fa'
import './index.css'

class MobileHeader extends Component{
    state={isHome:true,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false}

    activeHomeTab=()=>{
        this.setState({isHome:true,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:false})
    }

    activeAlumniTab=()=>{
        this.setState({isHome:false,isAlumni:true,isAddPost:false,isAchievements:false,isExplore:false})
    }

    activeAddPostTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:true,isAchievements:false,isExplore:false})
    }

    activeAchievementsTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:true,isExplore:false})
    }

    activeExploreTab=()=>{
        this.setState({isHome:false,isAlumni:false,isAddPost:false,isAchievements:false,isExplore:true})
    }


    render(){
        const {isHome,isAlumni,isAddPost,isAchievements,isExplore}=this.state 
        const homeCls=isHome?"mobile-active-tab":""
        const alumniCls=isAlumni?"mobile-active-tab":""
        const addPostCls=isAddPost?"mobile-active-tab":""
        const achievementsCls=isAchievements?"mobile-active-tab":""
        const exploreCls=isExplore?"mobile-active-tab":""
        return(
            <ul className="mobile-header-icons-container">
                <Link onClick={this.activeHomeTab} className="mobile-header-icon-item-container" to="/" >
                    <li className="mobile-header-icon-item">
                        <AiOutlineHome className={`mobile-header-icon ${homeCls}`} />
                    </li>
                </Link>
                <Link onClick={this.activeAlumniTab} className="mobile-header-icon-item-container" to="/alumni" >
                    <li className="mobile-header-icon-item">
                        <FaUserGraduate className={`mobile-header-icon ${alumniCls}`}  />
                    </li>
                </Link>
                <Link onClick={this.activeAddPostTab} className="mobile-header-icon-item-container" to="/add-post" >
                    <li className="mobile-header-icon-item">
                        <IoMdAddCircleOutline className={`mobile-header-icon ${addPostCls}`} />
                    </li>
                </Link>
                <Link onClick={this.activeAchievementsTab} className="mobile-header-icon-item-container" to="/achievements" >
                    <li className="mobile-header-icon-item">
                        <GoTrophy className={`mobile-header-icon ${achievementsCls}`}  />
                    </li>
                </Link>
                <Link onClick={this.activeExploreTab} className="mobile-header-icon-item-container" to="/explore" >
                    <li className="mobile-header-icon-item">
                        <MdTravelExplore className={`mobile-header-icon ${exploreCls}`}  />
                    </li>
                </Link>
            </ul>
        )
    }
}

export default MobileHeader