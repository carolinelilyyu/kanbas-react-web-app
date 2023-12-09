import React from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import db from "../../../Database";

function QuizPreview() {
  const { courseId } = useParams();
  console.log(courseId)
  const quizzes = db.quizzes;
  console.log(quizzes)
  const courseQuizzes = quizzes.filter((quiz) => quiz.course === courseId);

  return (
    <div className="container-fluid" style={{ width: "80%" }}>
      <br />
      <br />
      {courseQuizzes.map((quiz) => (
        <div key={quiz._id}>
          <h1>{quiz.title}</h1>
          <p>Due: {quiz.duedate}</p>
          <h1>Quiz Instructions</h1>
          <hr />

          {quiz.questions.map((question, index) => (
            <div key={index}>
              <ul className="list-group">
                <li className="list-group-item list-group-item-secondary justify-content-between align-items-center d-flex">
                <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span style={{ marginRight: 'auto' }}>Question {index + 1}</span>
  <span style={{ marginLeft: 'auto' }}>{question.points} pts</span>
</h5>

           
        </li>

                <li className="list-group-item">
                  {question.text} 
                </li>

                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex} className="list-group-item">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={option}
                        id={`question_${index}_option_${optionIndex}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`question_${index}_option_${optionIndex}`}
                      >
                        {option}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <br />
            </div>
          ))}
        </div>
      ))}

      <br />
      <button className="btn btn-primary" style={{ backgroundColor: "green" }}>
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizPreview;
