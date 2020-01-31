import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Consumer from '../Context';
import CourseForm from './CourseForm';

const CreateCourse = ({match}) => {

  const appContext = useContext(Consumer);
  let history = useHistory();
  const newCourseParam = appContext.courseList.length + 1;

  const [course, setCourse] = useState({
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: appContext.authenticatedUser.id || ''
  });

  const [ errors, setErrors] = useState({
    errors: [],
  });

  const change = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCourse({ ...course, ...{ [name]: value } });
  }

  const submit = async () => {
    const courseCreate = await appContext.data.createCourse(course, appContext.authenticatedUser.emailAddress, appContext.authenticatedUser.password);
    console.log(courseCreate);
    console.log(typeof courseCreate);
    if (courseCreate.res === null) {
      console.log(courseCreate);
      return setErrors([...courseCreate.msg]);
    } else {
      setErrors([]);
      await appContext.actions.getCourses();
      history.push(`/course/${newCourseParam}`);
      console.log(`SUCCESS! Course created!`);
    }  
  }

  const cancel = () => {
    history.push('/');
  }

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        <CourseForm
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input 
                      id="title" 
                      name="title" 
                      type="text"
                      className="input-title course--title--input" 
                      value={course.title} 
                      onChange={change} 
                      placeholder="Title" />
                  </div>
                  <p>By {`${appContext.authenticatedUser.firstName} ${appContext.authenticatedUser.lastName}`} </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea 
                      id="description" 
                      name="description"
                      type="text"
                      value={course.description} 
                      onChange={change} 
                      placeholder="Description">
                    </textarea>  
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input 
                          id="estimatedTime" 
                          name="estimatedTime" 
                          type="text"
                          className="course--time--input"
                          value={course.estimatedTime} 
                          onChange={change} 
                          placeholder="Hours" />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea 
                          id="materialsNeeded" 
                          name="materialsNeeded"
                          type="text"
                          value={course.materialsNeeded} 
                          onChange={change} 
                          placeholder="List materials...">
                        </textarea>  
                      </div>
                    </li>
                  </ul>
                </div>
              </div> 
            </React.Fragment>
          )} />
      </div>
      <div>
        <p className="clear-fix" ><span role="img" aria-label="Books icon">&#128218;</span></p>
      </div>
    </div>
  );
}

export default CreateCourse;