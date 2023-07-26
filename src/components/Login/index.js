import {Component} from 'react'
import React from 'react'
import Cookies from 'js-cookie'
import {BsInstagram,BsYoutube,BsTwitter,BsLinkedin,BsFacebook} from 'react-icons/bs'
import ReactPlayer from 'react-player'
import LoginOption from '../LoginOption'
import {Link,Redirect} from 'react-router-dom'
import './index.css'

import Header from '../Header'
import {AiOutlineSearch} from 'react-icons/ai'
import {v4 as uuidv4} from 'uuid'


const loginOptions=[
    {id:1,name:"student",display_text:"Student"},
    {id:2,name:"faculty",display_text:"Faculty"},
    {id:3,name:"admin",display_text:"Admin"},
]

class Login extends Component{
    state={username:"",password:"",activeTabId:loginOptions[0].id,errorMsg:""}


    updateUsername=event=>{ 
        this.setState({username:event.target.value})
    }

    updatePassword=event=>{
        this.setState({password:event.target.value})
    }

    getUserCredentialsList=()=>{
        const usersList=localStorage.getItem("usersCredentials")
        return JSON.parse(usersList)
    }


    submitForm=event=>{
        event.preventDefault()
        const {activeTabId,username,password}=this.state
        const usersCredentials=this.getUserCredentialsList()
        console.log(usersCredentials)
        const filteredList=usersCredentials.filter(each=>each.username===username)
        if(filteredList.length===0){
            this.setState({errorMsg:"*Username doesn't exist"})
        }
        else if(filteredList[0].password!==password){
            this.setState({errorMsg:"*Username and Password didn't match"})
        }
        else{
            this.setState({username:"",password:"",errorMsg:""})
            Cookies.set("jwt_token",username)
            const {history}=this.props
            history.push("/")
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

    render(){
        const {username,password,activeTabId,errorMsg}=this.state
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken!==undefined){
            return <Redirect to="/" />
        }
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
                            </div>
                            <div className="input-label-container">
                                <label htmlFor="password" className="label-heading">Password</label>
                                <input value={password} onChange={this.updatePassword} placeholder="PASSWORD" className="input-container" id="password" type="password" />
                                <p className="error-msg">{errorMsg}</p><br />
                            </div>
                            <div className="form-submit-btn">
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