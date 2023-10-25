import React from "react";
import "./passreset.scss";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Img from "../../../assets/tfnlogo.png";


const PassReset = () => {
  
  return (
    <>
    <section className="reset__pass">
      <div className="left__side">
      <img src={Img} alt="" />
        <div className="left-side__text">
          <h1>The Football Nation</h1>
         
        </div>
      </div>

      <div className="right__side">
        <Container>
          <div className="reset__text">
            <h1>Forgot Password?</h1>
            <p>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password. <br /> <br /> For security
              reasons, we do NOT store your password. So rest assured that we
              will never send your password via email.
            </p>
          </div>
          <div className="reset__form">
            <Form>
              <Form.Group controlId="formBasicEmail" className="w-100">
                <Form.Label>Email address <span>*</span></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="rounded-0"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Button variant="dark" type="submit" className="rounded-0">
                Reset Password
              </Button>
            </Form>
          </div>
        </Container>
        <h4 className="bottom__text">
          New user?<Link to={"/SignUp"}> Create an account</Link>
        </h4>

        <Link to={"/SignIn"} className="back__button">
          <i className="bx bxs-chevron-left"></i>
        </Link>
      </div>
    </section>
    </>
  );
};

export default PassReset;
