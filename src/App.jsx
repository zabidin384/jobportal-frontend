import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routers/ProtectedRoute";
// Public Routes
import LandingPage from "./pages/landingpage/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
// Jobseeker
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";
import JobDetails from "./pages/jobseeker/JobDetails";
import SavedJobs from "./pages/jobseeker/SavedJobs";
import UserProfile from "./pages/jobseeker/UserProfile";
// Employer
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import JobPostingForm from "./pages/employer/JobPostingForm";
import ManageJobs from "./pages/employer/ManageJobs";
import ApplicationViewer from "./pages/employer/ApplicationViewer";
import EmployerProfilePage from "./pages/employer/EmployerProfilePage";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path="/" element={<LandingPage />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />

					{/* Jobseeker */}
					<Route path="/find-jobs" element={<JobSeekerDashboard />} />
					<Route path="/job/:jobId" element={<JobDetails />} />
					<Route path="/saved-jobs" element={<SavedJobs />} />
					<Route path="/profile" element={<UserProfile />} />

					{/* Employer */}
					<Route element={<ProtectedRoute requiredRole="employer" />}>
						<Route path="/employer-dashboard" element={<EmployerDashboard />} />
						<Route path="/post-job" element={<JobPostingForm />} />
						<Route path="/manage-jobs" element={<ManageJobs />} />
						<Route path="/applicants" element={<ApplicationViewer />} />
						<Route path="/company-profile" element={<EmployerProfilePage />} />
					</Route>

					{/* Catch All Route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
			<Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
		</AuthProvider>
	);
};

export default App;
