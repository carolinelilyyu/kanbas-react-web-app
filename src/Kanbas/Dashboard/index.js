import { Link } from "react-router-dom";
import { React, useState } from "react";

// import db from "../Database";
import "./index.css";
import "../../styles.css";

function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }){
    return (
        <div className="wd-dashboard">
          <h5>Course</h5>
          <input value={course.name} className="form-control" 
                       onChange={(e) => setCourse({ ...course, name: e.target.value }) } />

          <input value={course.number} className="form-control"
                       onChange={(e) => setCourse({ ...course, number: e.target.value }) } />

          <input value={course.startDate} className="form-control" type="date" 
                       onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>

          <input value={course.endDate} className="form-control" type="date" 
                       onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />

          <h1>Dashboard</h1>
          <button 
          type="button" class="btn btn-danger"
          onClick={addNewCourse} >
            Add
          </button>
          
          <button 
          type="button" class="btn btn-light"
          onClick={()=>updateCourse(course)} >
            Update
          </button>

          <hr />
          <div className="container">
            <h2>Published Course ({courses.length})</h2>
            <div class="row rows-col-1 row-cols-md-3 g-4">
              {courses.map((course) => (
                <div class="col">
                  <div className="list-group">
                    <div class="card h-100">
                      <img class="card-img-top" src="/images/course.png" alt="Card image cap"></img>
                      <div class="card-body">
                        <h5 class="card-title">{course._id}</h5>
                        <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
                          <b>{course.name} {course.number}</b>
                          <br/>
                          <button
                          type="button" class="btn btn-light"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}>
                          Edit
                        </button>
                          <button
                          type="button" class="btn btn-danger"
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course);
                          }}>
                          Delete
                        </button>  
                        </Link>
                        <p class="text-muted">{course.startDate} TO {course.endDate}</p>

                        <p class="card-text">{course.description}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                  </div>
                </div>
                </div>
              ))}
          </div>
        </div>
        </div>
        
      );
    
}
export default Dashboard;