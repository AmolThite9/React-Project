import React from 'react';
import Welcome from './Welcome';
import axios from 'axios';
import './CSS/login.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CONSTANTS from './CONSTANTS';


class LoginForm extends React.Component {


  async handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    var isValidCredential = true;
    let emp;
    
    await axios.get(CONSTANTS.HOST_URL+CONSTANTS.LOGIN)
    .then(async function (response) {
    if(response.data.Status === 'Successful') {
      isValidCredential = true
      NotificationManager.success(CONSTANTS.MSG_SIGNIN_SUCCESS, '', 3000);
      
      await axios.get(CONSTANTS.HOST_URL+CONSTANTS.GET_EMP_DETAILS)
        .then(function (response) {
          emp= response.data          
        })
        
    } else {
      isValidCredential = false
      NotificationManager.info(CONSTANTS.MSG_INVALID_CREDENTIAL, '', 3000);
    }
  })

  await this.props.onSignIn(isValidCredential, username, emp)
  }

  render() {
    return (
      
      <div class="row" >
        <div class="col-md-4" ></div>
        <div class="col-md-4" id="signIn">
          <h2>Sign in</h2>
          <p>to continue to Leave portal</p>
          <form onSubmit={this.handleSignIn.bind(this)}>
            <div class="form-group">
               <label for="usernameInput"><b>Username:</b></label>
               <input type="email" placeholder="Enter Username" ref="username" name="username" class="form-control" id="usernameInput" required/>
            </div>
            <div class="form-group">
               <label for="Password"><b>Password:</b></label>
               <input type="password" placeholder="Enter Password" ref="password" name="password" class="form-control" required/>
            </div>
            <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Login</button> 
            </div>         
            <div class="form-check">
               <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" name="remember"/> Remember me
               </label>
            </div>
          </form>
        </div>
      <div class="col-md-4"></div>
      </div>
    )
  }

}


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: null,
      empDetails: null
    }
  }

  signIn(isValidCredential, username, emp) {
    
    
    this.setState({user: username })
    this.setState({empDetails: emp })
    this.setState({isLoggedIn: isValidCredential})
    

  }

  signOut() {
    var x=  document.getElementById("signOutButton");
    x.style.display = "none";
    this.setState({ isLoggedIn: false })
    this.setState({user: null })
    NotificationManager.info(CONSTANTS.MSG_SIGNOUT_SUCCESS, '', 3000);
  }

  render() {
    return (
      <div>
        <NotificationContainer/>
        <nav class="navbar navbar-expand-sm bg-info navbar-dark ">
          <div class="container-fluid">
           <div class="navbar-header">
            <a class="navbar-brand" >Leave management System</a>
            </div>
            <button id="signOutButton" class="btn btn-warning navbar-btn" onClick={this.signOut.bind(this)}>Sign Out</button>
          </div>
        </nav>
        
        {
          (this.state.isLoggedIn) ?
            <Welcome
              username={this.state.user}
              empDetails={this.state.empDetails}
              onSignOut={this.signOut.bind(this)}
            />

            :
            <LoginForm
              onSignIn={this.signIn.bind(this)}
            />
        }

      </div>

    )

  }

}
export default App