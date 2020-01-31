import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Consumer from '../Context';
import Form from './Form';

const SignUp = () => {

  const appContext = useContext(Consumer);
  let history = useHistory();

  const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
  });

  const [ errors, setErrors] = useState([]);

  const change = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, ...{ [name]: value } });
  }

  const submit = async () => {
    setErrors([]);
    const userReg = await appContext.data.createUser(user);

    if (user.password !== user.confirmPassword) {
      setErrors(errors.push('Password and Confirm Password fields must match'));
    }

    if (userReg.res === null) {
      setErrors([...errors, ...userReg.msg]);

    } else {
      const userSignIn = await appContext.actions.signIn(user.emailAddress, user.password);

      if (userSignIn.res === null) {
        return setErrors(['Sign-in was unsuccessful', ...userReg.msg]);

      } else {
        setErrors([]);
        history.push('/authenticated');  
        console.log(`SUCCESS! ${user.firstName} is now signed in!`);
      }
    }
  }

  const cancel = () => {
    history.push('/');
  }


  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <Form 
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <input 
                id="firstName" 
                name="firstName" 
                type="text"
                value={user.firstName} 
                onChange={(e) => change(e)} 
                placeholder="First Name" />
              <input 
                id="lastName" 
                name="lastName" 
                type="text"
                value={user.lastName} 
                onChange={(e) => change(e)} 
                placeholder="Last Name" />
              <input 
                id="emailAddress" 
                name="emailAddress"
                type="text"
                value={user.emailAddress} 
                onChange={(e) => change(e)} 
                placeholder="Email Address" />
              <input 
                id="password" 
                name="password"
                type="password"
                value={user.password} 
                onChange={(e) => change(e)} 
                placeholder="Password" />
              <input 
                id="confirmPassword" 
                name="confirmPassword"
                type="password"
                value={user.confirmPassword} 
                onChange={(e) => change(e)} 
                placeholder="Confirm Password" />
            </React.Fragment>
          )} />
        <p>Already have a user account? <NavLink to="/signin">Click here</NavLink> to sign in!</p>
      </div>
    </div>
  );
}

export default SignUp;