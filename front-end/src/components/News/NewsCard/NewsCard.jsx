import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./newscard.scss";

const NewsCard = ({
  _id,
  image,
  compTag,
  newsTitle,
  firstHead,
  createdBy,
  createdAt,
}) => {

 
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
      <Card className="border-0 latest__news-card">
        <Card.Img variant="top" height={250} src={image} />

        <Link to={`/${compTag.replace(/\s/g, "")}`}>
          {" "}
          <Button className="text-white" variant={convertTag(compTag)}>
            {compTag}
          </Button>
        </Link>

        <Card.Body>
          <Card.Text>
            {new Date(createdAt).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Card.Text>
          <Link to={`/News/${_id}`} className="text-white text-decoration-none">
            <Card.Title className="mb-4">
              {newsTitle.substring(0, 45)} {newsTitle.length >= 45 && "..."}
            </Card.Title>
          </Link>

          <Card.Text className="text-white">
            {firstHead.substring(0, 110)} {firstHead.length >= 110 && "..."}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-white "> {createdBy}</small>
        </Card.Footer>
      </Card>
    </>
  );
};

export default NewsCard;
