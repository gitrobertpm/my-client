import React from 'react';
import { NavLink } from 'react-router-dom';
//import Consumer from '../Context';

export default () => {

  //const appContext = useContext(Consumer);

  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>Uh oh! You can't access this page.</p>
      <NavLink to='/' className="course--module course--link">Back to the home page.</NavLink>
    </div>
  );
};