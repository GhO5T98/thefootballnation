import React, { useState, useContext, useEffect } from "react";
import { NewsContext } from "../Context/NewsContext";
import "./competitions.scss";
import Footer from "../Footer/Footer";
import Banner from "../../assets/banner.jpg";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Breadcrumb,
  Pagination,
} from "react-bootstrap";
import axios from "axios";
import NewsCard from "../News/NewsCard/NewsCard";

const Laliga = () => {
  const allNews = useContext(NewsContext);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://api.football-data.org/v4/competitions/PD/standings",
          {
            headers: {
              "X-Auth-Token": "b2c4093120a849758f1e9ffbc8f9d99d",
            },
          }
        ); // Replace 'API_URL' with the actual API endpoint for standings data
        setStandings(response.data.standings);
        console.log("succes");

        setLoading(false);
      } catch (error) {
        setError("Error fetching standings data.");
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const laLigaNews = allNews.filter((obj) => obj.compTag === "La Liga");

  //Pagination//
  const objectsPerPage = 2;

  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const lastPage = Math.ceil(laLigaNews.length / objectsPerPage);
  const currentObjects = laLigaNews.slice(
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
        <img className="fluid" src={Banner} alt="Banner" />
        <h1 className="transfers__hero-txt">La Liga</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>La Liga</Breadcrumb.Item>
        </Breadcrumb>
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
            <Row className="socialmedia__header   mb-4">
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
            <Row className="standings__header mt-5  mb-4">
              <h1>Standings</h1>
            </Row>
            <Row className="standings__row">
              {" "}
              <Table striped bordered hover className="costum__table">
                <thead className="table__head">
                  <tr>
                    <th>POS</th>
                    <th>TEAM</th>
                    <th>PL</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row) => {
                    return (
                      <>
                        {row.table.map((dat,index) => {
                          return (
                            <tr key={index}>
                              <td>{dat.position}</td>
                              <td>
                                {" "}
                                <img
                                  src={dat.team.crest}
                                  alt={dat.team.name}
                                  width="15"
                                  height="15"
                                />{" "}
                                {dat.team.tla}
                              </td>
                              <td>{dat.playedGames}</td>
                              <td>{dat.won}</td>
                              <td>{dat.draw}</td>
                              <td>{dat.lost}</td>
                              <td>{dat.points}</td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </section>
  );
};

export default Laliga;
