import React, { useState, useContext, useEffect } from "react";
import { NewsContext } from "../Context/NewsContext";
import "./homenews.scss";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Carousel,
  Pagination,
} from "react-bootstrap";
import Potm from "../../assets/potm.jpg";
// import { Link } from "react-router-dom";
import NewsCard from "../News/NewsCard/NewsCard";
import PopularNewsC from "../News/PNews/PopularNewsC";
import axios from "axios";
import FeaturedNewsC from "../News/FNews/FeaturedNewsC";

const HomeNews = ({ _id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredNews, setFeaturedNews] = useState([]);

  const allNews = useContext(NewsContext);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/get_all")
        .then((res) => {
          setFeaturedNews(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  //Pagination//
  const objectsPerPage = 2;
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const lastPage = Math.ceil(allNews.length / objectsPerPage);
  const currentObjects = allNews.slice(indexOfFirstObject, indexOfLastObject);

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
  //Pagination//

  return (
    <section className="home__news">
      <Container className="mt-5 featured__news-section">
        <Row className="news-header  mb-4">
          <h1>Featured News</h1>
        </Row>

        <Carousel controls={false} indicators={false}>
          {featuredNews.map((slide) => {
            return (
              <Carousel.Item key={slide._id}>
                <Row lg={12} className="featured__news ">
                  {slide.cards.map((data) => {
                    return (
                      <Col lg={4} key={data._id} className="h-100">
                        {" "}
                        <FeaturedNewsC {...data} />
                      </Col>
                    );
                  })}
                </Row>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Container>

      <Container className="second__news-section mt-3">
        <Row className="second__news" lg={12}>
          <Col className="latest__news" lg={8}>
            <Row className="news-header  mb-4">
              <h1>Latest News</h1>
            </Row>
            <Row xs={1} sm={2} md={2} className="g-4">
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
          <Col className="popular__news" lg={4}>
            <Row className="news-header  mb-4">
              <h1>Popular News</h1>
            </Row>
            <Row className="ms-1 me-1 popular__news-row">
              {allNews.map((data, index) => {
                return <PopularNewsC key={index} {...data} index={index} />;
              })}
            </Row>

            <Row className="news-header  mt-5 mb-3">
              <h1>POTM</h1>
            </Row>
            <Row lg={12}>
              <Col lg={12}>
                <Card className="bg-dark text-white mb-4 potm-card">
                  <Card.Img className="fluid" src={Potm} alt="Card image" />
                  <Card.ImgOverlay>
                    <Card.Title className="text-center ">
                      Kylian Mbappe
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            </Row>

            <Row className="news-header  mt-5 mb-3">
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
    </section>
  );
};

export default HomeNews;
