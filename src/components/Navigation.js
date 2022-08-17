import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useRecoilValue } from "recoil";
import { currentlyShownQindexAtom } from "../store/atoms";

function NavigationBar({ setCurrentlyShownQindex }) {
  const onClick = (event) => {
    const { name } = event.target;
    setCurrentlyShownQindex(parseInt(name) - 1);
  };

  const currentlyShownQindex = useRecoilValue(currentlyShownQindexAtom);

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} bg="white" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/home">착한 이륜차 설문조사</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="top"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  문항
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="justify-content-end align-items-center">
                <Nav>
                  {React.Children.toArray(
                    [1, 2, 3, 4, 5].map((val) => (
                      <Nav.Link
                        href=""
                        onClick={onClick}
                        name={val}
                        className={`${
                          val - 1 === currentlyShownQindex
                            ? "text-primary fw-bold"
                            : ""
                        }`}
                      >
                        {val}번
                      </Nav.Link>
                    ))
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavigationBar;
