export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_PATHS = {
	AUTH: {
		REGISTER: "/auth/register",
		LOGIN: "/auth/login",
		GET_PROFILE: "/auth/profile",
		UPDATE_PROFILE: "/user/profile",
		DELETE_RESUME: "/user/resume",
	},
	DASHBOARD: {
		OVERVIEW: "/analytics/overview",
	},
	JOBS: {
		GET_ALL_JOBS: "/jobs",
		POST_JOB: "/jobs",
		GET_JOBS_EMPLOYER: "/jobs/get-jobs-employer",
		GET_JOB_BY_ID: (id) => `/jobs/${id}`,
		UPDATE_JOB: (id) => `/jobs/${id}`,
		TOGGLE_CLOSE: (id) => `/jobs/${id}/toggle-close`,
		DELETE_JOB: (id) => `/jobs/${id}`,
		SAVE_JOB: (id) => `/save-jobs/${id}`,
		UNSAVE_JOB: (id) => `/save-jobs/${id}`,
		GET_SAVED_JOBS: "/save-jobs/my",
	},
	APPLICATIONS: {
		APPLY_TO_JOB: (id) => `/applications/${id}`,
		GET_ALL_APPLICATIONS: (id) => `/applications/job/${id}`,
		UPDATE_STATUS: (id) => `/applications/${id}/status`,
	},
	IMAGE: {
		UPLOAD_IMAGE: "/auth/upload-image",
	},
};
