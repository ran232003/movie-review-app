import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./global.css";
import profilePic from "./profile.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useApiHelper } from "./apiHelper";
import { SING_OUT_URL } from "../URLS";
import { userAction } from "../store/userSlice";
import { resetStore } from "../store/actions";

const NavigationBar = () => {
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.user;
  });
  const handleSignOut = async () => {
    handleApiCall(
      "GET",
      SING_OUT_URL,
      {},
      (data) => {
        // dispatch(userAction.removeUser());
        dispatch(resetStore());
        navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary my-nav">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            Movie Master
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="my-nav-link" as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link className="my-nav-link" as={Link} to={"/about"}>
                About
              </Nav.Link>
              <Nav.Link className="my-nav-link" as={Link} to={"/movieSearch"}>
                Search
              </Nav.Link>
              <Nav.Link className="my-nav-link" as={Link} to={"/reviews"}>
                Reviews
              </Nav.Link>
              {user ? (
                <Nav.Link className="my-nav-link" as={Link} to={"/favorites"}>
                  Favorites
                </Nav.Link>
              ) : null}
            </Nav>
            {user ? (
              <NavDropdown
                className="nav-profile d-flex test"
                title={
                  <img
                    src={profilePic}
                    alt="Profile"
                    style={{ width: "40px", borderRadius: "50%" }}
                  />
                } // Render profile picture as the titl
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to={"/ReviewPage"}>
                  My Reviews
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/favorites"}>
                  My Favorites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
                <Nav.Link
                  className="my-nav-link"
                  as={Link}
                  to={"/auth/signin"}
                  variant="outline-success nav-profile"
                >
                  {" "}
                  Sign In
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavigationBar;
