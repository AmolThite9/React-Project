import React, {Component} from 'react'

class Login extends Component {

    state = {
        startDate: new Date()
      };

    handleChange = date => {
    this.setState({
      startDate: date
    });
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }

}

export default Login
