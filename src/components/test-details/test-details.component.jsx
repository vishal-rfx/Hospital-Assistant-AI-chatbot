import React from "react";
import "./test-details.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { API } from "aws-amplify";

class StudentDetails extends React.Component {
  INITIAL_STATE = {
    userRefId: "",
    name: "",
    status: "",
  };

  constructor(props) {
    super(props);

    this.state = this.INITIAL_STATE;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userRefId, name, status } = this.state;

    // const data = {
    //   body: {
    //     regno: regno.toUpperCase(),
    //     name: name.toUpperCase(),
    //     password: password,
    //     marks: {
    //       SWE2002,
    //       SWE3002,
    //       SWE4002,
    //     },
    //   },
    // };
    // console.log(data.body);

    // const response = await API.post(
    //   ADD_STUDENT_API.API_NAME,
    //   ADD_STUDENT_API.ENDPOINTS.ADD,
    //   data
    // );

    // if(!response.error){
    //   alert("Student details added");
    //   this.setState(this.INITIAL_STATE);
    // }
    // else{
    //   alert("Operation Failed")
    //   console.log(response.error)
    // }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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

          <select className="form-input">
            <option value="0">Processing</option>
            <option value="-1">Negative</option>
            <option value="1">Positive</option>
          </select>

          <CustomButton type="submit">Update</CustomButton>
        </form>
      </div>
    );
  }
}

export default StudentDetails;
