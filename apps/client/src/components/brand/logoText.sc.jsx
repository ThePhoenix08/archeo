function LogoText() {
	return (
		<a href="/" className="focus:outline-none relative w-fit z-10 flex items-center gap-3">
			<div className="w-10">
				<img src="/assets/svg/logo_SVG.svg" alt="logo" className="w-full" />
			</div>
			<div className="flex flex-col">
				<span className="font-(family-name:--font-anta) tracking-wider text-[#051f34] dark:text-blue-400 text-xl font-bold">
					Archeo
				</span>
				<span className="text-xs font-medium text-gray-700 dark:text-gray-300">
					Document Management
				</span>
			</div>
		</a>
	);
}
export default LogoText;
