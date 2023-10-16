import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";

function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;
  return (
    <div>

    <ul className="list-group">
      <div class="d-flex float-end">
          <button type="button" class="btn btn-light">Collapse All</button>
          <button type="button" class="btn btn-light">View Progress</button>
          <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa fa-check-circle" aria-hidden="true"></i>
                  Publish All
              </button>
              <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
          </div>
          <button type="button" class="btn btn-danger">Module</button>
          <button type="button" class="btn btn-light"><i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          </button>
      </div>
      <ul class="list-group mb-5">
                <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Resources
                    <span><i class="fa fa-check-circle" aria-hidden="true"></i>
                        <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
                    </span>
                </li>
            </ul>
      <ul class="list-group mb-5">
          <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Required Textbooks
              <span><i class="fa fa-check-circle" aria-hidden="true"></i>
                  <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
              </span>
          </li>
      </ul>
      {
       modules
         .filter((module) => module.course === courseId)
         .map((module, index) => (
          <div>
          <ul class="list-group mb-5">
                <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Week {module.week} - {module.name}
                    <span><i class="fa fa-check-circle" aria-hidden="true"></i>
                        <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">LEARNING OBJECTIVES
                    <span><i class="fa fa-check-circle" aria-hidden="true"></i>
                        <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
                    </span>
                </li>

                <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">{module.description}
                        
                        <span><i class="fa fa-check-circle" aria-hidden="true"></i>
                            <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
                        </span>
                    </li>
            </ul>
            
          </div>
           
      ))
      }
    </ul>
    </div>

            // <ul>
                


            // </div>
            //     <br/>
            //     <hr>
            //     <!-- week 0 -->
            //     <ul class="list-group mb-5">
            //         <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Week 0 - INTRO
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <!-- Learning objectives -->
            //         <li class="list-group-item d-flex justify-content-between align-items-center">LEARNING OBJECTIVES
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Introduction to the course
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Learn what is Web Development
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Creating a development environment
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Creating a Web Application
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Getting started with the 1st assignment
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         </li>
            //         <!-- Reading -->
            //         <li class="list-group-item d-flex justify-content-between align-items-center">READING
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Full Stack Developer - Chapter 1 - Introduction
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
                    
            //         <!-- Slides -->
            //         <li class="list-group-item d-flex justify-content-between align-items-center">SLIDES
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center"><a href="www.youtube.com" class="link-danger">Introduction to Web Development Links to an external site.</a>
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center"><a href="www.youtube.com" class="link-danger">Creating an HTTP server with Node.js Links to an external site.</a>
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center"><a href="www.youtube.com"  class="link-danger">Creating a React Application Links to an external site.</a>
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //       </ul>
            //       <!-- week 1 -->
            //       <ul class="list-group mb-5">
            //         <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">Week 1 - HTML
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <!-- Learning objectives -->
            //         <li class="list-group-item d-flex justify-content-between align-items-center">LEARNING OBJECTIVES
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Learn how to create user interfaces with HTML
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Keep working on assignment 1
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Deploy the assignment to Netlify
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <!-- Reading -->
            //         <li class="list-group-item d-flex justify-content-between align-items-center">READING
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Full Stack Developer - Chapter 1 - Introduction
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
            //         <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML
            //             <span><i class="fa fa-check-circle" aria-hidden="true"></i>
            //                 <i class="fa fa-ellipsis-v ps-2" aria-hidden="true"></i>
            //             </span>
            //         </li>
                
                
  );
}
export default ModuleList;