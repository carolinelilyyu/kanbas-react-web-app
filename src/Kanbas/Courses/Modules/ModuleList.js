import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import * as client from "./client";

function ModuleList() {
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    const handleDeleteModule = (moduleId) => {
        console.log("delete module inside modulelist");
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };

    const { courseId } = useParams();
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(courseId);
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    return (
        <div>
            <div class="wd-flex-row-container">
                <div class="wd-flex-grow-1 d-none d-sm-block">
                    <hr />

                    <div class="d-flex float-end">
                        <button type="button" class="btn btn-light" style={{ "margin":"5px"}}
                        >Collapse All</button>
                        <button type="button" class="btn btn-light" style={{ "margin":"5px"}}
                        >View Progress</button>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle"
                            style={{ "margin":"5px"}}
                             type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <AiOutlineCheckCircle />
                                Publish All
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-danger"
                        style={{ "margin":"5px"}}>Module</button>
                        <button type="button" class="btn btn-light">
                            <FaEllipsisVertical />
                        </button>
                    </div>
                    <br /><br></br>
                    <hr />
                    <li className="list-group-item">
                        <input className="form-control" value={module.name}
                            style={{ "width": "60%" }}
                            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
                            }
                        />
                        <br />
                        <textarea value={module.description}
                            className="form-control" style={{ "width": "60%" }}
                            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
                            }
                        />
                        <br />
                        <button type="button" class="btn btn-danger"
                            style={{ "margin": "5px" }} onClick={handleAddModule}>
                            Add</button>
                        <button
                            type="button" class="btn btn-light"
                            onClick={handleUpdateModule}>
                            Update
                        </button>

                    </li>
                    <br />

                    <ul class="list-group mb-5">
                        <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"> Readings
                            <span><AiOutlineCheckCircle className="fa-check-circle" />
                                <FaEllipsisVertical />
                            </span>
                        </li>
                    </ul>
                    <ul class="list-group mb-5">
                        <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center"> Required Textbooks
                            <span><AiOutlineCheckCircle className="fa-check-circle" />
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
                                        <li class="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
                                            <span>Week {module.week} - {module.name}</span>
                                            <div>
                                                <button
                                                    type="button" class="btn btn-light"
                                                    style={{ "margin": "5px" }}
                                                    onClick={() => dispatch(setModule(module))}>
                                                    Edit
                                                </button>

                                                <button
                                                    type="button" class="btn btn-danger"
                                                    style={{ "margin": "5px" }}
                                                    onClick={() => handleDeleteModule(module._id)}>
                                                    Delete
                                                </button>

                                                <span><AiOutlineCheckCircle className="fa-check-circle" />
                                                    <FaEllipsisVertical />
                                                </span>
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">LEARNING OBJECTIVES
                                            <span><AiOutlineCheckCircle className="fa-check-circle" />
                                                <FaEllipsisVertical />
                                            </span>
                                        </li>

                                        <li class="list-group-item ps-5 d-flex justify-content-between align-items-center">{module.description}
                                            <span><AiOutlineCheckCircle className="fa-check-circle" />
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