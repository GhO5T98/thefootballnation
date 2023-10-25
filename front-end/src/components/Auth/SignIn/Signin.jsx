import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signin.scss";
import Img from "../../../assets/tfnlogo.png";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Author = {
      fullName: fullName,
      password: password,
    };
    // Therritja e api
    await axios
      .post("http://localhost:5000/signin", Author)
      .then((res) => {
        window.localStorage.setItem("token", res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("User not found" + error);
        toast.error("User not found");
      });
  };

  return (
    <section className="sign__in">
      <div className="left__side">
        <img src={Img} alt="" />
        <div className="left-side__text">
          <h1>The Football Nation</h1>
        </div>
      </div>

      <div className="right__side">
        <Container>
          <h1>Sign In</h1>
          <div className="signin__form">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="w-100">
                <Form.Label>
                  Full Name <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  className="rounded-0"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="w-100 ">
                <Form.Label>
                  Password <span>*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="rounded-0"
                />
                <Form.Text className="text-muted">
                  <Link to={"/PasswordReset"}>Forgot Password?</Link>
                </Form.Text>
              </Form.Group>
              <Button variant="dark" type="submit" className="rounded-0">
                Sign In
              </Button>
              <ToastContainer
                oastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </Form>
          </div>
        </Container>
        <h4 className="bottom__text">
          New user?<Link to={"/SignUp"}> Create an account</Link>
        </h4>
      </div>
    </section>
  );
};

export default Signin;
