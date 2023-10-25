import React from "react";
import "./footer.scss";
import { Container, Row } from "react-bootstrap";
import Logo from "../../assets/tfnlogo.png";
import { Link } from "react-router-dom";
import Privacysettings from "./Privacysettings";
import Termsofuse from "./Termsofuse";
import Disclaimer from "./Disclaimer";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="logo__row">
          <img src={Logo} alt="Footer Logo " />
        </Row>
        <Row className="mt-5">
          <ul>
            <Link style={{ textDecoration: "none" }} to={`/ContactUs`}>
              {" "}
              <li>Contact Us</li>
            </Link>
            <li className="footer__line">|</li>
            <li><Termsofuse /></li>
            <li className="footer__line">|</li>
            <li><Disclaimer /></li>
            <li className="footer__line">|</li>
            <li><Privacysettings /></li>
          </ul>
        </Row>
        <Row className="mt-5">
          <h1>
            Copyright © 2023 The Football Nation All rights reserved. The
            information contained in The Football Nation may not be published,
            broadcast, rewritten, or redistributed without the prior written
            authority of The Football Nation.
          </h1>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
