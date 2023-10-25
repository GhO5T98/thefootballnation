import React, { useRef, useState } from "react";
import "./contact.scss";
import Banner from "../../assets/banner.jpg";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  //Form Submit//
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_p2ej2on",
        "template_vkhc2ts",
        form.current,
        "6PmdCCLjch6d_UDrg"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Your Message Has Been Sent !");
          resetForm();
        },
        (error) => {
          console.log(error.text);
          toast.error("Message Not Sent!");
        }
      );
  };
  //Form Submit//

  //Form Reset//
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [records, setRecords] = useState([]);
  const resetForm = (e) => {
    setRecords([...records, formValues]);
    setFormValues({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <section className="transfers__section">
      <div className="transfers__hero">
        <img className="fluid" src={Banner} alt="Our Agents" />
        <h1 className="transfers__hero-txt">Contact Us</h1>
        <div className="overlay"></div>
      </div>

      <Container className="contact__section">
        <Row lg={12} className="form__header   mb-3">
          <h1>Contact Form</h1>
        </Row>
        <Row lg={12} className="form__section">
          <Col lg={4} className="mt-1">
            <h1>Questions? Send us a Message!</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae odio
              rem fuga nisi nam ratione.
            </p>
          </Col>
          <Col lg={8}>
            {" "}
            <Form ref={form} onSubmit={sendEmail}>
              <Row>
                <Col lg={4}>
                  <Form.Group className="mb-4 text-start" controlId="Fullname">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      className="shadow-none border-0 "
                      name="user_name"
                      value={formValues.fullName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-4 text-start" controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      className="shadow-none border-0 "
                      name="user_email"
                      value={formValues.email}
                      onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-4 text-start" controlId="Subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      className="shadow-none border-0 "
                      name="email_subject"
                      value={formValues.subject}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          subject: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-4 text-start" controlId="Message">
                  <Form.Label>
                    Your Text <span>*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="shadow-none border-0 "
                    name="message"
                    value={formValues.message}
                    onChange={(e) =>
                      setFormValues({ ...formValues, message: e.target.value })
                    }
                  />
                </Form.Group>
              </Row>
              <Row lg={12} className="justify-content-center">
                <Button
                  variant="dark"
                  type="submit"
                  className="mt-2 "
                  value="Send"
                >
                  Send Message
                </Button>
              </Row>
            </Form>
            <ToastContainer
              oastContainer
              position="bottom-left"
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </section>
  );
};

export default Contact;
