import React from "react";
import { Sidebar } from "../sidebar/sidebar";
import "./jobready.css"
function jobReady() {
  return (
    <>
      <Sidebar />
      <div className="job-ready-container ">
        <h1>Job Readiness Dashboard :)</h1>
        <div className="job-ready-content">
          <p>Job ready :)</p>
        </div>
      </div>
    </>
  );
}

export default jobReady;
