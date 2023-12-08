import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuestionsList = () => {
//   const { quizId } = useParams();
    const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);

  const fetchQuestionsForQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quizzes/${quizId}/questions`);
      console.log(response);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestionsForQuiz();
  }, [quizId]);

  return (
    <div>
      <h1>Questions for Quiz {quizId}</h1>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            {question.question} {/* Display other details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
