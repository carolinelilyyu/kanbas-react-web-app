import axios from "axios";
// const MODULES_URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/modules";
const QUESTIONS_URL = "http://localhost:4000/api/questions";


// const COURSES_URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/courses";
const QUIZZES_URL = "http://localhost:4000/api/quizzes";

export const updateQuestion = async (question) => {
  const response = await axios.
    put(`${QUESTIONS_URL}/${question._id}`, question);
  return response.data;
};

export const deleteQuestion = async (questionId) => {
  console.log("Delete module client");
  const response = await axios
    .delete(`${QUESTIONS_URL}/${questionId}`);
  return response.data;
};


export const getQuestion = async (questionId) => {
    console.log("Get  client");
    const response = await axios
      .get(`${QUESTIONS_URL}/${questionId}`);
    return response.data;
  };

export const addQuestion = async (quizId, question) => {
  const response = await axios.post(
    `${QUIZZES_URL}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const findQuestionsForQuiz = async (quizId) => {
  console.log(quizId);
  const response = await axios
    .get(`${QUIZZES_URL}/${quizId}/questions`);
  console.log(response.data);
  return response.data;
};

