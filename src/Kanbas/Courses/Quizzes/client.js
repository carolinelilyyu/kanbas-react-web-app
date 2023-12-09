import axios from "axios";
const MAIN_URL = "http://localhost:4000/api";


export const findAllQuizzesByCourse = async (courseId) => {
  const response = await axios
    .get(`${MAIN_URL}/courses/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById =  async (quizId) => {
  try {
    const response = await axios.get(`${MAIN_URL}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
  }
};

export const deleteQuiz = async (quizId) => {
  console.log("Delete quiz client");
  const response = await axios
    .delete(`${MAIN_URL}/quizzes/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId) => {
  console.log("Publish status change");
  const response = await axios
    .put(`${MAIN_URL}/quizzes/${quizId}/published`);
  return response.data;
};

export const updateQuiz = async (quizId,quiz) => {
  console.log(quiz);
  const response = await axios.put(`${MAIN_URL}/quizzes/${quizId}`, quiz);
  return response.data;
};
