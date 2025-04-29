const LabelButton = ({ label, icon, onClick }) => {
    return (
        <button
        className="flex items-center gap-5 pl-3 w-80 h-15 bg-[#EDEDED] text-black rounded hover:bg-[#e0dfdf] hover:cursor-pointer shadow-md hover:scale-105 transition-transform duration-200 ease-in-out"
        onClick={onClick}
        >
        {icon && <img src={icon} alt="icon" className="w-6 h-6" />}
        <span>{label}</span>
        </button>
    );
}

export default LabelButton;