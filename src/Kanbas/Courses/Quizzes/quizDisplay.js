import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../Database";
import { FaEllipsisVertical } from "react-icons/fa6";
import "./index.css";

function QuizDisplay() {
  const { assignmentId } = useParams();
  const assignment = db.quizzes.find(
    (assignment) => assignment._id === assignmentId);


  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };
  return (
    <div>

      <div className="d-flex justify-content-between">
        <h2>Quiz Details</h2>

        <div className="d-flex">

          <button type="button" className="btn btn-light mx-2 green-button" style={{ backgroundColor: 'green', color: "white" }}>
            {assignment.published == true ? "Published" : "UnPublished"}
          </button>

          <button type="button" className="btn btn-light mx-2">
            Preview
          </button>

          <Link
                  key={assignment.id}
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${assignment.id}/edit`}
                  className="btn btn-light"
                >
            Edit</Link>
  

          <button type="button" className="btn btn-light mx-2">
            <FaEllipsisVertical />
          </button>

        </div></div>

      <hr />
      <div className="d-flex">

        <h2>{assignment.subject}</h2>
      </div>
      <div>
      <table >

        <tbody>
          <tr>
            <td className="left-table-item">Quiz Type</td>
            <td className="right-table-item">{assignment.subject}</td>
          </tr>
          <tr>
            <td className="left-table-item">Points</td>
            <td className="right-table-item">{assignment.points}</td>
          </tr>

          <tr>
            <td className="left-table-item">Assignment Group</td>
            <td className="right-table-item">No</td>
          </tr>
          <tr>
            <td className="left-table-item">Time Limit</td>
            <td className="right-table-item">30 Minute</td>
          </tr>

          <tr>
            <td className="left-table-item">Multiple Attempts</td>
            <td className="right-table-item">No</td>
          </tr>
          <tr>
            <td className="left-table-item"> View Response</td>
            <td className="right-table-item">Always</td>
          </tr>

          <tr>
            <td className="left-table-item"> Show Correct Answers</td>
            <td className="right-table-item">Immediately</td>
          </tr>
          <tr>
            <td className="left-table-item"> One Question at a Time</td>
            <td className="right-table-item">Yes</td>
          </tr>
          <tr>
            <td className="left-table-item"> Require Resondus LockDown</td>
            <td className="right-table-item">No</td>
          </tr>
          <tr>
            <td className="left-table-item"> Webcam Required</td>
            <td className="right-table-item">No</td>
          </tr>
          <tr>
            <td className="left-table-item"> Lock Questions After Answering</td>
            <td className="right-table-item">No</td>
          </tr>


        </tbody>
      </table>

</div>

<div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
<hr style={{ margin: '10px 0' }} />
  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead>
      <tr>
        <th>Due</th>
        <th>For</th>
        <th>Available from</th>
        <th>Until</th>
      </tr>
    </thead>
    
    <tbody>
      <tr>
        <td>{assignment.dueDate}</td>
        <td>Everyone</td>
        <td>{assignment.availableFrom}</td>
        <td>{assignment.dueDate}</td>
      </tr>
    </tbody>
  </table>
  <hr style={{ margin: '10px 0' }} />
</div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Link
    to={`/Kanbas/Courses/${courseId}/Quizzes`}
    className="btn btn-red"
    style={{
      color: 'white',
      backgroundColor: 'red',
      padding: '10px 20px',
      textDecoration: 'none',
      borderRadius: '5px',
    }}
  >
    Preview
  </Link>
</div>



    </div>


  );
}


export default QuizDisplay;

