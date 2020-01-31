import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Consumer from './Context';

const Nav = () => {

  const appContext = useContext(Consumer);
  let history = useHistory();
  const authUser = appContext.authenticatedUser;

  const handleSignOut = async () => {
    await appContext.actions.signOut();
    history.push('/signin');
  }

  console.log(authUser);

  return (
    <nav>
      <div className="bounds">
        {authUser ? (
          <React.Fragment>
            <span className="welcome-text">Welcome, {authUser.firstName}!</span>
            <button className="nav-button" onClick={ handleSignOut }>Sign Out</button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to="/signup" className="signup">Sign Up</NavLink>
            <NavLink to="/signin" className="signin">Sign In</NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
}

export default Nav;