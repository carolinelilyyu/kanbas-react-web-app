import { Link } from "react-router-dom";
import db from "../Database";
import "./index.css";

function Dashboard(){
    const courses = db.courses;
    return (
        <div className="wd-dashboard">
          <h1>Dashboard</h1>
          <hr />
          <h2>Published Course ({courses.length})</h2>
          <div class="row rows-col-1 row-cols-md-3 g-4">
            <div class="col">
              <div className="list-group">
                {courses.map((course) => (
                   <div class="card h-100">
                   <img class="card-img-top" src="/images/course.png" alt="Card image cap"></img>
                   <div class="card-body">
                     <h5 class="card-title">Card title</h5>
                    <Link key={course._id} to={`/Kanbas/Courses/${course._id}`} className="list-group-item">
                      {course.name}
                    </Link>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        
      );
    
}
export default Dashboard;