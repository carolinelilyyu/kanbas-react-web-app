import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
import { 
    addQuestion,
    deleteQuestion,
    setQuestionList,
 } from './questionsReducer';
import {AiOutlineCheckCircle} from "react-icons/ai";
import {FaEllipsisVertical} from "react-icons/fa6";

function QuestionsList() {
    const dispatch = useDispatch();

  const { courseId } = useParams();
  const quizId = "75510e70870c092d5441bc94";
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const [format, setFormat] = useState();
  const [answer, setAnswer] = useState();

  const handleAddModule = () => {
    console.log(question);
    client.addQuestion(quizId, question).then((question) => {
        console.log(question);
        //should be dispatch(addQuestion(question))
        dispatch(addQuestion(question));
        });
    };

    const handleDeleteModule = (questionId) => {
        console.log("delete question inside questionlist");
        client.deleteQuestion(questionId).then((status) => {
            //needs to have dispatch
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
      <input value={question.title}
        onChange={(e)=> (setQuestion({ ...question, question: e.target.value }))
        }
        />
        <br/>
        <textarea value={question.answer}
        //needs to have dispatch (look at module)
        onChange={(e) => (setAnswer({ ...question, answer: e.target.value }))                            
        }
        />
        <br></br>
        <button type="button" class="btn btn-danger" 
            onClick={handleAddModule}>
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
            onClick={() => (setQuestion(question))}>
            Edit
            </button>

            <button
                type="button" class="btn btn-danger"                                 
            //  onClick={() => dispatch(deleteModule(module._id))}>
                onClick={() => handleDeleteModule(question._id)}>
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