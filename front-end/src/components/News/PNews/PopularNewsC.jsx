import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PopularNewsC = ({ _id, compTag, newsTitle,index }) => {
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
      <Card key={_id} className="mb-4">
        <Row>
          <Col xs={3} sm={3} lg={3} className=" popular-nr">
            <Card.Title>0{index + 1}</Card.Title>
          </Col>
          <Col xs={9} sm={9} lg={9}>
            <Card.Body>
              {" "}
              <Button
                className="popular__btn text-white" 
                variant={`${convertTag(compTag)}`}
                href={`/${compTag && compTag.replace(/\s/g, "")}`}
              >
                {compTag}
              </Button>
              <Link
                className="text-light text-decoration-none"
                to={`/News/${_id}`}
              >
                <Card.Text className="mt-2"> {newsTitle.substring(0, 49)} {newsTitle.length >= 49 && "..."}</Card.Text>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PopularNewsC;
