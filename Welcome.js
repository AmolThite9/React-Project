import React from 'react';
import LeaveStatus from './LeaveStatus'
import LeaveApply from './LeaveApply'
import './CSS/login.css'
import axios from 'axios';
import PendingRequests from './PendingRequests'
import CONSTANTS from './CONSTANTS';

class Welcome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user,
            clickedLeaveStatus : false,
            clickApplied : false,
            empDetails:props.empDetails,
            onSignOut : props.onSignOut,
            leavesData : [],
            pendingRequests : [],
            pendingButton: false
        }

        var x=  document.getElementById("signOutButton");
        x.style.display = "inline";
    }
    
    clickApplyLeave() {
        this.setState({clickApplied: true })
        this.setState({clickedLeaveStatus: false })
        this.setState({pendingButton: false})
    }

    async clickLeaveStatus() {
        let leaves = []
        await axios.get(CONSTANTS.HOST_URL + CONSTANTS.GET_EMP_LEAVE_DETAILS)
        .then(function (response) {
            leaves= response.data          
        })
        this.setState({leavesData: leaves})
        this.setState({clickedLeaveStatus: true })
        this.setState({clickApplied: false })
        this.setState({pendingButton: false})
    }

    async clickPendingRequests() {
        let pendingRequests = []
        await axios.get(CONSTANTS.HOST_URL + CONSTANTS.PENDING_REQUEST).then(function (response) {
            pendingRequests = response.data
        })
        this.setState({pendingRequests: pendingRequests})
        console.log(pendingRequests)
        this.setState({clickedLeaveStatus: false })
        this.setState({clickApplied: false })
        this.setState({pendingButton: true})

    }


    render() {

        let button;
        let pendingButtonDisplay = <span></span>;
        
        if (this.state.clickedLeaveStatus) {
            button = <LeaveStatus 
                        leavesData={this.state.leavesData}
                    />
        };
        if (this.state.clickApplied) {button =
            <LeaveApply empDetails={this.state.empDetails} 
            onSingOut={this.state.onSignOut}/>
        };

        if (this.state.pendingButton) {
            button = <div><PendingRequests pendingRequestsData={this.state.pendingRequests}/></div>
        };

        if(this.props.empDetails.designation === 'Software Engineer') {
            pendingButtonDisplay = <span><button class="btn btn-outline-primary" onClick={this.clickPendingRequests.bind(this)}>Pending Requests</button></span>
        }
        return (
            <div>
                
                
                <div class="col-md-12">
                <br></br>
                <h6>Welcome {this.props.empDetails.firstName}, here are your details</h6>
                    <div class="card-box">
                        <div class="table table-striped">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last name</th>
                                        <th>username</th>
                                        <th>Contact number</th>
                                        <th>Designation</th>
                                        <th>Remaining Leaves</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {this.props.empDetails.empNumber}</td>
                                        <td> {this.props.empDetails.firstName}</td>
                                        <td> {this.props.empDetails.lastName}</td>
                                        <td> {this.props.empDetails.userName}</td>
                                        <td> {this.props.empDetails.contact}</td>
                                        <td> {this.props.empDetails.designation}</td>
                                        <td> {this.props.empDetails.remainingLeaves}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            
            

                    <div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4"> 
                            <span><button class="btn btn-outline-primary" onClick={this.clickApplyLeave.bind(this)}>apply Leave</button></span>
                            &nbsp;<span><button class="btn btn-outline-primary" onClick={this.clickLeaveStatus.bind(this)}>Status of Leave</button></span>&nbsp;
                            
                            {pendingButtonDisplay    }
                            
                            
                        </div>  
                        <div class="col-md-4"> </div>   
                    </div>
                    <div>
                        {
                            button
                            
                        }
                    </div>
            </div>
                 
            )
    }
  
  }

export default Welcome