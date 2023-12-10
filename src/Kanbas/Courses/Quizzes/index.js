import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, deleteQuiz, updateQuiz, selectQuiz, setQuizzes, togglePublishStatus } from "./quizzesReducer";
import * as client from "./client";
import axios from "axios";

function Quizzes() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const quizzes = useSelector(state => state.quizzesReducer.quizzes);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuQuizId, setMenuQuizId] = useState(null);
  const [quizMenuOpen, setQuizMenuOpen] = useState({});

  useEffect(() => {
    client.findAllQuizzesByCourse(courseId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, [courseId, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuizMenuClick = (quizId) => {
    setQuizMenuOpen(prevState => ({ ...prevState, [quizId]: !prevState[quizId] }));
    setMenuQuizId(quizId);
  };

  const handlePublish = (quizId) => {
    console.log("changing publish status");
    client.publishQuiz(quizId).then((status) => {
      dispatch(togglePublishStatus(quizId));
      // Reload the quizzes after deletion
      client.findAllQuizzesByCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)))
        .catch((error) => console.error("Error fetching quizzes:", error));
    });
  };

  const handleDeleteQuiz = (quizId) => {
    console.log("delete quiz inside quizzes");
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
      // Reload the quizzes after deletion
      client.findAllQuizzesByCourse(courseId)
        .then((quizzes) => dispatch(setQuizzes(quizzes)))
        .catch((error) => console.error("Error fetching quizzes:", error));
    });
  };

  const formatDate = (dateString) => {
    if (dateString === "Multiple Dates") {
      return "Multiple Dates";
    }
    const date = new Date(dateString);
    const options = {
      year: 'numeric', month: 'short',
      day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
    };
    return date.toLocaleDateString('en-US', options);
  };

  const [newQuiz, setNewQuiz] = useState({
    title: "New Quiz",
    course: courseId,
    dueDate: "1999-01-01T00:00:00",
    until: "1999-01-01T00:00:00",
    availableDate: "1999-01-01T00:00:00",
    questions: [],
  });

  const U = `http://localhost:4000/api/Courses/${courseId}/Quizzes`;
  const handleNewQuizChange = (event) => {
    setNewQuiz({ ...newQuiz, [event.target.name]: event.target.value });
  };
  const addNewQuiz = async () => {
    console.log("adding new quiz");
    const response = await axios.post(U, newQuiz);
    dispatch(addQuiz(response.data));
    setNewQuiz({
      title: "New Quiz",
      course: courseId,
      duedate: "2023-12-15",
      questions: [
        { points: 2, }
      ],
    });
  };


  return (
    <div>
      <div className="list-group mx-3">
        <div className="wd-flex-grow-1">
          <div className="d-flex justify-content-between">
            <input
              type="text"
              id="searchQuiz"
              placeholder="Search for Quizzes"
              className="form-control w-25"
              value={searchTerm}
          onChange={handleSearchChange}
            />
            {/* <input
              type="text"
              name="title"
              placeholder="Enter Quiz Title"
              className="form-control w-25"
              value={newQuiz.title}
              onChange={handleNewQuizChange}
            /> */}
            <div className="d-flex">

              <button type="button" className="btn btn-light" onClick={addNewQuiz}>
                + Quiz

              </button>
              <button type="button" className="btn btn-light">
                <FaEllipsisVertical />
              </button>
            </div>
          </div>
          <hr />
          <ul className="list-group rounded-0">
            <li className="list-group-item list-group-item-secondary 
            d-flex justify-content-between align-items-center">
              Assignment Quizzes
            </li>
          </ul>
          {filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="row my-3 border p-3 rounded">
              <div className="col-1 green">
                <BiSolidPlaneAlt />
              </div>
              <div className="col-10">
                <Link
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                  className="list-group-item"
                >
                  <a
                    href={`/kanbas/quizzes/${quiz._id}`}
                    className="list-group-item-action justify-content-between align-items-start"
                  >
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-1">{quiz.title}</h5>
                    </div>
                    <p className="mb-1">{quiz.course}</p>
                    <small className="text-muted">
                      {quiz.status !== 'Closed' ? (
                        <>
                          <b>Available </b>
                          <span className="red">Multiple Dates</span>
                        </>
                      ) : (
                        <b>{quiz.status}</b>
                      )}
                      <b>Due</b> {quiz.dueDate === 'Multiple Dates' ? (
                        <>
                          <span className="red">Multiple Dates</span>
                        </>
                      ) : (
                        <>{formatDate(quiz.dueDate)}</>
                      )}
                      &nbsp;&nbsp; |&nbsp;&nbsp;
                      {quiz.points} pts &nbsp;&nbsp;|&nbsp;&nbsp;
                      {quiz.questions.length} Questions
                    </small>
                  </a>
                </Link>
              </div>
              <div className="col-1 text-end">
                {quiz.published ? (
                  <FaCheckCircle className="fa-check-circle" />
                ) : null}
                <button
                  className="quiz-menu-button"
                  onClick={() => handleQuizMenuClick(quiz._id)}
                >
                  <small className="text-muted">
                    <FaEllipsisVertical />
                  </small>
                </button>
                {quizMenuOpen[quiz._id] && (
                  <div className="quiz-menu">
                    <button onClick={() => handleDeleteQuiz(quiz._id)}>
                      Delete
                    </button>
                    <button onClick={() => handlePublish(quiz._id)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
