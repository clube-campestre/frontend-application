const ButtonPrimary = ({text, onClick}) => {
    return (
        <button
        onClick={onClick}
        className="bg-[#FCAE2D] hover:bg-[#FECC4F] text-white font-bold py-1 px-8 rounded-2xl"
        >
        {text}
        </button>
    );
}

export default ButtonPrimary;