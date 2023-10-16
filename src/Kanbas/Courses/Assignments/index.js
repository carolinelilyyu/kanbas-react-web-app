import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import "./index.css"

function Assignments() {
  const { courseId } = useParams();
  const assignments = db.assignments;
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <div>


      <h2>Assignments for course {courseId}</h2>
      <div className="list-group">

        {/* <!-- Third column --> */}
        <div class="wd-flex-grow-1">
              {/* <!-- buttons on top --> */}
              <div class="d-flex justify-content-between">
                  <input type="text" id="searchassignments"
                  placeholder="Search for Assignments" class="form-control w-25"/>
      
                  <div class="d-flex">
                      <button type="button" class="btn btn-light">Group</button>
                      <button type="button" class="btn btn-danger">Assignment</button>
                      <button type="button" class="btn btn-light"><i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i></button>
                  </div>
              </div>

              
              {/* <!-- Assignments --> */}
              <ul class="list-group rounded-0">
                  <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">ASSIGNMENTS
                      <div class="d-flex justify-content-between">
                          <span class="ps-2 badge badge-pill badge-dark rounded">40% of Total</span>
                          <i class="fa fa-check-circle" aria-hidden="true"></i>
                          <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
                      </div>
                  </li>
              </ul>
        </div>
        {courseAssignments.map((assignment) => (
          <Link
          key={assignment._id}
          to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
          className="list-group-item">
          {/* Assignments */}
          <a href="/kanbas/assignments/edit.html" class="list-group-item list-group-item-action ps-5 d-flex justify-content-between flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{assignment.title}</h5>
              <small class="text-muted"><i class="fa fa-check-circle" aria-hidden="true"></i>
                  <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i></small>
              </div>
          <p class="mb-1">{assignment.course}</p>
          <small class="text-muted">Due {assignment.duedate}</small>
          </a>
                  

        </Link>
      ))}
      </div>

    </div>
  );
}
export default Assignments;

