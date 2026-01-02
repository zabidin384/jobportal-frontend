import { useAuth } from "../../context/AuthContext";
import { Bookmark, Building, Building2, Calendar, MapPin } from "lucide-react";
import moment from "moment";
import StatusBadge from "../StatusBadge";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<div
			onClick={onClick}
			className={`bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 group relative
        overflow-hidden`}
		>
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-start gap-4">
					{job?.company?.companyLogo ? (
						<img
							src={job?.company?.companyLogo}
							alt="Company Logo"
							className="w-14 h-14 object-cover rounded-lg border-2 border-gray-100 shadow-lg"
						/>
					) : (
						<div className="w-14 h-14 rounded-2xl flex items-center justify-center">
							<Building2 className="w-14 h-14 text-gray-400" />
						</div>
					)}

					<div className="flex-1 text-gray-600">
						<h3 className="font-semibold text-base group-hover:text-gray-800 transition-colors leading-snug cursor-pointer">
							{job?.title}
						</h3>
						<p className="text-sm flex items-center gap-2 mt-1">
							<Building className="w-3.5 h-3.5" />
							{job?.company?.companyName}
						</p>
					</div>
				</div>
				{user && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							onToggleSave();
						}}
						className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
					>
						<Bookmark className={`w-5 h-5 hover:text-blue-600 ${job?.isSaved || saved ? "text-blue-600" : "text-gray-400"}`} />
					</button>
				)}
			</div>

			<div className="mb-5">
				<div className="flex items-center gap-2 text-xs">
					<span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
						<MapPin className="w-3 h-3" />
						{job?.location}
					</span>
					<span className="px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-700">{job?.type}</span>
					<span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{job?.category}</span>
				</div>
			</div>

			<div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-5 pb-4 border-b border-gray-100">
				<div className="flex items-center gap-4">
					<span className="flex items-center gap-1.5">
						<Calendar className="w-3.5 h-3.5" />
						{job?.createdAt ? moment(job.createdAt).format("Do MMM YYYY") : "N/A"}
					</span>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-gray-600 font-semibold">
					${job?.salaryMin} - ${job?.salaryMax}
				</div>
				{!saved && (
					<>
						{job?.applicationStatus ? (
							<StatusBadge status={job?.applicationStatus} />
						) : (
							!hideApply && (
								<button
									onClick={(e) => {
										if (user) {
											e.stopPropagation();
											onApply();
										} else {
											e.stopPropagation();
											navigate("/login");
										}
									}}
									className={`bg-gradient-to-r bg-blue-600 text-sm text-white px-6 py-2.5 rounded-xl hover:bg-blue-700
                    transition-all duration-200 font-semibold transform hover:-translate-y-0.5 cursor-pointer`}
								>
									Apply Now
								</button>
							)
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default JobCard;
