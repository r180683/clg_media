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

class ForgetPassword extends Component{
    state={clgid:'',clgname:'',searchValue:'',email:'',emailErrMsg:false,clgErrMsg:"",submitErrmsg:false,showGenerateBtn:false,showgeneratePassText:false}

    updateSearchValue=event=>{
        const searchValue=event.target.value 
        if(searchValue===""){
            this.setState({searchValue:event.target.value,clgErrMsg:"*This field is required"})
        }
        else{
            this.setState({searchValue:event.target.value,clgErrMsg:""},this.getCollegeFiletredList)
        }
    }

    updateCollege=(id,name)=>{
        this.setState({clgid:id,searchValue:name})
    }

    updateEmail=event=>{
        const value=event.target.value 
        const result1=value.endsWith("@gmail.com")
        const result2=value.endsWith(".ac.in")
        const result=result1 || result2
        if(value===""){
            this.setState({emailErrMsg:"*This field is required",email:event.target.value})
        }
        else if(result===true){
            this.setState({emailErrMsg:"",email:event.target.value})
        }
        else{
            this.setState({emailErrMsg:"*Email should be correct format",email:event.target.value})
        }
    }

    getCollegeFiletredList=()=>{
        const {searchValue}=this.state
        if(searchValue===""){
            return []
        }
        const filteredList=collegeOptions.filter(each=>each.display_text.toLowerCase().includes(searchValue))
        return filteredList
    }

    submitForgetPwdForm=event=>{
        event.preventDefault()
        const {searchValue,email}=this.state
        const filteredList=collegeOptions.filter(each=>each.display_text===searchValue)
        if(searchValue===""){
            if(email===""){
                this.setState({clgErrMsg:"*This field is required",emailErrMsg:"*This field is required"})
            }
            else{
                this.setState({clgErrMsg:"*This field is required",emailErrMsg:"",submitErrMsg:""})
            }
        }
        else if(email===""){
            this.setState({emailErrMsg:"*This field is required"})
        }
       else if(filteredList.length===0){
        this.setState({submitErrMsg:"*College and email didnt match"})//user didn't relate to any college
       }
       else{
        const newStudentDetails=filteredList[0].studentInfo.filter(each=>each.email===email)
        if(newStudentDetails.length===0){
            this.setState({submitErrMsg:"*College and email didn't match"})
        }
        else{
            const usersCredentials=localStorage.getItem("usersCredentials")
            const usersCredentialsList=JSON.parse(usersCredentials)
            //checking newly entered user alreay exists or not
            const isValidUser=usersCredentialsList.filter(each=>each.email===email)
            if(isValidUser.length===1){
                this.setState({showGenerateBtn:true,clgErrMsg:"",emailErrMsg:"",submitErrMsg:""})
            }
            else{
                this.setState({submitErrMsg:"*user doesn't exist"})
            }
        }
       }

    }

    generatePassword=()=>{
        this.setState({showgeneratePassText:true,submitErrMsg:""})
    }

    renderShowGeneratepasswordText=()=>(
        <div className="forget-generate-container">
            <h1 className="forget-thanks">Your Request is processing</h1>
            <p className="forget-notify">We will reviewing your request and send you password to your email, once you are valid student in the selected college</p>
            <p className="forget-login"><Link to="/login" ><span className="click-here">Click Here </span></Link>to Login</p>
        </div>
    )

    render(){
        const {searchValue,email,clgErrMsg,emailErrMsg,submitErrMsg,showGenerateBtn,showgeneratePassText}=this.state
        const filteredList=this.getCollegeFiletredList()
        const jwtToken=Cookies.get("jwt_token")
        if(jwtToken!==undefined){
            return <Redirect to="/" />
        }
        return(
            <div className="forget-page-container">
                <div className="forget-pagee-container">
                    <div className="forget-logo-container">
                        <Link to="/">
                            <img className="forget-logo" src="https://img.freepik.com/premium-vector/cm-mc-circle-shape-branding-minimal-logo_649646-13.jpg" alt="App-logo" />
                        </Link>
                        <h1 className="forget-logo-head">College Media</h1>
                    </div>
                    <div className="forget-container">
                        <form onSubmit={this.submitForgetPwdForm} className="forget-form-container">
                            <div className="forget-emaill-container">
                                <label className="forget-college-heading">Select Your college</label>
                                <div className="forget-college-search-container">
                                    <input disabled={showGenerateBtn} id="searchEl" value={searchValue} className="forget-clg-search" onChange={this.updateSearchValue} placeholder="Enter Your College Name" type="search" />
                                    <div className="forget-page-search-icon-container">
                                    <BiSearch onClick={this.getCollegeFiletredList} className="forget-page-search-icon" />   
                                    </div>
                                    
                                </div>
                                
                                {filteredList.map(each=>(
                                    <CollegeOption updateCollege={this.updateCollege} collegeDetails={each} key={each.id} />
                                ))}
                                <p className="forget-email-error">{clgErrMsg}</p>
                            </div>
                              
                            <div className="forget-emaill-container">
                                <label className="forget-college-heading">Enter Your Email</label>
                                <input disabled={showGenerateBtn} placeholder="Enter Your Email" className="forget-emaill" onChange={this.updateEmail} value={email} type="email" />
                                <p className="forget-email-error">{emailErrMsg}</p>
                            </div>
                            
                            <div className="forget-form-buttons-container">
                                <button disabled={showGenerateBtn} className="forget-form-btn" type="submit">Submit</button>
                                {showGenerateBtn && <button onClick={this.generatePassword} className="forget-form-generate-btn" type="button">Generate Password</button>}
                            </div>
                            <p className="forget-email-error">{submitErrMsg}</p>
                        </form>
                        {showgeneratePassText && this.renderShowGeneratepasswordText()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ForgetPassword)