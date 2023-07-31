import {Component} from 'react'
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import ForgetPassword from './components/ForgetPassword'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Achievements from './components/Achievements'
import AddPost from './components/AddPost'
import Explore from './components/Explore'
import Profile from './components/Profile'
import About from './components/About'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/forget-password" component={ForgetPassword} />
          <Route exact path="/sign-up" component={SignUp} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/achievements" component={Achievements} />
          <ProtectedRoute exact path="/add-post" component={AddPost} />
          <ProtectedRoute exact path="/explore" component={Explore} />
          <ProtectedRoute exact path="/profile-details" component={Profile} />
          <ProtectedRoute exact path="/about-college-media" component={About} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App