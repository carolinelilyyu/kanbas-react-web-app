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
    const [currTitle, setCurrTitle] = useState('');
    const [currInnerQuestion, setInnerQuestion] = useState('');
    const [currPoints, setCurrPoints] = useState(0);
    const [currFormat, setCurrFormat] = useState('');
    const [currCorrectAnswer, setCurrCorrectAnswer] = useState('');
    const [currPossibleAnswers, setCurrPossibleAnswers] = useState([]);
    const [currOptionalText, setCurrOptionalText] = useState();

    const handlePossibleAnswersChange = (index, value) => {
        const newPossibleAnswers = [...currPossibleAnswers];
        newPossibleAnswers[index] = value;
        setCurrPossibleAnswers(newPossibleAnswers);
    };

    const handleCorrectAnswerChange = (value) => {
        setCurrCorrectAnswer(value);
    };

    const handleAddPossibleAnswer = () => {
        setCurrPossibleAnswers([...currPossibleAnswers, '']);
    };

    const handleDeletePossibleAnswer = (index) => {
        const newAnswers = [...currPossibleAnswers];
        newAnswers.splice(index, 1);
        setCurrPossibleAnswers(newAnswers);
      };
        
    const handleUpdateQuestion = async () => {
        const updatedQuestion = {
            _id: questionId,
            title: currTitle,
            question: currInnerQuestion,
            points: currPoints,
            format: currFormat,
            correctAnswer: currCorrectAnswer,
            optionalText: currOptionalText,
            possibleAnswers: currPossibleAnswers,
          };
        const status = await client.updateQuestion(updatedQuestion);
        console.log(status);
        dispatch(updateQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    useEffect(() => {
        if (questionId) {

            console.log(questionId);
            client.getQuestion(questionId)
            .then((q) => {
                dispatch(setQuestion(q));
                setCurrPoints(q.points);
                setCurrTitle(q.title);
                setInnerQuestion(q.question);
                setCurrFormat(q.format);
                setCurrCorrectAnswer(q.correctAnswer);
                setCurrPossibleAnswers(q.possibleAnswers);
                setCurrOptionalText(q.optionalText);
                }
            );
        }   else {
            // Set default values for a new question
            setCurrPoints(0);
            setCurrTitle('');
            setInnerQuestion('');
            setCurrFormat('');
            setCurrCorrectAnswer('');
            setCurrPossibleAnswers([]);
            setCurrOptionalText('');
        }
        
    }, [questionId]);


return (<div>
    {selectedQuestion && (
        <div>
        
            <div>
                <label>Points:</label>
                <input type="number" value={currPoints} onChange={(e) => setCurrPoints(e.target.value)} />
            </div>

            <input type="text" value={currTitle} onChange={(e) => setCurrTitle(e.target.value)} />
            
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
            <hr></hr>
            <h3>Enter your question, then multiple answers, then select the correct answer.</h3>
            <h1>Question: </h1>

            <input type="text" value={currOptionalText} onChange={(e) => setCurrOptionalText(e.target.value)} />

            <div>
                <textarea
                    rows={4}
                    cols={50}
                    value={currInnerQuestion} 
                    onChange={(e) => (setInnerQuestion(e.target.value))} />
            </div>




            <div>
                <h2>Answers</h2>
                <label>{`Correct answer`}</label>
                    <input
                        type="text"
                        value={currCorrectAnswer}
                        onChange={(e) => handleCorrectAnswerChange(e.target.value)}
                    />
                {currPossibleAnswers.map((answer, index) => (
                <div key={index}>
                    <label>{`Possible answer`}</label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => handlePossibleAnswersChange(index, e.target.value)}
                    />
                    <button onClick={() => handleDeletePossibleAnswer(index)}>Delete</button>
                </div>
                ))}
                <button onClick={handleAddPossibleAnswer}>+ Add Answer</button>
            </div> 

            <div>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                    className="btn btn-light">
                    Cancel
                </Link>
                <button className="btn btn-danger" onClick={handleUpdateQuestion}>Update Question</button>
            </div>

        </div>
            
)}
</div>


);
};

export default QuestionEditor;
