import React from "react";

const UnityItem = ({ imagePath, title, description, isActive }) => {
	return (
		<div
			className={`flex flex-col items-center justify-center w-80 h-80 rounded-full p-4 shadow-md transition-transform duration-300 ${
				isActive
					? "bg-[#FCAE2D] scale-110 text-white"
					: "bg-white text-black"
			}`}
		>
			<img 
				src={imagePath}
				alt="Logo da unidade"
				className={`mb-2 ${isActive ? "w-36 h-36" : "w-22 h-22"}`}
			/>
			<h1 className="text-center text-xl font-bold">{title}</h1>
			<p className="text-center text-sm w-55">{description}</p>
		</div>
	);
};

export default UnityItem;
