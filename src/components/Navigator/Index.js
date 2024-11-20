import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import logo from '../../img/logo.png'
import './style.css'

console.log(logo)


export default function Navigator({ isLogin, isJobSeeker, isRecruiter }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='navbar__logo' to="/">
              <img src={logo} alt='Logo' style={{width: 50, height: 50}}/>
            </Link>
            <Link className='navbar__button' to="/">Home</Link>
            <Link className='navbar__button' to="/jobs">Jobs</Link>
            {isLogin && <Nav.Link className='navbar__button' href="#link">My page</Nav.Link>}
            {isRecruiter && <Nav.Link className='navbar__button' href="#link">Posted jobs</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

        <Nav.Link className='navbar__button' href='#'>Login</Nav.Link>
      </Container>
    </Navbar>
  )
}
