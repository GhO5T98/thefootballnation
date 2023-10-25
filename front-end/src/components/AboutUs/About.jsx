import React from "react";
import "./about.scss";
import Banner from "../../assets/banner.jpg";
import { Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
const About = () => {
  return (
    <section className="transfers__section">
      <div className="transfers__hero">
        <img className="fluid" src={Banner} alt="Our Agents" />
        <h1 className="transfers__hero-txt">About Us</h1>
        <div className="overlay"></div>
      </div>

      <Container>
        <Row className="about__section" lg={12}>
          <h1 className="mb-5">The Football Nation </h1>
          <p>
            At The Football Nation, we are passionate about the beautiful game
            and everything that surrounds it. We are a dedicated team of
            football enthusiasts who eat, breathe, and sleep football. Our blog
            is the ultimate destination for all things related to the world's
            most popular sport. Our mission is to provide our readers with
            engaging and insightful content that covers a wide range of topics
            within the realm of football. Whether you're a die-hard fan or a
            casual supporter, we have something for everyone. Stay up to date
            with the latest news, match analysis, player interviews, transfer
            rumors, and in-depth features on your favorite teams and players
            from around the globe. Our knowledgeable writers bring a wealth of
            expertise and a unique perspective to each piece, delivering
            high-quality articles that inform and entertain.</p> <p> But we're not just
            about the professional game. We believe that football is a universal
            language that unites people from all walks of life. That's why our
            blog also celebrates the grassroots level, highlighting inspiring
            stories, community initiatives, and the impact football has on
            society. We encourage lively discussions and interaction among our
            readers. We value your opinions and want to create a vibrant
            community where football fans can come together to share their
            thoughts and connect with like-minded individuals. So whether you're
            looking for breaking news, tactical analysis, historical insights,
            or simply a place to indulge in your love for the game, The Football
            Nation is your go-to destination. Join us on this exciting journey
            as we explore the vast and thrilling world of football together. <br /><br />
            Welcome to The Football Nation – where passion meets the pitch!
          </p>
        </Row>
      </Container>
      <Footer />
    </section>
  );
};

export default About;
