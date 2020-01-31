import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Consumer from '../Context';


const DeleteModal = (props) => {
  // console.log(props);
  return ( 
    <div className="bounds delete-modal">
      <div className="actions--bar">
        <div className="grid-100">
          <h1>Are you sure you want to delete {props.title}?</h1>
          <p><strong>WARNING!</strong> If you confirm delete, this action can't be undone.</p>
          <br />         
          { 
            props.errs.length > 0 ? 
            <React.Fragment>
              <ErrorsDisplay errors={props.errs} /> 
            </React.Fragment> : 
            <button className="button button-secondary" onClick={props.courseDelete}>Confirm Delete</button>
          }
          <button className="button button-secondary" onClick={props.delToggle}>{props.errs.length > 0 ? 'Return to Course Details' : 'Cancel'}</button>  
        </div>
      </div>
    </div> 
  );
}

const CourseDetails = ({match}) => {

  const appContext = useContext(Consumer);
  const paramsID = match.params.id;
  const courseIndex = paramsID - 1;
  const course = appContext.courseList[courseIndex];

  const [showDelete, updateShowDelete] = useState(false);

  const [wasDeleted, updateWasDeleted] = useState(false);

  const [ errors, setErrors] = useState({
    errors: [],
  });

  const toggleShowDelete = () => {
    updateShowDelete(!showDelete);
  }

  const deleteCourse = async () => {
    const deleteRes = await appContext.data.deleteCourse(appContext.courseList[courseIndex].id, appContext.authenticatedUser.emailAddress, appContext.authenticatedUser.password);
    console.log(deleteRes);
    if (deleteRes.res === null) {
      setErrors([...deleteRes.msg]);
    } else {
      setErrors([]);
      await appContext.actions.getCourses();
      updateWasDeleted(true);
      console.log(`SUCCESS! Course deleted!`);
    }
  }

  return (

    appContext.courseList.length <= 0 ? <div className="bounds"><h1>Loading...</h1></div> :

    wasDeleted ? <Redirect to="/deleted" /> :

    !course ? <Redirect to="/notfound" /> :

    showDelete ? <DeleteModal title={course.title} delToggle={toggleShowDelete} courseDelete={deleteCourse} errs={errors}/> :

    

    <div className="bounds">
      <div className="courseDetailContainer">
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              { 
                appContext.authenticatedUser === null ? null :
                course.creator.emailAddress === appContext.authenticatedUser.emailAddress ?
                <span>
                  <NavLink className="button" to={ `/course/update/${paramsID}` } >Update Course</NavLink>
                  <button className="button" onClick={toggleShowDelete}>Delete Course</button>
                </span> : null
              }            
              <NavLink className="button button-secondary" to="/">Return to List</NavLink>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By {course.creator.firstName + ' ' + course.creator.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={course.description}/>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>               
                  <ul>
                    <ReactMarkdown source={course.materialsNeeded}/>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="clear-fix" ><span role="img" aria-label="Books icon">&#128218;</span></p>
          </div>
        </div>
      </div>     
    </div>
  );
}

export default CourseDetails;

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}