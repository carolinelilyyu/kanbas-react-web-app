import React from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {FaEllipsisVertical} from "react-icons/fa6"
function ModuleList() {
  const { courseId } = useParams();
  const modules = db.modules;
  return (
    <div>
        <div class="wd-flex-row-container">
            <div class="wd-flex-grow-1 d-none d-sm-block">
                    <hr />
                    <div class="d-flex float-end">
                        <button type="button" class="btn btn-light">Collapse All</button>
                        <button type="button" class="btn btn-light">View Progress</button>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <AiOutlineCheckCircle/>
                                Publish All
                            </button>
                            <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-danger">Module</button>
                        <button type="button" class="btn btn-light">
                        <FaEllipsisVertical />
                        </button>
                    </div>
                    <br/>
                    <hr />

                    <ul class="list-group mb-5">
                        <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"> Readings
                            <span><AiOutlineCheckCircle className="fa-check-circle"/>
                                <FaEllipsisVertical />
                            </span>
                        </li>
                    </ul>
                    <ul class="list-group mb-5">
                        <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"> Required Textbooks
                            <span><AiOutlineCheckCircle className="fa-check-circle"/>
                                <FaEllipsisVertical />
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
                                    <span><AiOutlineCheckCircle className="fa-check-circle"/>
                                        <FaEllipsisVertical />
                                    </span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center">LEARNING OBJECTIVES
                                    <span><AiOutlineCheckCircle className="fa-check-circle"/>
                                        <FaEllipsisVertical />
                                    </span>
                                </li>

                                <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">{module.description}
                                        <span><AiOutlineCheckCircle className="fa-check-circle"/>
                                            <FaEllipsisVertical />
                                        </span>
                                    </li>
                            </ul>
                        </div>
                        
                    ))
                    }
                    
                    
            </div>
        </div>
        </div>   
                
  );
}
export default ModuleList;