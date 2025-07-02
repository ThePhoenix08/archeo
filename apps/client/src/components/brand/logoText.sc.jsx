import { FolderLock } from "lucide-react";

function LogoText() {
	return (
		<a href="/" className="relative z-10 mb-8 flex items-center gap-3">
			<div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
				<FolderLock className="size-6" />
			</div>
			<div className="flex flex-col">
				<span className="font-(family-name:--font-nunito-sans) bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-xl font-bold text-transparent">
					Archeo
				</span>
				<span className="text-xs font-medium text-blue-500/80">
					Document Management
				</span>
			</div>
		</a>
	);
}
export default LogoText;
