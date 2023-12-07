import axios from "axios";
// const MODULES_URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/modules";
const MODULES_URL = "http://localhost:4000/api/modules";


// const COURSES_URL = "https://kanbas-node-server-app-2-x5nj.onrender.com/api/courses";
const COURSES_URL = "http://localhost:4000/api/courses";

export const updateModule = async (module) => {
  const response = await axios.
    put(`${MODULES_URL}/${module._id}`, module);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  console.log("Delete module client");
  const response = await axios
    .delete(`${MODULES_URL}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId, module) => {
  const response = await axios.post(
    `${COURSES_URL}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findModulesForCourse = async (courseId) => {
  console.log(courseId);
  const response = await axios
    .get(`${COURSES_URL}/${courseId}/modules`);
  console.log(response.data);
  return response.data;
};

