import { useState } from "react";
const baseInputClass =
    "w-full py-[10px] px-[16px] rounded-[10px] text-[15px] transition-all duration-300 h-[6vh] focus:outline-none";

const typeStyles = {
    text: "border-2 border-gray-300 bg-[#FAFAFA] focus:border-[#FCAE2D]",
    date: "border-2 border-gray-300 bg-white text-gray-500 focus:border-[#FCAE2D]",
    select: "border-2 border-gray-300 bg-[#FAFAFA] cursor-pointer focus:border-[#FCAE2D]",
    password: "border-2 border-gray-300 bg-[#FAFAFA] focus:border-[#FCAE2D]",
    default: "border-2 border-gray-300 bg-white focus:border-[#FCAE2D]",
};

const AddMemberInput = ({
    id,
    type = "text",
    label,
    value,
    onChange,
    icon: Icon,
    options = [],
    className = "",
    required = false,
    error = null,
    ...props
}) => {
    const [focused, setFocused] = useState(false);

    const inputClass = `${baseInputClass} ${typeStyles[type] || typeStyles.default} ${error ? 'border-red-500 focus:border-red-500' : ''}`;

    return (
        <div className={`${className} ${error ? 'mb-6' : ''}`}>
            <div className="relative">
                {type === "select" ? (
                    <>
                        {label && (
                            <label
                                htmlFor={id}
                                className="block mb-1 text-[15px] font-medium text-gray-700 relative pr-2"
                            >
                                {label}
                                {required && (
                                    <span className="absolute top-0 -right-0 text-red-500 text-lg">*</span>
                                )}
                            </label>
                        )}
                        <select
                            id={id}
                            className={inputClass}
                            value={value}
                            onChange={onChange}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            {...props}
                        >
                            {label !== "Batizado" && (
                                <option value="" disabled>
                                    Selecione...
                                </option>
                            )}
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        {error && (
                            <span className="text-red-500 text-xs mt-1 block">{error}</span>
                        )}
                    </>
                ) : (
                    <>
                        <input
                            id={id}
                            type={type}
                            className={inputClass}
                            value={value}
                            onChange={onChange}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder=" "
                            {...props}
                        />

                        {label && (
                            <label
                                htmlFor={id}
                                className={`absolute left-4 bg-transparent px-2 pointer-events-none transition-all duration-300 ${
                                    type === "date"
                                        ? "top-1 -translate-y-6 scale-75 text-[#000000]"
                                        : focused || value
                                        ? "top-1 -translate-y-6 scale-75 text-[#000000]"
                                        : "top-1/2 -translate-y-1/2 text-gray-500"
                                }`}
                            >
                                <span>{label}</span>
                                {required && (
                                    <span className="text-red-500 ml-1">*</span>
                                )}
                            </label>
                        )}

                        {error && (
                            <span className="absolute -bottom-5 left-0 text-red-500 text-xs mt-1 block">
                                {error}
                            </span>
                        )}
                    </>
                )}

                {Icon && (
                    <Icon
                        className={`absolute left-2 top-1/2 -translate-y-1/2 ${
                            focused || value ? "text-[#FCAE2D]" : "text-gray-500"
                        }`}
                    />
                )}
            </div>
        </div>
    );
};

export default AddMemberInput;
