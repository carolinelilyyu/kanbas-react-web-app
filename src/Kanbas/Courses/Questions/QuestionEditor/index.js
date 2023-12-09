import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import * as client from "../client";
import { useSelector, useDispatch } from "react-redux";
import {
    updateQuestion,
    getQuestion,
  } from "../questionsReducer";

function QuestionEditor() {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const {questionId} = useParams();
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState(0);
    const [format, setFormat] = useState('');
    const [answers, setAnswers] = useState(['']); // Initial answer
    const [question, setQuestion] = useState(['']); // Initial answer

    useEffect(() => {
        console.log(questionId);
      client.getQuestion(questionId)
        .then((question) => {
            setQuestion(question);
            setPoints(question.points);
            setTitle(question.question);
            setFormat(question.format);
            setAnswers(question.answer);
            }
        );
    }, [questionId]);
  
    const handleUpdateQuestion = async () => {
        const status = await client.updateQuestion(module);
        dispatch(updateQuestion(module));
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, '']);
    };

    const handleCancel = () => {
        // Assuming you are using react-router for navigation
        alert("let's go back");
        // history.goBack();
    };

  return (
    <div>
      <h1>Question</h1>
      <p>Enter your question, then multiple answers, then select the correct answer.</p>

      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Points:</label>
        <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
      </div>

      <div>
        <label>Format:</label>
        <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} />
      </div>

      <div>
        <h2>Answers</h2>
        {answers.map((answer, index) => (
          <div key={index}>
            <label>{`Answer ${index + 1}:`}</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddAnswer}>+ Add Answer</button>
      </div>

      <div>
      <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
              className="btn btn-light">
          Cancel
        </Link>
        {/* <button onClick={handleCancel}>Cancel</button> */}
        <button onClick={handleUpdateQuestion}>Update Question</button>
      </div>
    </div>
  );
};

export default QuestionEditor;
