import React, { useState,useContext } from "react";
import "./nav.scss";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Dropdown,
} from "react-bootstrap";
import Logo from "../../assets/tfnlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authorContext";

const Navigation = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { author, setAuthor } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setAuthor(false);
    navigate("/");
  };
  return (
    <header>
      <nav>
        <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={Logo}
                width="37"
                height="55"
                className="d-inline-block align-center mt-1 fluid"
              />{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto  nav-links-drop">
                <Nav.Item className="me-2">
                  <Nav.Link href="/" className="nav__ele">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-2">
                  <Nav.Link href="/Transfers" className="nav__ele">
                    Transfers
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-2">
                  <Nav.Link href="/LatestNews" className="nav__ele">
                    Latest News
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="me-2">
                  <NavDropdown
                    title="Competitions"
                    id="basic-nav-dropdown"
                    className="custom-dropdown "
                    show={showDropdown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavDropdown.Item href="/Ucl">
                      Uefa Champions League
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/PremierLeague">
                      Premier League
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/SeriaA">Seria A</NavDropdown.Item>

                    <NavDropdown.Item href="/LaLiga">La Liga</NavDropdown.Item>

                    <NavDropdown.Item href="/Ligue1">Ligue 1</NavDropdown.Item>

                    <NavDropdown.Item href="/Bundesliga">
                      Bundesliga
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
                <Nav.Item className="me-2">
                  <Nav.Link href="/AboutUs" className="nav__ele">
                    About Us
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              {!author ? (
                <>
                  <Nav className="justify-content-end">
                    <Nav.Item>
                      <Link to={"/SignIn"}>
                        <Button variant="outline-light rounded-0">
                          Sign In
                        </Button>
                      </Link>
                    </Nav.Item>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav className="logged__in-btn">
                    <Nav.Item>
                      <Dropdown data-bs-theme="dark">
                        <Dropdown.Toggle id="dropdown-basic">
                          <i className="bx bxs-user-circle"></i>{" "}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <span>{author}</span>
                          </Dropdown.Item>
                          <Dropdown.Item href="/MyNews">My News</Dropdown.Item>
                          <Dropdown.Item href="/AddNews">
                            Add News
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleLogout}>
                            Logout
                            <i className="bx bx-exit"></i>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Item>
                  </Nav>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>
    </header>
  );
};

export default Navigation;
