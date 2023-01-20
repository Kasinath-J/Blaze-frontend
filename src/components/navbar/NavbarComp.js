import { LinkContainer } from 'react-router-bootstrap'
import {Container,Nav,Navbar} from 'react-bootstrap';
import {GLogin} from './GLogin';

export function NavbarComp() {
  var window_height = Math.floor(window.innerHeight*0.08);
  return (
    <Navbar bg="dark" variant="dark" expand="sm" sticky="top" collapseOnSelect="true" style={{minHeight:window_height,zIndex:"100"}}>
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand >BLAZE</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/problems"><Nav.Link>Problems</Nav.Link></LinkContainer>
            <LinkContainer to="/leaderboard"><Nav.Link>Leaderboard</Nav.Link></LinkContainer>
            <LinkContainer to="/events"><Nav.Link>Events</Nav.Link></LinkContainer>             
            <LinkContainer to="/searchPortfolio"><Nav.Link>Search</Nav.Link></LinkContainer>          
          </Nav>
          <Nav>
            <GLogin/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

