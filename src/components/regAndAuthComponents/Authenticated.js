import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Consumer from '../Context';

export default () => {

  const appContext = useContext(Consumer);
  const authUser = appContext.authenticatedUser;

  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your username is {authUser.emailAddress}.</p>
    </div>
    <NavLink className="button" to="/">Back to the home page</NavLink>
  </div>
  );
}