import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { setQuiz, togglePublishStatus } from "./quizzesReducer";

function QuizDisplay() {
  const { courseId, quizId } = useParams();

  const selectedQuiz = useSelector((state) => state.quizzesReducer.selectedQuiz);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(quizId);
    client.findQuizById(quizId)
      .then((q) =>
        dispatch(setQuiz(q))
      );
  }, [quizId]);
  console.log(selectedQuiz)

  const handlePublish = (quizId) => {
    console.log("Changing publish status");
    client.publishQuiz(quizId).then((status) => {
      dispatch(togglePublishStatus(quizId));
      client.findQuizById(quizId)
        .then((q) => dispatch(setQuiz(q)))
        .catch((error) => console.error("Error fetching quizzes:", error));
    });
  };



  return (<div>
    {selectedQuiz && (

      <>
        <div className="d-flex justify-content-between">
          <h2>Quiz Details</h2>

          <div className="d-flex">

            <button
              type="button"
              className="btn btn-light mx-2 green-button"
              style={{ backgroundColor: 'green', color: "white" }}
              onClick={() => handlePublish(selectedQuiz._id)}
            >
              {selectedQuiz.published === true ? "Published" : "Unpublished"}
            </button>

            <Link
              key={selectedQuiz.id}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${selectedQuiz._id}/preview`}
              className="btn btn-light"
            >
              Preview</Link>

            <Link
              key={selectedQuiz.id}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${selectedQuiz._id}/edit`}
              className="btn btn-light"
            >
              Edit</Link>


            <button type="button" className="btn btn-light mx-2">
              <FaEllipsisVertical />
            </button>

          </div></div>

        <hr />
        <div className="d-flex">

          <h2>{selectedQuiz.subject}</h2>
        </div>
        <div>
          <table >

            <tbody>
              <tr>
                <td className="left-table-item">Quiz Type</td>
                <td className="right-table-item">{selectedQuiz.title}</td>
              </tr>
              <tr>
                <td className="left-table-item">Points</td>
                <td className="right-table-item">{selectedQuiz.points}</td>
              </tr>

              <tr>
                <td className="left-table-item">selectedQuiz Group</td>
                <td className="right-table-item">No</td>
              </tr>

              <tr>
                <td className="left-table-item">Shuffle Answers</td>
                <td className="right-table-item">{selectedQuiz.shuffleAnswer ? 'Yes' : 'No'}</td>
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
              <tr>
                <td className="left-table-item"> Is Quiz Published</td>
                <td className="right-table-item">{selectedQuiz.published ? 'Yes' : 'No'}</td>
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
                <td>{selectedQuiz.dueDate}</td>
                <td>Everyone</td>
                <td>{selectedQuiz.availableDate}</td>
                <td>{selectedQuiz.until}</td>
              </tr>
            </tbody>
          </table>
          <hr style={{ margin: '10px 0' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`}
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
        </div></>
    )}


  </div>


  );
}


export default QuizDisplay;