import { Sidebar } from "../sidebar/sidebar"
import JobReadyDashboard from "./JobReadinessChecker"
import "./jobready.css"

function JobReady() {
  return (
    <div className="job-ready-container">
      <Sidebar />
      <div className="job-ready-content">
        <h1 className="job-ready-title">Job Readiness Dashboard</h1>
        <JobReadyDashboard />
      </div>
    </div>
  )
}

export default JobReady

