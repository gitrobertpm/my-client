import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {

  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>Course Successfully deleted!</h1>
    </div>
    <NavLink className="button" to="/">Back to the home page</NavLink>
  </div>
  );
}