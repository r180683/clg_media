import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {BiSearch} from 'react-icons/bi'
import {v4 as uuidv4} from 'uuid'
import CollegeOption from '../CollegeOption'
import './index.css'

const collegeOptions=[
    {id:uuidv4(),display_text:"RGUKT Rk Valley",studentInfo:[{id:"R180683",name:"Avula Dinesh",email:"r180683@rguktrkv.ac.in"},{id:"R180670",name:"Devanaboina Pradeep",email:"r180670@rguktrkv.ac.in"},{id:"R180649",name:"Sampreeth Stanley",email:"r180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"RGUKT Nuzvid",studentInfo:[{id:"N180683",name:"Avula Dinesh",email:"n180683@rguktrkv.ac.in"},{id:"N180670",name:"Devanaboina Pradeep",email:"n180670@rguktrkv.ac.in"},{id:"N180649",name:"Sampreeth Stanley",email:"n180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"RGUKT Ongole",studentInfo:[{id:"O180683",name:"Avula Dinesh",email:"o180683@rguktrkv.ac.in"},{id:"O180670",name:"Devanaboina Pradeep",email:"o180670@rguktrkv.ac.in"},{id:"O180649",name:"Sampreeth Stanley",email:"o180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"RGUKT Srikakulam",studentInfo:[{id:"S180683",name:"Avula Dinesh",email:"s180683@rguktrkv.ac.in"},{id:"S180670",name:"Devanaboina Pradeep",email:"s180670@rguktrkv.ac.in"},{id:"S180649",name:"Sampreeth Stanley",email:"s180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"IIIT Hyderabad",studentInfo:[{id:"H180683",name:"Avula Dinesh",email:"h180683@rguktrkv.ac.in"},{id:"H180670",name:"Devanaboina Pradeep",email:"h180670@rguktrkv.ac.in"},{id:"H180649",name:"Sampreeth Stanley",email:"h180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"MITS Engineering College",studentInfo:[{id:"M180683",name:"Avula Dinesh",email:"m180683@rguktrkv.ac.in"},{id:"M180670",name:"Devanaboina Pradeep",email:"m180670@rguktrkv.ac.in"},{id:"M180649",name:"Sampreeth Stanley",email:"m180649@rguktrkv.ac.in"}]},
    {id:uuidv4(),display_text:"Vellore Engineering College",studentInfo:[{id:"V180683",name:"Avula Dinesh",email:"v180683@rguktrkv.ac.in"},{id:"V180670",name:"Devanaboina Pradeep",email:"v180670@rguktrkv.ac.in"},{id:"V180649",name:"Sampreeth Stanley",email:"v180649@rguktrkv.ac.in"}]},
]

class SignUp extends Component{
    state={clgid:'',clgname:'',email:'',ShowEmailErrMsg:false,showGenerateBtn:false,showUserMisMatch:false,showgeneratePassText:false}

    changeCollegeName=event=>{
        this.setState({searchValue:event.target.value},this.getCollegeFiletredList)
    }

    updateCollege=(id,name)=>{
        this.setState({clgid:id,searchValue:name})
    }

    updateEmail=event=>{
        const value=event.target.value 
        const result1=value.endsWith("@gmail.com")
        const result2=value.endsWith(".ac.in")
        const result=result1 || result2
        if(result===true){
            this.setState({ShowEmailErrMsg:false,email:event.target.value})
        }
        else{
            this.setState({ShowEmailErrMsg:true,email:event.target.value})
        }
    }

    getCollegeFiletredList=()=>{
        const {searchValue,}=this.state
        const filteredList=collegeOptions.filter(each=>each.display_text.toLowerCase().includes(searchValue))
        return filteredList
    }

    submitSignupForm=event=>{
        event.preventDefault()
        const {searchValue,email}=this.state
        const filteredList=collegeOptions.filter(each=>each.display_text===searchValue)
       if(filteredList.length===0){
        this.setState({showUserMisMatch:"College and email didnt match"})//user didn't relate to any college
       }
       else{
        const newStudentDetails=filteredList[0].studentInfo.filter(each=>each.email===email)
        if(newStudentDetails.length===0){
            this.setState({showUserMisMatch:"*College and email didn't match"})
        }
        else{
            const usersCredentials=localStorage.getItem("usersCredentials")
            const usersCredentialsList=JSON.parse(usersCredentials)
            //checking newly entered user alreay exists or not
            const isValidUser=usersCredentialsList.filter(each=>each.email===email)
            if(isValidUser.length===0){
                const newUserDetails={username:newStudentDetails[0].id,email:email,name:newStudentDetails[0].name,password:newStudentDetails[0].id,category:"student"}
                const updatedUserCredentials=[...usersCredentialsList,newUserDetails]
                const value=JSON.stringify(updatedUserCredentials)
                    localStorage.setItem("usersCredentials",value)
            this.setState({showGenerateBtn:true,showUserMisMatch:"",ShowEmailErrMsg:false})
            }
            else{
                this.setState({showUserMisMatch:"*user already Exists"})
            }
        }
       }

    }

    generatePassword=()=>{
        this.setState({showgeneratePassText:true,showUserMisMatch:""})
    }

    renderShowGeneratepasswordText=()=>(
        <div className="signup-generate-container">
            <h1 className="thanks">Thank you requesting an account in College media</h1>
            <p className="notify">We will reviewing your request and send you password once you are valid student in the selected college</p>
            <p className="sign-up-login"><Link to="/login" ><span className="click-here">Click Here </span></Link>to Login</p>
        </div>
    )

    render(){
        const {searchValue,email,ShowEmailErrMsg,showGenerateBtn,showUserMisMatch,showgeneratePassText}=this.state
        const filteredList=this.getCollegeFiletredList()
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken!==undefined){
            return <Redirect to="/" />
        }
        return(
            <div className="signup-page-container">
                <div className="signup-pagee-container">
                    <div className="signup-logo-container">
                        <Link to="/">
                            <img className="signup-logo" src="https://img.freepik.com/premium-vector/cm-mc-circle-shape-branding-minimal-logo_649646-13.jpg" alt="App-logo" />
                        </Link>
                        <h1 className="signup-logo-head">College Media</h1>
                    </div>
                    <div className="sign-up-container">
                        <form onSubmit={this.submitSignupForm} className="signup-form-container">
                            <label className="college-heading">Select Your college</label>
                            <div className="college-search-container">
                                <input id="searchEl" value={searchValue} className="signup-clg-search" onChange={this.changeCollegeName} placeholder="Enter Your College Name" type="search" />
                                <div className="signup-page-search-icon-container">
                                 <BiSearch onClick={this.getCollegeFiletredList} className="signup-page-search-icon" />   
                                </div>
                            </div>
                            
                            {filteredList.map(each=>(
                                <CollegeOption updateCollege={this.updateCollege} collegeDetails={each} key={each.id} />
                            ))}
                            <div className="signup-emaill-container">
                                <input placeholder="Enter Your Email" className="signup-emaill" onChange={this.updateEmail} value={email} type="email" /><br />
                            </div>
                            {ShowEmailErrMsg && <p className="email-error">*Email must be correct Format</p>}
                            <div className="form-buttons-container">
                                <button disabled={showGenerateBtn} className="signup-form-btn" type="submit">Submit</button>
                                {showGenerateBtn && <button onClick={this.generatePassword} className="signup-form-generate-btn" type="button">Generate Password</button>}
                                <p className="email-error">{showUserMisMatch}</p> 
                            </div>
                        </form>
                        {showgeneratePassText && this.renderShowGeneratepasswordText()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp)