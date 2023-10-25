import React, { useState, useContext } from "react";
import { NewsContext } from "../Context/NewsContext";
import Footer from "../Footer/Footer";
import Banner from "../../assets/banner.jpg";
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import NewsCard from "../News/NewsCard/NewsCard";
// import axios from "axios";

const LatestNews = () => {
  const allNews = useContext(NewsContext);

  const latestNews = allNews.sort((a, b) => b.createdAt - a.createdAt);

  //Pagination//
  const [currentPage, setCurrentPage] = useState(1);
  const objectsPerPage = 2;

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const lastPage = Math.ceil(latestNews.length / objectsPerPage);
  const currentObjects = latestNews.slice(
    indexOfFirstObject,
    indexOfLastObject
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage === lastPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(lastPage);
  };
  return (
    <section className="transfers__section">
      <div className="transfers__hero">
        <img className="fluid" src={Banner} alt="Small Hero" />
        <h1 className="transfers__hero-txt">Latest News</h1>
        <div className="overlay"></div>
      </div>

      <Container>
        <Row lg={12}>
          <Col lg={8}>
            <Row xs={1} md={2} className="g-4">
              {currentObjects.map((data, index) => {
                return (
                  <Col key={index} lg={6}>
                    <NewsCard {...data} />
                  </Col>
                );
              })}
            </Row>
            <Row className="mt-5 ">
              <Col className=" pagination__col">
                {" "}
                <Pagination>
                  <Pagination.First onClick={() => handleFirstPage()} />
                  <Pagination.Prev onClick={() => handlePrevPage()} />
                  {Array.from({
                    length: lastPage,
                  }).map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handleNextPage()} />
                  <Pagination.Last onClick={() => handleLastPage()} />
                </Pagination>
              </Col>
            </Row>
          </Col>
          <Col className="transfers__social-media" lg={4}>
            <Row className="socialmedia__header   mb-3">
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
          </Col>
        </Row>
      </Container>

      <Footer />
    </section>
  );
};

export default LatestNews;
