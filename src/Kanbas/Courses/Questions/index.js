import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { 
    addQuestion,
    deleteQuestion,
    setQuestionList,
    setQuestion,
 } from './questionsReducer';

function QuestionsList() {
    const dispatch = useDispatch();

  const { courseId } = useParams();
  const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);

  const handleAddQestion = () => {
    const newQuestion = {
      title: 'New Question',
      format: 'Multiple Choice',
      possibleAnswers: [],
    };
  
    client.addQuestion(quizId, newQuestion).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
      setQuestions([...questions, newQuestion]); // Prepend the new question to the list
    });
    };

    const handleDeleteQuestion = (questionId) => {
        client.deleteQuestion(questionId).then((status) => {
          dispatch(deleteQuestion(questionId));
        });
      };

      //useeffect to real time, is a hook, perform side effects, whenever update data or variable/ component, reload entire screen
  useEffect(() => {
    client.findQuestionsForQuiz(quizId)
      .then((questions) => {
        dispatch(setQuestionList(questions));
            setQuestions(questions);
        });
       
  }, [quizId]);

  return (
    <div>
      <h1>Questions for Quiz {quizId}</h1>
        <button type="button" class="btn btn-danger" 
            onClick={handleAddQestion}>
            Add
        </button>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
             <li class="list-group-item d-flex justify-content-between align-items-center">
             <Link to={`/Kanbas/Courses/${courseId}/Questions/${question._id}/Edit`}>
              {question.title}
            </Link>
            <div>
            <button
            type="button" class="btn btn-light"
            onClick={() => dispatch(setQuestion(question))}>
            Edit
            </button>

            <button
                type="button" class="btn btn-danger"                                 
                onClick={() => handleDeleteQuestion(question._id)}>
                Delete
            </button>
            </div>
        </li>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;