// import React, { useState } from 'react';
// import axios from 'axios';

// const EditQuestionPage = () => {
//   const [title, setTitle] = useState('');
//   const [points, setPoints] = useState(0);
//   const [format, setFormat] = useState('');
//   const [answers, setAnswers] = useState(['']); // Initial answer

//   const handleAnswerChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = value;
//     setAnswers(newAnswers);
//   };

//   const handleAddAnswer = () => {
//     setAnswers([...answers, '']);
//   };

//   const handleCancel = () => {
//     // Assuming you are using react-router for navigation
//     alert("let's go back");
//     // history.goBack();
//   };

//   const handleUpdateQuestion = () => {
//     const data = {
//       title,
//       points,
//       format,
//       answers,
//     };

//     // Assuming you have an API endpoint for updating questions
//     axios.post('/api/updateQuestion', data)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log(response.data);
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h1>Question</h1>
//       <p>Enter your question, then multiple answers, then select the correct answer.</p>

//       <div>
//         <label>Title:</label>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//       </div>

//       <div>
//         <label>Points:</label>
//         <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
//       </div>

//       <div>
//         <label>Format:</label>
//         <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} />
//       </div>

//       <div>
//         <h2>Answers</h2>
//         {answers.map((answer, index) => (
//           <div key={index}>
//             <label>{`Answer ${index + 1}:`}</label>
//             <input
//               type="text"
//               value={answer}
//               onChange={(e) => handleAnswerChange(index, e.target.value)}
//             />
//           </div>
//         ))}
//         <button onClick={handleAddAnswer}>+ Add Answer</button>
//       </div>

//       <div>
//         <button onClick={handleCancel}>Cancel</button>
//         <button onClick={handleUpdateQuestion}>Update Question</button>
//       </div>
//     </div>
//   );
// };

// export default EditQuestionPage;
