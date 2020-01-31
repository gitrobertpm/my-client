import React from 'react';
import { NavLink } from 'react-router-dom';

const Course = (props) => {

  return (
    <div className="grid-33">
      <NavLink to={ `/course/${props.id}` } className="course--module course--link">
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{ props.title }</h3>
      </NavLink>
    </div>
  );
}

export default Course;