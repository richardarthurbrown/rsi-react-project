import React from 'react';
import { Navbar, NavItem, NavLink, Nav, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
  render () {
    return (
      <Navbar color="dark" className="fixed-top">
        <NavbarBrand className="text-light">RSI + React</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink className="text-light" tag={Link} to="/">Search</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-light" tag={Link} to="/saved">Saved</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}