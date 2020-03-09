
/*eslint-disable*/
import React from "react";

// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://cianciarusocataldo.github.io">About me</NavLink>
            </NavItem>
          </Nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
