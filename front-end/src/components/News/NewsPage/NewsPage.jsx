import React, { useState, useEffect, useContext } from "react";
import { NewsContext } from "../../Context/NewsContext";
import { AuthContext } from "../../Context/authorContext";
import { Form, Button, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./newspage.scss";
import DisqusComments from "../../DisqusComments";
import Footer from "../../Footer/Footer";
import axios from "axios";
import PopularNewsC from "../PNews/PopularNewsC";

const NewsPage = () => {
  const { id } = useParams();
  const allNews = useContext(NewsContext);
  const navigate = useNavigate();
  const [news, setNews] = useState({});
  const { author } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/getNewsDetail/${id}`)
        .then((res) => {
          setNews(res.data);
          setNewsTitle(res.data.newsTitle);
          setCompTag(res.data.compTag);
          setFirstHead(res.data.firstHead);
          setSecHead(res.data.secHead);
          setFirstP(res.data.firstP);
          setSecP(res.data.secP);
          setHashtags(res.data.hashtags);
          setSelectedFile(res.data.image);
        })
        .catch((err) => {
          console.log("Data not showing " + err);
        });
    };
    fetchData();
  }, [id]);

  //Update Property//
  const [updateMode, setUpdateMode] = useState(false);
  const [newsTitle, setNewsTitle] = useState("");
  const [compTag, setCompTag] = useState("");
  const [firstHead, setFirstHead] = useState("");
  const [firstP, setFirstP] = useState("");
  const [secHead, setSecHead] = useState("");
  const [secP, setSecP] = useState("");
  const [hashtags, setHashtags] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");

  //Image Update//
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

  const handleUpdate = async (id) => {
    const newsUpdate = {
      newsTitle: newsTitle,
      compTag: compTag,
      firstHead: firstHead,
      secHead: secHead,
      firstP: firstP,
      secP: secP,
      hashtags: hashtags,
      image: selectedFile,
    };
    //Update Api//
    await axios
      .patch(`http://localhost:5000/updateNews/${id}`, newsUpdate)
      .then(() => {
        navigate(`/News/${id}`);
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update End//

  //Delete//

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        navigate("/MyNews");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Delete End//

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setHashtags([...hashtags, value]);
    } else {
      setHashtags(hashtags.filter((item) => item !== value));
    }
  };

  function convertTag(compTag) {
    switch (compTag) {
      case "Seria A":
        return "success";
      case "Premier League":
        return "info";
      case "La Liga":
        return "warning";
      case "Ligue 1":
        return "danger";
      case "Bundesliga":
        return "dark";
      case "UCL":
        return "primary";

      default:
        return "unknown";
    }
  }

  
  return (
    <>
      {" "}
      {updateMode ? (
        <section className="add__news">
          <Container className="add__news-section">
            <Row lg={12} className="addnews__header   mb-3">
              <h1>Update News</h1>
            </Row>
            <Row lg={12} className="add-form__section">
              <Col lg={12}>
                {" "}
                <Form>
                  <Row>
                    <Col lg={12}>
                      <Form.Group
                        className="mb-4 text-start"
                        controlId="Fullname"
                      >
                        <Form.Label>
                          News Title <span>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="News Title"
                          className="shadow-none border-0 "
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          minLength="45"
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
                      <Form.Group
                        className="mb-4 text-start"
                        controlId="Subject"
                      >
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
                    <Form.Group
                      className="mb-4 text-start"
                      controlId="FirsTHeader"
                    >
                      <Form.Label>
                        First Header <span>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Header"
                        className="shadow-none border-0 "
                        value={firstHead}
                        onChange={(e) => setFirstHead(e.target.value)}
                        minLength="100"
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
                      onClick={() => handleUpdate(news._id)}
                    >
                      Update News
                    </Button>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="news__page">
          <Container className="mt-5">
            <Row>
              <Col lg={8}>
                <div className="news__col">
                  <img className="fluid" src={news.image} alt="News Img" />
                  <div className="news__txt">
                    <div className="edit__controls">
                      <Link
                        to={`/${
                          news.compTag && news.compTag.replace(/\s/g, "")
                        }`}
                      >
                        <Button
                          className=" text-white"
                          variant={`${convertTag(news.compTag)}`}
                        >
                          {news.compTag}{" "}
                        </Button>
                      </Link>
                      {news.createdBy === author ? (
                        <Dropdown drop="end" className="edit__dropdown">
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic-2"
                          >
                            <i className="bx bx-dots-horizontal-rounded"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="bg-transparent "
                              onClick={() => setUpdateMode(true)}
                            >
                              Edit Post <i className="bx bx-edit"></i>
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="bg-transparent "
                              onClick={() => handleDelete(news._id)}
                            >
                              Delete Post <i className="bx bx-trash"></i>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <></>
                      )}
                    </div>
                    <h1 className="mb-4">{news.newsTitle}</h1>
                    <p>
                      {new Date(news.createdAt).toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="first__p mt-5">
                      <h3>{news.firstHead}</h3>
                      <p>{news.firstP}</p>
                    </div>
                    <div className="second__p mt-5">
                      <h3>{news.secHead}</h3>
                      <p>{news.secP}</p>
                      <p id="author">Author: {news.createdBy}</p>
                    </div>
                  </div>
                </div>

                <Row lg={12} className="mt-3 share__buttons">
                  <Col xs={6} sm={6} lg={6}>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="share__fb">
                        <i className="bx bxl-facebook-square"></i>Share On
                        Facebook!
                      </Button>
                    </a>
                  </Col>
                  <Col xs={6} sm={6} lg={6}>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="share__twitter">
                        <i className="bx bxl-twitter"></i>Share On Twitter!
                      </Button>
                    </a>
                  </Col>
                </Row>
                <Row lg={8} className="mt-3 mb-5 disqus">
                  <Col lg={12} className="mt-5 ">
                    <DisqusComments />
                  </Col>
                </Row>
              </Col>
              <Col className="popular__news" lg={4}>
                <Row className="news-header  mb-4">
                  <h1>Social Media</h1>
                </Row>
                <Row lg={12} className="social__media">
                  <Col xs={6} sm={6} lg={6} className="mb-4">
                    {" "}
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="insta">
                        Follow Us! <i className="bx bxl-instagram"></i>
                      </Button>
                    </a>
                  </Col>
                  <Col xs={6} sm={6} lg={6} className=" mb-4">
                    {" "}
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="yt">
                        Follow Us! <i className="bx bxl-youtube"></i>
                      </Button>
                    </a>
                  </Col>
                  <Col xs={6} sm={6} lg={6}>
                    {" "}
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="twitter">
                        Follow Us! <i className="bx bxl-twitter"></i>
                      </Button>
                    </a>
                  </Col>
                  <Col xs={6} sm={6} lg={6}>
                    {" "}
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button id="fb">
                        Follow Us! <i className="bx bxl-facebook-square"></i>
                      </Button>
                    </a>
                  </Col>
                </Row>
                <Row className="news-header mt-5  mb-4">
                  <h1>Popular News</h1>
                </Row>
                <Row className="ms-1 me-1 popular__news-row">
                  {allNews.map((data, index) => {
                    return <PopularNewsC key={index} {...data} index={index} />;
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
          <Footer />
        </section>
      )}
    </>
  );
};

export default NewsPage;
