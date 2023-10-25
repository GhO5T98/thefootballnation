import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeaturedNewsC = ({
  _id,
  carouselImg,
  tag,
  tagCol,
  newsTitle,
  createdAt,
}) => {
  return (
    <>
      {" "}
      <Card className="bg-dark text-white  ">
        <Card.Img
          className="featured__news-sm-img"
          src={carouselImg}
          alt="Card image"
        />
        <Card.ImgOverlay className="txt-hover">
          {" "}
          <Link to={tag && tag.replace(/\s/g, "")}>
            <Button variant={tagCol} className="text-white">
              {tag}
            </Button>
          </Link>
          <Card.Title> {newsTitle}</Card.Title>
          <Card.Text>
            {new Date(createdAt).toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};

export default FeaturedNewsC;
