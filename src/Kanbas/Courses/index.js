import { Navigate, Routes, Route, useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import CourseNavigation from "../CourseNavigation";
import Modules from "./Modules";
import "./index.css";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";

import Questions from "./Questions";
import QuestionEditor from "./Questions/QuestionEditor";
import {RxHamburgerMenu} from "react-icons/rx"

import Quizzes from "./Quizzes";
import QuizDisplay from "./Quizzes/quizDisplay";
import QuizEdit from "./Quizzes/editQuiz/quizedit";
import QuizPreview from "./Quizzes/preview/quizpreview";
;
function Courses({ courses }) {
    const { courseId } = useParams();
    // const URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/courses";
    const URL = "http://localhost:4000/api/courses";

    const [course, setCourse] = useState({});
    const findCourseById = async (courseId) => {
        const response = await axios.get(
            `${URL}/${courseId}`
        );
        setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);

    const { pathname } = useLocation();
    const [qwe, kanbas, coursess, id, screen] = pathname.split("/");
    // const course = courses.find((course) => course._id === courseId);
    return (
        <div>
            <div className="breadcrumb d-sm-none d-md-none d-lg-block">
                <h5>
                    <span class="item"><RxHamburgerMenu fontSize="1.5em" /></span>
                    <span class="item">Course {course.name} / {screen}</span>
                </h5>
            </div>

            <CourseNavigation />
            <div className="wd-courses">
            <div
            className="overflow-y-scroll position-fixed bottom-0 end-0"
            style={{
                left: "320px",
                top: "100px",
            }}
            >
            <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home/>} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Assignments" element={<Assignments />} />
                <Route path="Quizzes" element={<Quizzes />} />
                
                <Route
                path="quizzes/:quizId"
                element={<QuizDisplay />}
                />
                <Route
                path="Quizzes/:quizId/preview"
                element={<QuizPreview />}
                />
                 <Route
                path="Quizzes/:quizId/edit"
                element={<QuizEdit />}
                />
                
                <Route
                path="Assignments/:assignmentId"
                element={<AssignmentEditor />}
                />
                <Route
                path="Questions/:questionId"
                element={<Questions />}
                />
                <Route
                path="Questions/:questionId/Edit"
                element={<QuestionEditor />}
                />
                
                <Route path="Grades" element={<Grades />} />
                <Route path="Questions" element={<Questions />} />
            </Routes>
            </div>
</div>

        </div>
    );
}
export default Courses;