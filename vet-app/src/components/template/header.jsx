import React from 'react';
import { NavDropdown, Nav, Image } from 'react-bootstrap';


const Header = () => {
  return (
  

      <div className="navbar-nav">
      <Nav className="navbar">

        <div className="navbar-content">
        <form className="search-form">
      </form>

      <NavDropdown className='nav-link dropdown' title={
            <div className=''>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9USkGInprmw5sqShHeEUrAcaPa7cAaK6HrQ&usqp=CAU"
                width="30"
                height="30"
                className="rounded-circle mr-2"
                alt="profile"
              />
            </div>
          } id="nav-dropdown">
            <NavDropdown.Item>1</NavDropdown.Item>
            <NavDropdown.Item>2
            </NavDropdown.Item>
          </NavDropdown>

        </div>
      </Nav>
      </div>
  );
};

export default Header;
