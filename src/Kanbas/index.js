import {Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import Account from "./Account";
import Calendar from "./Calendar";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import Inbox from "./Inbox";
import db from "./Database";
import { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
function Kanbas() {
  const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });

   const addNewCourse = () => {
      setCourses([...courses,
                { ...course,
                  _id: new Date().getTime() }]);
    };
    const deleteCourse = (courseId) => {
      setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    };
  
    return(
      <div>
      <Provider store={store}>
      <Nav />
      <div className="d-flex">
      <KanbasNavigation />
         <div>
            <Routes>
               <Route path="/" element={<Navigate to="Dashboard" />} />
               <Route path="Account" element={ <Account /> } />
               <Route path="Dashboard" element={ <Dashboard 
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}/>
                  } />
               <Route path="Courses/:courseId/*" element={ <Courses courses={courses} /> } />
               <Route path="Calendar" element={ <Calendar /> } />
            </Routes>
         </div>
      </div>
      </Provider>  
   </div>
    );
 }
 export default Kanbas
 
 