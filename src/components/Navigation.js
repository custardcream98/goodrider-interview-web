import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavigationBar({ setCurrentlyShownQindex }) {
  const onClick = (event) => {
    let { name } = event.target;
    setCurrentlyShownQindex(parseInt(name.slice(1)) - 1);
  };

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
              <Offcanvas.Body>
                <Nav className="mr-auto mb-2 mb-lg-0">
                  <Nav.Link href="" onClick={onClick} name="#1">
                    #1
                  </Nav.Link>
                  <Nav.Link href="" onClick={onClick} name="#2">
                    #2
                  </Nav.Link>
                  <Nav.Link href="" onClick={onClick} name="#3">
                    #3
                  </Nav.Link>
                  <Nav.Link href="" onClick={onClick} name="#4">
                    #4
                  </Nav.Link>
                  <Nav.Link href="" onClick={onClick} name="#5">
                    #5
                  </Nav.Link>
                  <Nav.Link href="" onClick={onClick} name="#6">
                    #6
                  </Nav.Link>
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
