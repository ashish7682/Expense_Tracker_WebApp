import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import img from "../images/signup.png";

import Spinner from "../component/Spinner";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //from submit
  const submitHandler = async (values) => {
    // console.log(values);
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        values
      );
      message.success("Registartion Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("invalid username or password");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="main-div">
        <div className="img-div">
          <img src={img} alt=" " />
        </div>
        <div className="register-page">
          {loading && <Spinner />}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Registration form</h1>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/login">Already Register ? Click Here to login</Link>
              <button className="btn btn-primary">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
