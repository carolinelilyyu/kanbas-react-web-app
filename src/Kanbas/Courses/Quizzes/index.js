import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, deleteQuiz, updateQuiz, selectQuiz, setQuizzes, togglePublishStatus } from "./quizzesReducer";
import * as client from "./client";

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
    const options = { year: 'numeric', month: 'short',
     day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
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
            <div className="d-flex">
              <button type="button" className="btn btn-light">
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
          {quizzes.map((quiz) => (
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
                      &nbsp;&nbsp; |&nbsp;&nbsp;
                      <b>Due</b> {quiz.dueDate === 'Multiple Dates' ? (
                        <>
                          <span className="red">Multiple Dates</span>
                        </>
                      ) : (
                        <>{formatDate(quiz.dueDate)}</>
                      )}
                      &nbsp;&nbsp; |&nbsp;&nbsp;
                      {quiz.points} pts &nbsp;&nbsp;|&nbsp;&nbsp;
                      {quiz.questions} Questions
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
