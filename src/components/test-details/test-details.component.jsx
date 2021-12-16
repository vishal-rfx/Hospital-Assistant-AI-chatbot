import React from "react";
import "./test-details.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { API } from "aws-amplify";
import {UPDATE_COVID_STATUS_API} from "../../helper functions/api-endpoints"

class TestDetails extends React.Component {
  INITIAL_STATE = {
    userRefId: "",
    name: "",
    status: "0",
  };

  constructor(props) {
    super(props);

    this.state = this.INITIAL_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userRefId, name, status } = this.state;

    const data = {
      body: {
          userRefId : userRefId,
          name : name,
          status : status
        },
    }
    console.log(data.body);

    const response = await API.post(
      UPDATE_COVID_STATUS_API.API_NAME,
      UPDATE_COVID_STATUS_API.ENDPOINTS.UPDATE,
      data
    );

    if(response.status ==="200"){
      alert("Patient Data is updated");
      this.setState(this.INITIAL_STATE);
      //this.props.history.push('/')
      console.log(this.props.history)

    }
    else{
      alert("Operation Failed")
      console.log(response.error)
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(name,value)
    // console.log(this.state)
  };

  render() {
    const { userRefId, name, status } = this.state;
    return (
      <div className="add">
        <h2 className="title">Update Test Details</h2>
        <form className="add-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="userRefId"
            value={userRefId}
            onChange={this.handleChange}
            label="User reference ID"
            required
          />
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Name"
            required
          />

          <select className="form-input" name="status" onChange={this.handleChange}>
            <option value="0">Processing</option>
            <option value="-1">Negative</option>
            <option value="1" >Positive</option>
          </select>

          <CustomButton type="submit">Update</CustomButton>
        </form>
      </div>
    );
  }
}

export default TestDetails;
