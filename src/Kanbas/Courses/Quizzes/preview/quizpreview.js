import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "../../Questions/client"; import { useDispatch, useSelector } from "react-redux";
import { setQuestionList } from "../../Questions/questionsReducer";

function QuizPreview() {

  const { quizId } = useParams();

  const questions = useSelector((state) => state.questionsReducer.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    client.findQuestionsForQuiz(quizId)
      .then((questions) => dispatch(setQuestionList(questions)))
      .catch((error) => console.error("Error fetching quizzes:", error));
    console.log(questions)
  }, [quizId, dispatch]);



  return (<>
    {questions && (
      <div className="container-fluid" style={{ width: "80%" }}>
        <br />
        <br />
        <h3>Quiz Instructions</h3>


        {questions.map((question, index) => (
          <div key={index}>
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary justify-content-between align-items-center d-flex">
                <h5 style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ marginRight: 'auto' }}>Question {index + 1}</span>
                  <span style={{ marginRight: '0px' }}>{question.points} pts</span>
                </h5>
              </li>

              <li className="list-group-item">
                {question.question}
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


        <br />
        <button className="btn btn-primary" style={{ backgroundColor: "green" }}>
          Submit Quiz
        </button>
      </div>)}</>
  );
}

export default QuizPreview;
