import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlus, FaCode, FaEllipsisVertical, FaBold, FaHighlighter, FaItalic, FaUnderline, FaChevronDown, FaCircleCheck, FaAngleDown, FaTextHeight, FaFont, FaKeyboard, FaMaximize, FaCalendar } from "react-icons/fa6";
import "./quizedit.css";
import { useDispatch, useSelector } from "react-redux";
import { setQuiz } from "../quizzesReducer";
import * as client from '../client';
import Questions from "../../Questions"
function QuizEdit() {

  const { courseId, quizId } = useParams();
  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const [activeTab, setActiveTab] = useState("Details");

  const quiz = useSelector((state) => state.quizzesReducer.selectedQuiz);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(quizId);
    client.findQuizById(quizId)
      .then((q) =>
        dispatch(setQuiz(q))
      );
  }, [quizId]);

  console.log(quiz)


  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleInputChange = (field, value) => {
    setUpdatedQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Send the updated quiz data to your backend
    console.log("Updated Quiz")
    console.log(updatedQuiz)
    client.updateQuiz(quizId, updatedQuiz)
      .then((updatedQuiz) => {
        // Update the Redux store with the new quiz data
        dispatch(setQuiz(updatedQuiz));
        // Optionally, you can also show a success message or navigate the user
      })
      .catch((error) => {
        // Handle errors, show error message, etc.
        console.error('Error updating quiz:', error);
      });
  };


  const handleSavePublish = () => {

    console.log("Updated Published Quiz")
    handleInputChange("published",'true');
    console.log(updatedQuiz)
    client.updateQuiz(quizId, updatedQuiz)
      .then((updatedQuiz) => {
        // Update the Redux store with the new quiz data
        dispatch(setQuiz(updatedQuiz));
        // Optionally, you can also show a success message or navigate the user
      })
      .catch((error) => {
        // Handle errors, show error message, etc.
        console.error('Error updating quiz:', error);
      });
  };

  return (
    <>
      
      {quiz && (
        <div className="container-fluid" style={{ "width": "80%" }}>
          <h2>Quizzes for course {courseId}</h2>

          <div className="py-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
                  onClick={() => handleTabClick("Details")}
                >
                  Details
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
                  onClick={() => handleTabClick("Questions")}
                >
                  Questions
                </a>
              </li>
            </ul>
          </div>

          {activeTab === "Details" && (
            <div className="list-group">
              
          <div className="list-group">
            <div className="wd-flex-grow-1">
              <div className="d-flex justify-content-between">
                <input
                  type="text"
                  value={updatedQuiz.title || quiz.title}
                  placeholder="Quiz Name"
                  className="form-control w-25"
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <hr />

            </div>

          </div>

          <label> Quiz Instructions : </label><br></br>

          <div className="btn-group quiz">
            <div className="btn btn-secondary">Edit </div>
            <div className="btn btn-secondary">View </div>
            <div className="btn btn-secondary">Insert</div>
            <div className="btn btn-secondary">Format </div>
            <div className="btn btn-secondary">Tools</div>
            <div className="btn btn-secondary">Tables</div>
          </div>

          <div class="icon-container">
            <label>Font Size 12px <FaChevronDown></FaChevronDown></label>
            <FaBold className="icon"></FaBold>
            <FaItalic className="icon"></FaItalic>
            <FaUnderline className="icon"></FaUnderline>
            <FaFont className="icon"></FaFont>
            <FaChevronDown className="chevron-icon"></FaChevronDown>

            <FaHighlighter className="icon"> </FaHighlighter>
            <FaChevronDown className="chevron-icon"></FaChevronDown>
            <FaTextHeight className="icon"></FaTextHeight>
            <FaChevronDown className="chevron-icon"></FaChevronDown>

            <FaEllipsisVertical className="icon"></FaEllipsisVertical>
          </div>

          <div style={{ "width": "80%" }}>
            <textarea value={updatedQuiz.description || quiz.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="form-control" style={{ "margin-top": "12px", "height": "90px" }}></textarea>
            <br>
            </br>
            <div class="icons-container-red">
              <FaKeyboard class="icons-red"></FaKeyboard>
              <span class="separator">|</span>
              <label class="icons-red">0 words</label>
              <span class="separator">|</span>
              <FaCode class="icons-red"></FaCode>
              <span class="separator">|</span>
              <FaMaximize class="icons-red"></FaMaximize>
              <FaEllipsisVertical class="icons-red"></FaEllipsisVertical>
            </div>
          </div>


          <br>
          </br>
          <table>
            <tr>
              <td>
                <label className="label-table">Quiz Type</label>
              </td>

              <td className="second-col dropdown btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Graded Quiz
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <label className="label-table">Assignment Type</label>
              </td>

              <td className="second-col dropdown btn-group">
                <button type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Assignment
                </button>
              </td>
            </tr>

            <tr>
              <td>
                <label className="label-table">Points</label>
              </td>
              <td className="second-col">
                <input
                  type="number"
                  value={updatedQuiz.points || quiz.points}
                  onChange={(e) => handleInputChange("points", e.target.value)}
                  className="form-control"
                />
              </td>
            </tr>


            <tr>
              <td></td>
              <td className="second-col">
                <label><strong>Options</strong></label>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td className="second-col">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={updatedQuiz.shuffleAnswer || quiz.shuffleAnswer}
                  onChange={(e) => handleInputChange("shuffleAnswer", e.target.checked)}
                />


                Shuffle Answers
              </td>

            </tr>

            <tr>
              <td>

              </td>
              <td className="second-col">
                <input className="form-check-input" type="checkbox" />
                Time Limit <span></span> <span></span><span></span>
                <input style={{ "width": "100px" }}></input> <label>Minutes</label>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td className="second-col"> <input className="form-check-input" type="checkbox" />
                Allow Multiple Attempts
              </td>
            </tr>
            <tr>
              <td><label>Assign </label></td>
              <td className="second-col">
                <table className="inner-table">
                  <tr>
                    <td className="content">
                      <label><strong>Assign to </strong></label>
                      <br></br>
                      <input className="form-input"></input>
                    </td>
                  </tr>

                  <tr>
                    <td className="content">
                      <label><strong>Due</strong></label>
                      <br />
                      <div className="input-group">
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={updatedQuiz.dueDate || quiz.dueDate.substring(0, 16)}
                          onChange={(e) => handleInputChange("dueDate", e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="content">
                      <label><strong>Available From</strong></label>
                      <div className="input-group">
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={updatedQuiz.availableDate || quiz.availableDate.substring(0, 16)}
                          onChange={(e) => handleInputChange("availableDate", e.target.value)}
                        />
                      </div>
                    </td>

                    <td className="content">
                      <label><strong>Until</strong></label>
                      <div className="input-group">
                        <input
                          type="datetime-local"
                          className="form-control"
                          value={updatedQuiz.until || quiz.until.substring(0, 16)}
                          onChange={(e) => handleInputChange("until", e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td><hr></hr></td>
                    <td><hr></hr></td>
                  </tr>
                  <tr>
                    <FaPlus></FaPlus> <label style={{ "font-size": "18px", "text-align": "center" }}>Add </label>
                  </tr>

                </table>
              </td>
            </tr>

          </table>
          <br>
          </br>
          <br></br>
          <div>
          </div>
          <div className="col-lg-9 d-flex align-items-center">
            <input className="form-check" type="checkbox" />
            <label className="ms-2">Notify Users this quiz has changed</label>
            <hr className="my-2 mx-3" />
            <Link
              key={quiz._id}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
              className="btn btn-danger ms-auto m-1 p-1"
              onClick={handleSave}>
              Save
            </Link>
            <Link
              key={quiz._id}
              to={`/Kanbas/Courses/${courseId}/Quizzes/`}
              className="btn btn-outline-secondary m-1 p-1"
              onClick={() => {
                handleInputChange("published", true);
                handleSavePublish();
              }}
            >
              Save & Publish
            </Link>



            <Link
              key={quiz._id}
              to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
              className="btn btn-outline-secondary m-1 p-1">
              Cancel
            </Link>
          </div>

            </div>
          )}

          {activeTab === "Questions" && (
            <div>
              <Questions quizId={quizId} />
              <div className="col-lg-9 d-flex align-items-center">

              <input className="form-check" type="checkbox" />
              <label className="ms-2">Notify Users this quiz has changed</label>
              <hr className="my-2 mx-3" />
              <Link
                key={quiz._id}
                to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                className="btn btn-danger ms-auto m-1 p-1"
                onClick={handleSave}>
                Save
              </Link>
              <Link
                key={quiz._id}
                to={`/Kanbas/Courses/${courseId}/Quizzes/`}
                className="btn btn-outline-secondary m-1 p-1"
                onClick={() => {
                  handleInputChange("published", true);
                  handleSavePublish();
                }}
              >
                Save & Publish
              </Link>



              <Link
                key={quiz._id}
                to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                className="btn btn-outline-secondary m-1 p-1">
                Cancel
              </Link>
            </div>

            </div>
              
            )}
            

          </div>
      )}
    </>
  );
}
export default QuizEdit;

