import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Consumer from '../Context';

export default () => {
  const appContext = useContext(Consumer);
  appContext.actions.signOut();

  return (
    <Redirect to="/" />
  );
}