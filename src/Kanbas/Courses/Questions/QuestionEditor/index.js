import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as client from "../client";
import { useSelector, useDispatch } from "react-redux";
import { updateQuestion, setQuestion } from "../questionsReducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { Dropdown } from 'react-bootstrap';
import "./index.css";

function QuestionEditor() {
    const formatOptions = ["Multiple Choice", "Fill In The Blank", "True/False"];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId, questionId } = useParams();
    const selectedQuestion = useSelector((state) => state.questionsReducer.selectedQuestion);
    const [currTitle, setCurrTitle] = useState('');
    const [currInnerQuestion, setInnerQuestion] = useState('');
    const [currPoints, setCurrPoints] = useState(0);
    const [currFormat, setCurrFormat] = useState(formatOptions[0]); // Set an initial value from the options
    const [currOptions, setCurrOptions] = useState([]);
    const [currCorrectOptions, setCurrCorrectOptions] = useState([]);

    const handleOptionsChange = (index, value) => {
        const newOptions = [...currOptions];
        newOptions[index] = value;
        setCurrOptions(newOptions);
    };

    const handleCorrectOptionChange = (index) => {
        const newCorrectOptions = [...currCorrectOptions];
        newCorrectOptions[index] = !newCorrectOptions[index];
        setCurrCorrectOptions(newCorrectOptions);
    };

    const handleAddOption = () => {
        setCurrOptions([...currOptions, '']);
        setCurrCorrectOptions([...currCorrectOptions, false]);
    };

    const handleDeleteOption = (index) => {
        const newOptions = [...currOptions];
        newOptions.splice(index, 1);
        setCurrOptions(newOptions);

        const newCorrectOptions = [...currCorrectOptions];
        newCorrectOptions.splice(index, 1);
        setCurrCorrectOptions(newCorrectOptions);
    };

    const handleUpdateQuestion = async () => {
        const updatedQuestion = {
            _id: questionId,
            title: currTitle,
            question: currInnerQuestion,
            points: currPoints,
            format: currFormat,
            options: currOptions,
            currCorrectOptions: currCorrectOptions,
        };

        const status = await client.updateQuestion(updatedQuestion);
        console.log(status);
        dispatch(updateQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    
useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
        try {
            if (questionId) {
                const q = await client.getQuestion(questionId);
                console.log("setting up your question");
                if (isMounted) {
                    dispatch(setQuestion(q));
                    setCurrPoints(q.points);
                    setCurrTitle(q.title);
                    setInnerQuestion(q.question);
                    setCurrFormat(q.format); // Set the format based on the fetched question
                    setCurrOptions(q.options);
                    // Assuming currCorrectOptions is stored in the database response
                    setCurrCorrectOptions(q.currCorrectOptions || []);
                }
            } else {
                // Set default values for a new question
                if (isMounted) {
                    setCurrPoints(0);
                    setCurrTitle('');
                    setInnerQuestion('');
                    setCurrFormat(formatOptions[0]);
                    setCurrOptions([]);
                    setCurrCorrectOptions([]);
                }
            }
        } catch (error) {
            console.error("Error fetching question:", error);
        }
    };

    fetchData();

    return () => {
        // Component is unmounting, update the variable
        isMounted = false;
    };
}, [questionId, dispatch]);

    return (
        <div>
            {!selectedQuestion && 
                <div>Loading...</div>
            }

            {selectedQuestion && (
                <div>
                    <div className='container'>
                        <div className='row'>
                            
                            <div className='col-sm-3'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    value={currTitle}
                                    onChange={(e) => setCurrTitle(e.target.value)}
                                />
                            </div>
                            <div className='col-sm'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary">
                                    {currFormat || 'Select Format'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    {formatOptions.map((format, index) => (
                                        <Dropdown.Item
                                        key={index}
                                        onClick={() => setCurrFormat(format)}
                                        >
                                        {format}
                                        </Dropdown.Item>
                                    ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                </div>
                            
                            <div className='col-sm-2'>
                            <div className="form-group d-flex align-items-center">
                                <label className="mr-2">pts:</label>
                                <input
                                type="number"
                                className="form-control"
                                value={currPoints}
                                onChange={(e) => setCurrPoints(e.target.value)}
                                />
                            </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <small className="text-muted">Enter your question, then multiple answers, then select the correct answer.</small>

                    {selectedQuestion && currFormat === 'Multiple Choice' ? (
                        <div>
                            <label htmlFor="questionText" className="form-label"><b>Question:</b></label>
                                <ReactQuill
                                    rows={4}
                                    id="questionText"
                                    value={currInnerQuestion}
                                    onChange={(value) => setInnerQuestion(value)}
                                />
                            <div>
                                <br></br>
                                
                                <h6><b>Answer:</b></h6>
                                <small className="text-muted">Select the possible option(s) that would be correct.</small>

                                {currOptions.map((answer, index) => (
                                    <div key={index} className="row align-items-center">
                                    <div className="col-sm-4">
                                        <label>{`Possible answer:`}</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={answer}
                                            onChange={(e) => handleOptionsChange(index, e.target.value)}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <input
                                            type="checkbox"
                                            checked={currCorrectOptions[index] || false}
                                            onChange={() => handleCorrectOptionChange(index)}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-danger" onClick={() => handleDeleteOption(index)}>Delete</button>
                                    </div>
                                </div>
                                
                                ))}
                                <br></br>
                                <button className="custom-button" onClick={handleAddOption}>+ Add Option</button>
                                
                            </div>
                        </div>
                    ) : selectedQuestion && currFormat === 'True/False' ? (
                        <div>
                            <label htmlFor="questionText" className="form-label"><b>Question:</b></label>
                                    <ReactQuill
                                        rows={4}
                                        id="questionText"
                                        value={currInnerQuestion}
                                        onChange={(value) => setInnerQuestion(value)}
                                    />
                                <div>
                                <br></br>
                                
                                <h6><b>Answer:</b></h6>
                                <div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="trueRadio"
                                        value="true"
                                        checked={currCorrectOptions === 'true'}
                                        onChange={() => setCurrCorrectOptions('true')}
                                    />
                                    <label className="form-check-label" htmlFor="trueRadio">True</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="falseRadio"
                                        value="false"
                                        checked={currCorrectOptions === 'false'}
                                        onChange={() => setCurrCorrectOptions('false')}
                                    />
                                    <label className="form-check-label" htmlFor="falseRadio">False</label>
                                </div>
                            </div>
                            </div>
                        </div>
                    ) : selectedQuestion && currFormat === 'Fill In The Blank' ? (
                        <div>
                            <label htmlFor="questionText" className="form-label"><b>Question:</b></label>
                                    <ReactQuill
                                        rows={4}
                                        id="questionText"
                                        value={currInnerQuestion}
                                        onChange={(value) => setInnerQuestion(value)}
                                    />
                                <br></br>
                                
                                <h6><b>Answer:</b></h6>
                            {currOptions.map((answer, index) => (
                                        <div key={index} className="row align-items-center">
                                        <div className="col-sm-4">
                                            <label>{`Possible answer:`}</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={answer}
                                                onChange={(e) => handleOptionsChange(index, e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="col-sm-2">
                                            <button className="btn btn-danger" onClick={() => handleDeleteOption(index)}>Delete</button>
                                        </div>
                                    </div>
                                    
                                ))}
                                <br></br>
                                <button className="custom-button" onClick={handleAddOption}>+ Add Option</button>
                        </div>
                    ):(
                        <div>
                           Loading
                        </div>
                    )}

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
}

export default QuestionEditor;
