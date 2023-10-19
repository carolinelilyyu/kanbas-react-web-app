import { Navigate, Routes, Route, useParams, useLocation } from "react-router";
import db from "../Database";
import CourseNavigation from "../CourseNavigation";
import Modules from "./Modules";
import "./index.css";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";
import {RxHamburgerMenu} from "react-icons/rx"
function Courses(){
    const {courseId} = useParams();
    const {pathname} = useLocation();
    const [qwe, kanbas, courses, id, screen] = pathname.split("/");
    const course = db.courses.find((course) => course._id === courseId);
    return (
        <div>
            <div className="breadcrumb d-sm-none d-md-none d-lg-block">
                <h5>
                    <span class="item"><RxHamburgerMenu fontSize="1.5em"/></span>
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
                <Route
                path="Assignments/:assignmentId"
                element={<AssignmentEditor />}
                />
                <Route path="Grades" element={<Grades />} />
            </Routes>
            </div>
        </div>


        </div>
    );
}
export default Courses;