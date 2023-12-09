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

export const createQuestion = async (quizId, question) => {
  const response = await axios.post(
    `${QUIZZES_URL}/${quizId}/questions`,
    module
  );
  return response.data;
};

// export const findQuestionsForQuiz = async (quizId) => {
//   console.log(quizId);
//   const response = await axios
//     .get(`${QUIZZES_URL}/${quizId}/questions`);
//   console.log(response.data);
//   return response.data;
// };

export const findQuestionsForQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
      console.log(quizId);
      axios
        .get(`${QUIZZES_URL}/${quizId}/questions`)
        .then((response) => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };