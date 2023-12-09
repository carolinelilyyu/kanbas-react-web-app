import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as client from "../client";
import { useSelector, useDispatch } from "react-redux";
import {
    updateQuestion,
    setQuestion,
  } from "../questionsReducer";

function QuestionEditor() {
    const formatOptions = ["Multiple Choice", "Fill In The Blank", "True/False"];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId, questionId } = useParams();
    const selectedQuestion = useSelector((state) => state.questionsReducer.selectedQuestion);
    const [currQuestion, setCurrQuestion] = useState('');
    const [currPoints, setCurrPoints] = useState(0);
    const [currFormat, setCurrFormat] = useState('');
    const [currAnswer, setCurrAnswer] = useState([]);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...currAnswer];
        newAnswers[index] = value;
        setCurrAnswer(newAnswers);
    };

    const handleAddAnswer = () => {
        setCurrAnswer([...currAnswer, '']);
    };
        
    const handleUpdateQuestion = async () => {
        const status = await client.updateQuestion(currQuestion);
        dispatch(updateQuestion(currQuestion));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    useEffect(() => {
        if (questionId) {

            console.log(questionId);
            client.getQuestion(questionId)
            .then((q) => {
                dispatch(setQuestion(q));
                setCurrPoints(q.points);
                setCurrQuestion(q.question);
                setCurrFormat(q.format);
                setCurrAnswer(q.answer);
                }
            );
        }   else {
            // Set default values for a new question
            setCurrPoints(0);
            setCurrQuestion('');
            setCurrFormat('');
            setCurrAnswer(['']);
        }
        
    }, [questionId]);


return (<div>
    {selectedQuestion && (
        <div>
            <h1>Question</h1>
            <p>Enter your question, then multiple answers, then select the correct answer.</p>


            <div>
                <label>Edit Question: </label>
                <input type="text" value={currQuestion} onChange={(e) => (setCurrQuestion(e.target.value))} />
            </div>

            <div>
                <label>Edit Points:</label>
                <input type="number" value={currPoints} onChange={(e) => setCurrPoints(e.target.value)} />
            </div>

            <div>
                <label>Format:</label>
                <select value={currFormat} onChange={(e) => setCurrFormat(e.target.value)}>
                    {formatOptions.map((format, index) => (
                        <option key={index} value={format}>
                        {format}
                        </option>
                    ))}
                </select>
            </div> 


            <div>
                <h2>Answers</h2>
                {currAnswer.map((answer, index) => (
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
            
)}
</div>


);
};

export default QuestionEditor;
