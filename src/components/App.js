import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// App styles imports
import './App.css';

// App component imports
import Header from './Header';

// Course component imports
import CourseList from './courseComponents/CourseList';
import CourseDetails from './courseComponents/CourseDetails';
import CreateCourse from './courseComponents/CreateCourse';
import UpdateCourse from './courseComponents/UpdateCourse';
import CourseDeleted from './courseComponents/CourseDeleted';

// Reg and auth component imports
import SignUp from './regAndAuthComponents/SignUp';
import SignIn from './regAndAuthComponents/SignIn';
import Authenticated from './regAndAuthComponents/Authenticated';
import PrivateRoute from './regAndAuthComponents/PrivateRoute';

// Error components imports
import NotFound from './errorComponents/NotFound';
import Errors from './errorComponents/Errors';
import Forbidden from './errorComponents/Forbidden';

const App = () => {


  return (
    <BrowserRouter>
      <Route render={({ location }) => (
        <div className="App">
          <Header />

          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={250}
              classNames='fade'
            >

              <Switch location={location}>
                <Route exact path="/" component={ CourseList } />
                <Route exact path="/course" render={ () => <Redirect to="/" /> } />
                <Route exact path="/courses" render={ () => <Redirect to="/" /> } />
                
                <PrivateRoute path="/authenticated" component={ Authenticated } />
                <PrivateRoute path="/course/create" component={ CreateCourse } />
                <PrivateRoute exact path="/course/update/:id" component={ UpdateCourse } />

                <Route path="/course/:id" component={ CourseDetails } />

                <Route path="/deleted" component={ CourseDeleted } />

                <Route path="/signup" component={ SignUp } />
                <Route path="/signin" component={ SignIn } />

                <Route path="/error" component={ Errors } />
                <Route path="/forbidden" component={ Forbidden } />
                
                <Route component={ NotFound } />
              </Switch>

            </CSSTransition>
          </TransitionGroup>
            
        </div>
      )}/>
    </BrowserRouter>
  );
}

export default App;


