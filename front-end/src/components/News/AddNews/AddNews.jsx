import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./addnews.scss";
import axios from "axios";
import { AuthContext } from "../../Context/authorContext";

const AddNews = () => {
  const navigate = useNavigate();

  const author = useContext(AuthContext);

  // Cdo input ka nje state
  const [newsTitle, setNewsTitle] = useState("");
  const [compTag, setCompTag] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [firstHead, setFirstHead] = useState("");
  const [secHead, setSecHead] = useState("");
  const [firstP, setFirstP] = useState("");
  const [secP, setSecP] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onFileChange = (event) => {
    let file = event.target.files[0];
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setSelectedFile(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNews = {
      newsTitle: newsTitle,
      compTag: compTag,
      hashtags: hashtags,
      firstHead: firstHead,
      secHead: secHead,
      firstP: firstP,
      secP: secP,
      image: selectedFile,
      createdBy:author.author,
    };

    await axios
      .post("http://localhost:5000/addNews", newNews)
      .then((res) => {
        console.log("Success");
        navigate("/LatestNews");
      })
      .catch((err) => {
        console.log("Error server  not created" + err);
      });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHashtags([...hashtags, value]);
    } else {
      setHashtags(hashtags.filter((item) => item !== value));
    }
  };

  return (
    <section className="add__news">
      <Container className="add__news-section">
        <Row lg={12} className="addnews__header   mb-3">
          <h1>Add News</h1>
        </Row>
        <Row lg={12} className="add-form__section">
          <Col lg={12}>
            {" "}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={12}>
                  <Form.Group className="mb-4 text-start" controlId="Fullname">
                    <Form.Label>
                      News Title <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="News Title"
                      className="shadow-none border-0 "
                      name="user_name"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                     minLength="45" max="53"
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group controlId="formFileMultiple" className="mb-4">
                    <Form.Label>
                      Image <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept=".jpeg, .png, .jpg"
                      className="shadow-none border-0 "
                      onChange={onFileChange}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group className="mb-4 text-start" controlId="Subject">
                    <Form.Label>
                      Competition Tag <span>*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className=" border-0 "
                      value={compTag}
                      onChange={(e) => setCompTag(e.target.value)}
                    >
                      <option value="UCL">UCL</option>
                      <option value="Premier League">Premier League</option>
                      <option value="Seria A">Seria A</option>
                      <option value="La Liga">La Liga</option>
                      <option value="Ligue 1">Ligue 1</option>
                      <option value="Bundesliga">Bundesliga</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={4}>
                  <Form.Group controlId="formFileMultiple" className="mb-4">
                    <Form.Label>
                      Hashtags# <span>*</span>
                    </Form.Label>
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch"
                      label="Transfers"
                      value="Transfers"
                      onChange={handleCheckboxChange}
                    />
                    <Form.Check // prettier-ignore
                      type="switch"
                      id="custom-switch2"
                      label="Gossip"
                      value="Gossip"
                      onChange={handleCheckboxChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-4 text-start" controlId="FirsTHeader">
                  <Form.Label>
                    First Header <span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Header"
                    className="shadow-none border-0 "
                    name="user_name"
                    value={firstHead}
                    onChange={(e) => setFirstHead(e.target.value)}
                    minLength="60" maxLength="61"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4 text-start" controlId="FirstP">
                  <Form.Label>
                    First Paragraph <span>*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="shadow-none border-0 "
                    name="message"
                    value={firstP}
                    onChange={(e) => setFirstP(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  className="mb-4 text-start"
                  controlId="SecondHeader"
                >
                  <Form.Label>
                    Second Header <span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Second Header"
                    className="shadow-none border-0 "
                    name="user_name"
                    value={secHead}
                    onChange={(e) => setSecHead(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4 text-start" controlId="SecondP">
                  <Form.Label>
                    Second Paragraph <span>*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    className="shadow-none border-0 "
                    name="message"
                    value={secP}
                    onChange={(e) => setSecP(e.target.value)}
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
                  Add News
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddNews;
