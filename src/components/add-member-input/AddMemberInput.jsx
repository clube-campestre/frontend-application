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
    ...props
}) => {
    const [focused, setFocused] = useState(false);

    const inputClass = `${baseInputClass} ${typeStyles[type] || typeStyles.default}`;

    return (
        <div className={className}>
            <div className="relative">
                {type === "select" ? (
                    <>
                        {label && (
                            <label
                                htmlFor={id}
                                className="block mb-1 text-[15px] font-medium text-gray-700"
                            >
                                {label}
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
                    </>
                ) : (
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
                )}

                {label && type !== "select" && (
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
                        {label}
                    </label>
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
