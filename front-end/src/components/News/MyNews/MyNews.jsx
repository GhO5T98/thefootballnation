import React, { useState, useEffect, useContext } from "react";
import "./mynews.scss";
import {  Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../Context/authorContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyNews = () => {
  const { author } = useContext(AuthContext);
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);

  //Data Fetch//
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/getNews");
        setMyNews(res.data);
      } catch (err) {
        console.log("Data not showing " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //Data Fetch//

  //Data filter by author//
  const filteredNews = myNews.filter((obj) => obj.createdBy === author);
  //Data filter by author//

  //Toast Alert//
  useEffect(() => {
    if (!loading && filteredNews.length === 0) {
      toast.error("You Have Not Created Any Post", {
        toastId: "error1",
      });
    }
  }, [loading, filteredNews]);
  //Toast Alert//

  return (
    <>
      <section className="mynews__dashboard">
        <Container>
          <Row className="mb-5">
            <Col lg={12} className=" mt-5">
              <h1 id="author__fullname">
                {author}
                <i className="bx bxs-user-account"></i>
              </h1>
            </Col>
          </Row>

          {filteredNews.length === 0 ? (
            <Row>
              <ToastContainer
                oastContainer
                position="bottom-left"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
            </Row>
          ) : (
            filteredNews.map((data, index) => (
              <Row className="author__news mt-2" key={index}>
                <Col xs={3} sm={3} md={3} lg={3} className="author__news-item">
                  <img src={data.image} alt="" />
                </Col>
                <Col xs={7} sm={7} md={7} lg={7} className="author__news-item">
                  <Link
                    to={`/News/${data._id}`}
                    className="text-white text-decoration-none"
                  >
                    <h1>
                      {data.newsTitle.substring(0, 40)}{" "}
                      {data.newsTitle.length >= 40 && "..."}
                    </h1>
                  </Link>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} className=" author__news-item">
                  <h1>
                    {" "}
                    {new Date(data.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h1>
                </Col>
              </Row>
            ))
          )}
        </Container>
      </section>
    </>
  );
};

export default MyNews;
