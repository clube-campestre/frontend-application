import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FloatingInput = ({id, type = "text", label, value, onChange, icon: Icon, className = "", ...props}) => {
	const [focused, setFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

	return (	
		<div className={`relative w-full ${className}`}>
			<div className="relative">
				<input
					id={id}
					type={inputType}
					className="w-full py-[14px] px-[16px] pl-10 pr-10 border-2 border-black rounded-full text-[15px] transition-all duration-300 h-[9vh] focus:outline-none focus:border-[#FCAE2D] peer"
					value={value}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					placeholder=" "
					{...props}
				/>
				<label
					htmlFor={id}
					className={`absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#FCAE2D] left-9 ${
						value ? "top-2 -translate-y-4 scale-75 text-[#FCAE2D]" : ""
					}`}
				>
					{label}
				</label>

				{Icon && (
					<Icon
						className={`absolute left-4 top-1/2 -translate-y-1/2 ${
							focused || value
								? "text-[#FCAE2D]"
								: "text-gray-500"
						}`}
					/>
				)}

				{type === "password" && (
					<span
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</span>
				)}
			</div>
		</div>
	);
};

export default FloatingInput;
