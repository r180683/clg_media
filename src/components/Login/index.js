import {Component} from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import {BsInstagram,BsYoutube,BsTwitter,BsLinkedin,BsFacebook} from 'react-icons/bs'
import ReactPlayer from 'react-player'
import LoginOption from '../LoginOption'
import {Redirect,Link} from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import './index.css'


const usersCredentials=[{"username":"R180683","password":"dinesh","email":"r180683@rguktrkv.ac.in","name":"Avula Dinesh","category":"student",clg:"RGUKT Rk Valley"},{"username":"R180670","password":"pradeep","email":"r180670@rguktrkv.ac.in","name":"Devanaboina Pradeep","category":"admin",clg:"RGUKT Rk Valley"},{"username":"R180649","password":"stanley","email":"r180649@rguktrkv.ac.in","name":"Sampreeth Stanley","category":"faculty",clg:"RGUKT Rk Valley"}]

const loginOptions=[
    {id:1,name:"student",display_text:"Student"},
    {id:2,name:"faculty",display_text:"Faculty"},
    {id:3,name:"admin",display_text:"Admin"},
]

class Login extends Component{
    state={username:"",password:"",activeTabId:loginOptions[0].id,errorMsg:"",isPwdVisible:false,userErrorMsg:"",pwdErrorMsg:""}


    updateUsername=event=>{ 
        const value=event.target.value
        if(value===""){
            this.setState({userErrorMsg:"*This field is required",username:value})
        }
        else{
            this.setState({username:event.target.value,userErrorMsg:""})
        }
    }

    updatePassword=event=>{
        const value=event.target.value 
        if(value===""){
            this.setState({pwdErrorMsg:"*This field is required",password:value})
        }
        else{
            this.setState({password:event.target.value,pwdErrorMsg:""})
        }
    }

    getUserCredentialsList=()=>{
        const usersList=localStorage.getItem("usersCredentials")
        return JSON.parse(usersList)
    }


    submitForm=event=>{
        event.preventDefault()
        const {username,password}=this.state
        if(username===""){
            if(password===""){
                this.setState({userErrorMsg:"*This field is required",pwdErrorMsg:"*This field is required"})
            }
            else{
                this.setState({userErrorMsg:"*This field is required",pwdErrorMsg:""})
            }
        }
        else if(password===""){
            this.setState({pwdErrorMsg:"*This field is required",userErrorMsg:""})
        }
        else{
            const usersCredentials=this.getUserCredentialsList()
            console.log(usersCredentials)
            const filteredList=usersCredentials.filter(each=>each.username===username)
            if(filteredList.length===0){
                this.setState({errorMsg:"*Username doesn't exist"})
            }
            else if(filteredList[0].password!==password){
                this.setState({errorMsg:"*Username and Password didn't match",userErrorMsg:"",pwdErrorMsg:""})
            }
            else{
                this.setState({username:"",password:"",errorMsg:"",userErrorMsg:"",pwdErrorMsg:""})
                Cookies.set("jwt_token",username)
                const value=JSON.stringify(filteredList[0])
                localStorage.setItem("currentUserDetails",value)
                const {history}=this.props
                history.push("/")
            }
        }
        
    }

    changeLoginOption=id=>{
        this.setState({activeTabId:id})
    }

    clickSignUpBtn=()=>{
        const {history}=this.props
        console.log(history)
        history.push("/sign-up")
    }

    updatePwdVisibleStatus=()=>{
        this.setState(prevState=>({isPwdVisible:!prevState.isPwdVisible}))
    }

    render(){
        const {username,password,activeTabId,errorMsg,userErrorMsg,pwdErrorMsg}=this.state
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken!==undefined){
            return <Redirect to="/" />
        }

        //const value=JSON.stringify(usersCredentials)
        //localStorage.setItem("usersCredentials",value)

        return(
           <div className="login-page-container">
                <div className="login-nav-container">
                <div className="login-logo-btn-container">
                    <div className="login-logo-text-container">
                        <h1 className="login-app-name">College Media</h1>
                        <p className="login-app-description">about college media</p>
                    </div>
                    <div className="login-signup-btn-container">
                        <button onClick={this.clickSignUpBtn} className="signup-btn" type="button">Sign up</button>
                    </div>
                </div>
                </div>
                <div className="login-videoo-container">
                    <div className="login-video-and-container">
                        <div className="login-video-container">
                            <ReactPlayer className="login-video" playing url="https://www..com/watch?v=L_b277qj3P4" />
                        </div>
                        <form onSubmit={this.submitForm} className="loginn-container">
                            <ul className="optionsContainer">
                                {loginOptions.map(each=>(
                                    <LoginOption activeTabId={activeTabId} updateLoginOption={this.changeLoginOption} optionDetails={each} key={each.id} />
                                ))}
                            </ul>
                            <div className="input-label-container">
                                <label htmlFor="username" className="label-heading">Username</label>
                                <input value={username} onChange={this.updateUsername} placeholder="USERNAME" className="input-container" id="username" type="text" />
                                <p className="error-msg">{userErrorMsg}</p>
                            </div>
                            <div className="input-label-container">
                                <label htmlFor="password" className="label-heading">Password</label>
                                <div className="login-pwd-container">
                                    <input value={password} onChange={this.updatePassword} placeholder="PASSWORD" className="input-container" id="password" type="password" />
                                </div>
                                <p className="error-msg">{pwdErrorMsg}</p>
                                <p className="error-msg">{errorMsg}</p>
                            </div>
                            <div className="form-submit-btn">
                                <Link className="forget-pwd-text" to="/forget-password"><p>Forget password</p></Link>
                                <button className="submit-btn" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="follow-us-container">
                    <h1 className="follow-us-text">Follow us on</h1>
                    <div className="follow-us-icons-container">
                        <BsInstagram className="follow-us-icon" />
                        <BsYoutube className="follow-us-icon" />
                        <BsTwitter className="follow-us-icon" />
                        <BsLinkedin className="follow-us-icon" />
                        <BsFacebook className="follow-us-icon" />
                    </div>
                </div>
           </div>
        )
    }
}

export default Login