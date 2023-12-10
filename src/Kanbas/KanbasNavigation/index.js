import { Link, useLocation } from "react-router-dom";
import {BiUserCircle} from "react-icons/bi";
import {RiDashboard3Line} from "react-icons/ri";
import {FaBook} from "react-icons/fa";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import {AiOutlineInbox} from "react-icons/ai";
import {AiOutlineHistory} from "react-icons/ai";
import {SiSlideshare} from "react-icons/si";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import {BiSolidHelpCircle} from "react-icons/bi";

import "./index.css";
import northeasternicon from "./northeasternicon.png";

function KanbasNavigation() {
  const links = [
    "Account", 
    "Dashboard", 
    "Courses", 
    "Calendar",
    "Inbox",
    "History",
    "Studio",
    "Commons",
    "Help",
  ];

  const linkToIconMap = {
    Account: <BiUserCircle className="wd-icon" />,
    Dashboard: <RiDashboard3Line className="wd-icon"/>,
    Courses: <FaBook className="wd-icon"/>,
    Calendar: <BsFillCalendar2WeekFill className="wd-icon"/>,
    Inbox: <AiOutlineInbox className="wd-icon"/>,
    History: <AiOutlineHistory className="wd-icon"/>,
    Studio: <SiSlideshare className="wd-icon" />,
    Commons: <BsFillArrowRightCircleFill className="wd-icon"/>,
    Help: <BiSolidHelpCircle className="wd-icon"/>,
  }

  const { pathname } = useLocation();
  return (
    <div className="list-group wd-kanbas-navigation d-sm-none d-md-none d-lg-block" >
            <img  src="/images/northeastern.png" className="northeasternicon"/> 
                {links.map((link, index) => (
                    <Link
                    key={index}
                    to={`/Kanbas/${link}`}
                    className={`list-group-item ${pathname.includes(link) && "active"}`}>
                    {linkToIconMap[link]}<br />
                    {link}
                    </Link>
                ))}
        </div>
  );
}
export default KanbasNavigation;