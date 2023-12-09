import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as client from "./client";

function QuestionsList() {
  const { courseId } = useParams();
  const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    client.findQuestionsForQuiz(quizId)
      .then((questions) => setQuestions(questions));
  }, [quizId]);

  return (
    <div>
      <h1>Questions for Quiz {quizId}</h1>
      <Link to={`/Kanbas/Courses/${courseId}/Questions/${quizId}/Edit`}>
        <button>Edit Question</button>
      </Link>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            <Link to={`/Kanbas/Courses/${courseId}/Questions/${question._id}/Edit`}>
              {question.question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
