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
    const [currOptions, setCurrOptions] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);

    const handleOptionsChange = (index, value) => {
        const newOptions = [...currOptions];
        newOptions[index] = value;
        setCurrOptions(newOptions);
    };

    const handleCorrectOptionChange = (index) => {
        const newCorrectOptions = [...correctOptions];
        newCorrectOptions[index] = !newCorrectOptions[index];
        setCorrectOptions(newCorrectOptions);
    };

    const handleAddOption = () => {
        setCurrOptions([...currOptions, '']);
        setCorrectOptions([...correctOptions, false]);
    };

    const handleDeleteOption = (index) => {
        const newOptions = [...currOptions];
        newOptions.splice(index, 1);
        setCurrOptions(newOptions);

        const newCorrectOptions = [...correctOptions];
        newCorrectOptions.splice(index, 1);
        setCorrectOptions(newCorrectOptions);
    };

    const handleUpdateQuestion = async () => {
        const updatedQuestion = {
            _id: questionId,
            title: currTitle,
            question: currInnerQuestion,
            points: currPoints,
            format: currFormat,
            correctAnswer: currCorrectAnswer,
            options: currOptions,
            correctOptions: correctOptions,
        };

        const status = await client.updateQuestion(updatedQuestion);
        console.log(status);
        dispatch(updateQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    useEffect(() => {
        if (questionId) {
            client.getQuestion(questionId)
                .then((q) => {
                    dispatch(setQuestion(q));
                    setCurrPoints(q.points);
                    setCurrTitle(q.title);
                    setInnerQuestion(q.question);
                    setCurrFormat(q.format);
                    setCurrCorrectAnswer(q.correctAnswer);
                    setCurrOptions(q.options);
                    // Assuming correctOptions is stored in the database response
                    setCorrectOptions(q.correctOptions || []);
                });
        } else {
            // Set default values for a new question
            setCurrPoints(0);
            setCurrTitle('');
            setInnerQuestion('');
            setCurrFormat('');
            setCurrCorrectAnswer('');
            setCurrOptions([]);
            setCorrectOptions([]);
        }

    }, [questionId]);

    return (
        <div>
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

                    <div>
                        <textarea
                            rows={4}
                            cols={50}
                            value={currInnerQuestion}
                            onChange={(e) => (setInnerQuestion(e.target.value))} />
                    </div>

                    <div>
                        <h2>Answers</h2>
                        {currOptions.map((answer, index) => (
                            <div key={index}>
                                <label>{`Option`}</label>
                                <input
                                    type="text"
                                    value={answer}
                                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                                />
                                <input
                                    type="checkbox"
                                    checked={correctOptions[index] || false}
                                    onChange={() => handleCorrectOptionChange(index)}
                                />
                                <button onClick={() => handleDeleteOption(index)}>Delete</button>
                            </div>
                        ))}
                        <button onClick={handleAddOption}>+ Add Option</button>
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
