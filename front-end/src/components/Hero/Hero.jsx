import React, { useContext } from "react";
import { NewsContext } from "../Context/NewsContext";
import "./hero.scss";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
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
  const allNews = useContext(NewsContext);
  return (
    <section className="hero__section">
      <Carousel fade controls={false}>
        {allNews.slice(0, 3).map((data, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 fluid"
                src={data.image}
                alt="First slide"
              />
              <Carousel.Caption className="align-center">
                <Link to={data.compTag && data.compTag.replace(/\s/g, "")}>
                  <Button className="text-white" variant={`${convertTag(data.compTag)}`} >
                    {" "}
                    {data.compTag}
                  </Button>
                </Link>
                <h1> {data.newsTitle.substring(0, 53)} {data.newsTitle.length >= 53 && "."}</h1>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="hwrap">
        <div className="parallelogram">
          {" "}
          <h6>Breaking News</h6>
        </div>
        <div className="triangle-bottom-left"> </div>
        <div className="hmove">
          {allNews.map((data, index) => {
            return (
              <div className="hitem" key={index}>
                {data.newsTitle} <span className="slash"></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
