import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import './CSS/welcome.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CONSTANTS from './CONSTANTS';



class LeaveApply extends React.Component {

    constructor(props) {

        
        super(props)
        
        this.state = {
            isLoggedIn: props.isLoggedIn,
            user: props.user,
            clickedCancel : false,
            clickApplied : false,
            empDetails:props.empDetails,
            fromDate: new Date(),
            toDate: new Date()
        }

        
    }
    
    clickApply() {
        //CALL POST API WHICH SAVES LEAVE
        this.setState({fromDate: null })
        this.setState({toDate: null })
        this.setState({clickApplied: true })
        this.setState({clickedCancel: false })
        NotificationManager.success(CONSTANTS.APPLY_LEAVE_SUCCESS, '', 3000);
        
      }

      clickCancel() {
        this.setState({fromDate: null })
        this.setState({toDate: null })
        this.setState({clickedLeaveStatus: true })
        this.setState({clickedCancel: false })
    }
      handleFromChange = date => {
        this.setState({
            fromDate: date
        });
      };

      handleToChange = date => {

        if (date < this.state.fromDate) {
            NotificationManager.warning('To Date MUST be after From Date', '', 3000);
            this.setState({
                toDate: new Date()
            });
        } else {
            this.setState({
                toDate: date
            });
        }
        
      };
  
    render() {
      return (
        <div>
                <div>

                <NotificationContainer/>
                
                <div class="col-md-12">
                    <br></br>
                    <strong>Apply Leaves:</strong>
                    <div class="card-box">
                        <div class="table table-striped">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Leave Type</th>
                                        <th>Approver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <DatePicker 
                                                selected={this.state.fromDate}
                                                onChange={this.handleFromChange}/></td>
                                        <td> <DatePicker 
                                                selected={this.state.toDate}
                                                onChange={this.handleToChange}/></td>
                                        <td>
                                        <div class="form-group">
                                            <br/>
                                            <select name = "leave-type" class="form-control">
                                            <option value="Personal timeOff">Personal timeOff</option>
                                            <option value="Leave without paid">Leave without paid</option>
                                            <option value="Sick leave">Sick leave</option>
                                            </select>
                                            </div>    
                                        </td>
                                        <td>{this.props.empDetails.projectManager}</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-5"></div>
                        <div class="col-md-4">
                            <span><button class="btn btn-outline-success" onClick={this.clickApply.bind(this)}>Apply</button></span> &nbsp;
                            <span><button class="btn btn-outline-danger" onClick={this.clickCancel.bind(this)}>cancel</button></span>
                        </div>
                        <div class="col-md-4"></div>
                    </div>
                </div>
            
            
         
            </div>
      )
    }
  
  }

  export default LeaveApply;