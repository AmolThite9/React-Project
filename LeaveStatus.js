import React from 'react';
class LeaveStatus extends React.Component {

    render() {

        let leavesData = this.props.leavesData;


        return (
            <div>


                <div class="col-md-12">
                    <br />
                    <strong>Leave Status:</strong>
                    <div class="card-box">
                        <div class="table table-striped">
                            <table class="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Cancel</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leavesData.map((leave) => (
                                            (leave.status === 'approved' || leave.status === 'cancelled') ?
                                                <tr>
                                                    <td> {leave.from}</td>
                                                    <td> {leave.to}</td>
                                                    <td> {leave.type}</td>
                                                    <td> {leave.status}</td>
                                                    <td><button class="btn btn-outline-danger" disabled>Cancel</button></td>
                                                    <td><button class="btn btn-outline-success" disabled>Update</button></td>
                                                </tr>
                                                :
                                                <tr>
                                                    <td> {leave.from}</td>
                                                    <td> {leave.to}</td>
                                                    <td> {leave.type}</td>
                                                    <td> {leave.status}</td>
                                                    <td><button class="btn btn-outline-danger" >Cancel</button></td>
                                                    <td><button class="btn btn-outline-success">Update</button></td>
                                                </tr>
                                        )
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>





            </div>
        )
    };
}


export default LeaveStatus;