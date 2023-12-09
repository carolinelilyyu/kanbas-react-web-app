import {Routes, Route, Navigate } from "react-router";
import React, { useEffect, useState } from "react";

import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import Account from "./Account";
import Calendar from "./Calendar";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import axios from "axios";

import Inbox from "./Inbox";
import db from "./Database";
import store from "./store";
import { Provider } from "react-redux";


function Kanbas() {
  
  const [courses, setCourses] = useState([]);
  // const URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/courses";
    const URL = "http://localhost:4000/api/courses";

  const findAllCourses = async () => {
    const response = await axios.get(URL);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  // const [courses, setCourses] = useState(db.courses);
  const [course, setCourse] = useState({
    name: "New Course",      number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });

    //  const addNewCourse = () => {
    //     setCourses([...courses,
    //               { ...course,
    //                 _id: new Date().getTime() }]);
    //   };
    const addNewCourse = async () => {
      console.log("adding new course");
      const response = await axios.post(URL, course);
      setCourses([
        response.data,
        ...courses,
      ]);
      setCourse({ name: "" });
    };

    // const deleteCourse = (courseId) => {
    //   setCourses(courses.filter((course) => course._id !== courseId));
    // };
    const deleteCourse = async (course) => {
      console.log("delete course " + course);
      const response = await axios.delete(
        `${URL}/${course._id}`
      );
      setCourses(courses.filter(
        (c) => c._id !== course._id));
      }
    // const updateCourse = () => {
    //   setCourses(
    //     courses.map((c) => {
    //       if (c._id === course._id) {
    //         return course;
    //       } else {
    //         return c;
    //       }
    //     })
    //   );
    // };
  
    const updateCourse = async (course) => {
      const response = await axios.put(
        `${URL}/${course._id}`,
        course
      );
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          }
          return c;
        })
      );
      setCourse({ name: "" });
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
 
 