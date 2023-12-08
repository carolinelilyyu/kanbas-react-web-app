import db from '../../Database'
import React, { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidPlaneAlt } from "react-icons/bi";
import quizzesReducer, { addQuiz, deleteQuiz, updateQuiz, selectQuiz } from "./quizzesReducer";
import { FaEllipsisVertical } from "react-icons/fa6";
import "./index.css";

function Quizzes() {
  const { courseId } = useParams();
  const [state, dispatch] = useReducer(quizzesReducer, { quizzes: db.quizzes, selectedQuiz: null });
console.log(state);

  const sortedQuizzes = state.quizzes.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [menuQuizId, setMenuQuizId] = React.useState(null);
  const [quizzes, setQuizzes] = React.useState(sortedQuizzes);

  useEffect(() => {
    // Update component state when Redux state changes
    setQuizzes(sortedQuizzes);
  }, [state.quizzes, sortedQuizzes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterQuizzes(event.target.value);
  };

  const filterQuizzes = (searchTerm) => {
    const filteredQuizzes = sortedQuizzes.filter((quiz) =>
      quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setQuizzes(filteredQuizzes);
  };

  const handleQuizMenuClick = (event, quizId) => {
    setIsMenuOpen(!isMenuOpen);
    setMenuQuizId(quizId);
  };

  const handleDeleteQuiz = (quizId) => {
    dispatch(deleteQuiz(quizId));  
    setIsMenuOpen(false);
  };

  const handleTogglePublish = (quizId) => {
    const quizToUpdate = state.quizzes.find((quiz) => quiz.id === quizId);
    const updatedQuiz = { ...quizToUpdate, published: !quizToUpdate.published };
    dispatch(updateQuiz(updatedQuiz)); 
    setIsMenuOpen(false);
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
                +Quiz
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
                <Link
                  key={quiz.id}
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                  className="list-group-item"
                >
                  <a
                    href={`/kanbas/quizzes/${quiz.id}`} 
                    className="list-group-item-action
                    justify-content-between align-items-start"
                  >
                <div className="row">
                  <div className="col-1 green">
                    <BiSolidPlaneAlt />
                  </div>
                  <div className="col-10">
                    <div className=" justify-content-between">
                      <h5 className="mb-1">{quiz.subject}</h5>
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
                        <>  {quiz.dueDate}</>
                      )}
                      &nbsp;&nbsp; |&nbsp;&nbsp;
                      {quiz.points} pts &nbsp;&nbsp;|&nbsp;&nbsp;
                      {quiz.questions} Questions
                    </small>
                  </div>
                  <div className="col-1 text-end">
                    {quiz.published ? (
                      <FaCheckCircle className="fa-check-circle" />
                    ) : null}
                    <button
                      className="quiz-menu-button"
                      onClick={(e) => handleQuizMenuClick(e, quiz.id)}
                    >
                      <small className="text-muted">
                        <FaEllipsisVertical />
                      </small>
                    </button>
                    {isMenuOpen && menuQuizId === quiz.id && (
                      <div className="quiz-menu">
                        <button onClick={() => handleDeleteQuiz(quiz.id)}>
                          Delete
                        </button>
                        <button onClick={() => handleTogglePublish(quiz.id)}>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quizzes;
