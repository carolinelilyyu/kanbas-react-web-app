import {Routes, Route, Navigate } from "react-router";
import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import Account from "./Account";
import Calendar from "./Calendar";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import Inbox from "./Inbox";
function Kanbas() {
    return(
   <div>
      <Nav />
      <div className="d-flex">
      <KanbasNavigation />
         <div>
            <Routes>
               <Route path="/" element={<Navigate to="Dashboard" />} />
               <Route path="Account" element={ <Account /> } />
               <Route path="Dashboard" element={ <Dashboard /> } />
               <Route path="Courses/:courseId/*" element={ <Courses /> } />
               <Route path="Calendar" element={ <Calendar /> } />
            </Routes>
         </div>
      </div>

   </div>
    );
 }
 export default Kanbas
 
 