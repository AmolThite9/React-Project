import React from 'react';

const PendingRequests = ({ pendingRequestsData }) => {
    return (
        
        
        
        <div class="col-md-12">
            <br></br>
            <strong>Pending request Status:</strong>
            <div class="card-box">
                <div class="table table-striped">
                    <table class="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Applicant's Name</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Approve</th>
                                <th>Denied</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingRequestsData.map((PendingRequest) => (
                                    <tr>
                                <td>{PendingRequest.employee.firstName} {PendingRequest.employee.lastName}</td>
                                <td> {PendingRequest.from}</td>
                                <td> {PendingRequest.to}</td>
                                <td> {PendingRequest.type}</td>
                                <td> {PendingRequest.status}</td>
                                <td><button class="btn btn-outline-success">Approve</button></td>
                                <td><button class="btn btn-outline-danger">Deny</button></td>
                                </tr>
                                )
                                )
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    
    
    
            
    )
  };

  export default PendingRequests;