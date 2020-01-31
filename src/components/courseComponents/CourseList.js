import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Consumer from '../Context';
import Course from './Course';

const CourseList = () => {

  const appContext = useContext(Consumer);

  return (
    <div className="bounds">

      { appContext.courseList.map( (course, indy) =>
        <Course 
        title={ course.title }
        key={ course.id.toString() }
        id={appContext.courseList.indexOf(course) + 1}
        indy={ indy } />
      )}

      <div className="grid-33">
        <NavLink className="course--module course--add--module" to="/course/create">
          <h3 className="course--add--title">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </h3>
        </NavLink>
      </div>
    </div>
  );
}

export default CourseList;