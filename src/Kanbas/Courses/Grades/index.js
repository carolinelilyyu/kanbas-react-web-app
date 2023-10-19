import db from "../../Database";
import { useParams } from "react-router-dom";
import "./index.css";
import {AiOutlineCloudDownload} from "react-icons/ai";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BiCog} from "react-icons/bi";
import {GrFilter} from "react-icons/gr";

function Grades() {
  const { courseId } = useParams();
  const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
  const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div class="wd-flex-grow-1">

        <div class="float-end">
            <span className="topbuttons">
                <button type="button" class="btn btn-light">
                    <AiOutlineCloudDownload />
                    Import
                </button>
            </span>
            <span className="topbuttons">
                <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <AiOutlineCloudUpload/>
                    Export
                </button>
              </span>
              <span className="topbuttons">
                <button type="button" class="btn btn-light">
                  <BiCog/>
                </button>
            </span>
        </div>
        <br/>

        <div class="container">
            <div class="row">
                <div class="col-6">
                    <b>Student Names</b>
                    <input id="text-fields-students" placeholder="Search Students" class="form-control"/>
                    
                </div>

                <div class="col-6">
                    <b>Assignment Names</b>
                    <input id="text-fields-assignments" placeholder="Search Assignments" class="form-control"/></div>
            </div>
            <br/>
            <button type="button" class="btn btn-light mx-4">
                <GrFilter/>
                Apply Filters
              </button>
            <br/>
            <br/>

          <div className="table-responsive">
            <table className="table table table-striped">
              <thead>
                <th>Student Name</th>
                {assignments.map((assignment) => (<th>{assignment.title}</th>))}
              </thead>

              <tbody>
                {enrollments.map((enrollment) => {
                  const user = db.users.find((user) => user._id === enrollment.user);
                  return (
                    <tr>
                      <td>{user.firstName} {user.lastName}</td>
                      {assignments.map((assignment) => {
                        const grade = db.grades.find(
                          (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                          return (<td>{grade?.grade || ""}</td>);})}
                    </tr>);
                })}
              </tbody></table>
          </div>
        </div>        
    </div>
  );
}
export default Grades;