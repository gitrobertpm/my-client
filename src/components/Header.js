import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <header className="header">
      <div className="bounds">
        <h1 className="header--logo">
          <NavLink to="/"><span role="img" aria-label="Books emoji">&#128218;</span> Courses</NavLink>
        </h1>
        <Nav />
      </div>
    </header>
  )
}

export default Header;