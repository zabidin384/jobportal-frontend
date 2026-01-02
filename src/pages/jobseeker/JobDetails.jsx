import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Navbar from "../../components/layout/Navbar";
import { Building2, Clock, DollarSign, MapPin, Users } from "lucide-react";
import StatusBadge from "../../components/StatusBadge";
import moment from "moment";

const JobDetails = () => {
	const { user } = useAuth();
	const { jobId } = useParams();

	const [jobDetails, setJobDetails] = useState(null);

	const getJobDetailsById = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_ID(jobId), { params: { userId: user?._id || null } });
			setJobDetails(response.data);
		} catch (error) {
			console.error("Error fetching job details: ", error);
		}
	};

	const applyToJob = async () => {
		try {
			if (jobId) {
				await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
				toast.success("Applied to job successfully!");
			}
		} catch (error) {
			console.log("Error: ", error);
			const errorMsg = error?.response?.data?.message;
			toast.error(errorMsg || "Something went wrong! Try again later");
		}
	};

	useEffect(() => {
		if (jobId && user) getJobDetailsById();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobId, user]);

	return (
		<div className="bg-gradient-to-br from-blue-100 via-white to-purple-100">
			<Navbar />

			<div className="container mx-auto pt-24">
				{/* Main content card */}
				{jobDetails && (
					<div className="bg-white p-6 rounded-lg">
						{/* Hero section with clean background */}
						<div className="relative px-0 pb-4 border-b border-gray-100">
							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-4">
									{jobDetails?.company?.companyLogo ? (
										<img
											src={jobDetails?.company?.companyLogo}
											alt="Company Logo"
											className="w-20 h-20 p-2 object-cover rounded-2xl border-3 border-gray-200 shadow-lg"
										/>
									) : (
										<div className="w-20 h-20 bg-gray-100 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
											<Building2 className="w-8 h-8 text-gray-400" />
										</div>
									)}

									<div className="flex-1">
										<h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-gray-900">{jobDetails.title}</h1>

										<div className="flex items-center gap-4 text-gray-600">
											<div className="flex items-center gap-2">
												<MapPin className="w-4 h-4" />
												<span className="text-sm font-medium">{jobDetails.location}</span>
											</div>
										</div>
									</div>

									{jobDetails?.applicationStatus ? (
										<StatusBadge status={jobDetails.applicationStatus} />
									) : (
										<button
											className={`bg-gradient-to-r from-blue-100 to-blue-100 text-sm text-blue-700 hover:text-white px-6 py-2.5 rounded-xl
												hover:from-blue-500 hover:to-blue-700 transition-all duration-200 font-semibold transform cursor-pointer`}
											onClick={applyToJob}
										>
											Apply Now
										</button>
									)}
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-3">
									<span className="px-4 py-2 bg-gray-100 text-sm text-gray-700 font-semibold rounded-full border-2 border-gray-200">
										{jobDetails.category}
									</span>
									<span className="px-4 py-2 text-sm bg-gray-100 text-gray-700 font-semibold rounded-full border-2 border-gray-200">
										{jobDetails.type}
									</span>
									<div
										className={`flex items-center gap-1 px-4 py-2 bg-gray-100 text-sm text-gray-700 font-semibold rounded-full border border-gray-200`}
									>
										<Clock className="w-4 h-4" />
										<span>{jobDetails.createdAt ? moment(jobDetails.createdAt).format("Do MMM YYYY") : "N/A"}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Content sections */}
						<div className="px-0 pb-8 space-y-8">
							{/* Salary section */}
							<div className="relative overflow-hidden bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-100 px-4 py-2 rounded-2xl">
								<div className="relative z-10">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
												<DollarSign className="h-6 w-6 text-white" />
											</div>
											<div>
												<h3 className="text-sm font-semibold text-gray-900 mb-1">Compensation</h3>
												<div className="text-lg font-bold text-gray-900">
													${jobDetails.salaryMin} - ${jobDetails.salaryMax}
													<span className="text-sm text-gray-700 font-normal ml-1">per month</span>
												</div>
											</div>
										</div>
										<div className="flex items-center gap-2 text-sm text-emerald-800 px-3 py-1 rounded-full font-semibold">
											<Users className="h-4 w-4" />
											<span>Competitive</span>
										</div>
									</div>
								</div>
							</div>

							{/* Job description */}
							<div className="space-y-4">
								<h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
									<div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
									<span className="text-lg">About this role</span>
								</h3>
								<div className="bg-gray-100 border border-gray-100 rounded-xl p-6">
									<div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{jobDetails.description}</div>
								</div>
							</div>

							{/* Requirements */}
							<div className="space-y-4">
								<h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
									<div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
									<span className="text-lg">What We're Looking For</span>
								</h3>
								<div className="bg-gray-100 border border-gray-100 rounded-xl p-6">
									<div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{jobDetails.requirements}</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default JobDetails;
