import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Form from './Form';
import Consumer from '../Context';

const SignIn = (props) => {

  const appContext = useContext(Consumer);
  let history = useHistory();

  const [user, setUser] = useState({
      emailAddress: '',
      password: ''
  });

  const [ errors, setErrors] = useState([]);

  const change = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, ...{ [name]: value } });
  }

  const submit = async () => {

    const from = props.location.state.from.pathname || '/';

    const userSignIn = await appContext.actions.signIn(user.emailAddress, user.password);
    if (userSignIn.res === null) {
      setErrors(['Sign-in was unsuccessful', userSignIn.msg]);
    } else {
      setErrors([]);
      history.push(from);  
      console.log(`SUCCESS! ${user.firstName} is now signed in!`);
    }
  }

  const cancel = () => {
    history.push('/');
  }

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <Form 
          autoComplete="off"
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign In"
          elements={() => (
            <React.Fragment>
              <input 
                id="emailAddress" 
                name="emailAddress" 
                type="text"
                value={user.emailAddress} 
                onChange={change} 
                placeholder="Email Address" />
              <input 
                id="password" 
                name="password"
                type="text"
                value={user.password} 
                onChange={change} 
                placeholder="Password" />                
            </React.Fragment>
          )} />
        <p>Don't have a user account? <NavLink to="/signup">Click here</NavLink> to sign up!</p>
      </div>
    </div>
  );
}

export default SignIn;