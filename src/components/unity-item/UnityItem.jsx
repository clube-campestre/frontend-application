import React from "react";

const UnityItem = ({ imagePath, description, isActive }) => {
	return (
		<div
			className={`flex flex-col items-center justify-center w-80 h-80 rounded-full p-4 shadow-md transition-transform duration-300 ${
				isActive
					? "bg-orange-400 scale-110 text-white"
					: "bg-white text-black"
			}`}
		>
			<img 
				src={imagePath}
				alt="Logo da unidade"
				className={`mb-2 ${isActive ? "w-36 h-36" : "w-22 h-22"}`}
			/>
			<p className="text-center text-sm w-60">{description}</p>
		</div>
	);
};

export default UnityItem;
