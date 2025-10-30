const ButtonPrimary = ({text, onClick, className}) => {
    return (
        <button
        onClick={onClick}
        className={`bg-[#FCAE2D] hover:bg-[#FECC4F] text-black font-bold py-1 px-8 rounded-2xl cursor-pointer ${className || ''}`}
        >
        {text}
        </button>
    );
}

export default ButtonPrimary;