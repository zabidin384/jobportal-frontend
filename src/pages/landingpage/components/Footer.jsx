import { Briefcase } from "lucide-react";

const Footer = () => {
	return (
		<footer className="relative bg-gray-50 text-gray-900 overflow-hidden">
			<div className="relative z-10 px-6 py-2">
				<div className="max-w-6xl mx-auto">
					{/* Main Footer Content */}
					<div className="text-center space-y-2">
						{/* Logo/Brand */}
						<div className="space-y-4">
							<p className={`text-sm text-gray-600 max-w-md mx-auto`}>
								Connecting talented professionals with innovative companies worldwide. Your career success is our mission.
							</p>
						</div>

						{/* Copyright */}
						<div className="space-y-1">
							<p className={`text-sm text-gray-600`}>© 2025 Zainal Abidin</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
