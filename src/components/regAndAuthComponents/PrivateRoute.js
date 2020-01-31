import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Consumer from '../Context';

export default ({ component: Component, ...rest }) => {

  const appContext = useContext(Consumer);
  

  return (
    <Route
      {...rest}
      render={props => { 
        console.log(appContext.from = props.location);
        console.log(props); 
        return appContext.authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
          }} />
        )
      }}
    />
  );
};