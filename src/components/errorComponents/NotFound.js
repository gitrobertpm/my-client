import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {

return (
  <div className="bounds">
    <div className="grid-50">
      <h1 className="header--logo error-heading"><span role="img" aria-label="Scream emoji">&#128561;</span> 404 <span role="img" aria-label="Scream emoji">&#128561;</span></h1>
      <br />
      <br />
      <p className="course--title"> Oops, it looks like what you're looking for doesn't exist!  So sorry! <span role="img" aria-label="Sad emoji">&#128546;</span> </p>
      <NavLink className="button" to="/">Back to the home page</NavLink>
    </div>
  </div>
);
}

export default NotFound;