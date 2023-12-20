import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../images/login.png";
import axios from "axios";
import Spinner from './../component/Spinner';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //from submit

  const submitHandler = async (values) => {
    // console.log(values);
    try {
      setLoading(true)
      const { data } = await axios.post("http://localhost:8080/api/v1/users/login", values);
      setLoading(false)
      message.success("Login successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/");
    } catch (error) {
      setLoading(false)
      message.error("invalid username or password");
    }
  };

  //prevent for login user
  useEffect(() =>{
    if(localStorage.getItem("user"))
    {
      navigate("/");
    }
  },[navigate]);

  return (
    <>
      <div className="main-div">
       
        <div className="img-div">
          <img src={img1} alt=" " />
        </div>
        <div className="login-page">
        {loading && <Spinner/>}
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Login form</h1>

            <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/register">Not a user ? Click Here to register</Link>
              <button className="btn btn-primary">Login</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
