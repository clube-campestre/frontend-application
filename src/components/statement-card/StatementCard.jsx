import { MdOutlineTransitEnterexit } from "react-icons/md";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

export const StatementCard = ({ item, showModal, handleDeleteTransaction }) => {
	const isSaida = item.transactionType === "SAIDA";
	const borderColor = isSaida ? "#FF0000" : "#86D946";
	// const borderColor = isSaida ? "#6D6E6E" : "#6D6E6E";

	const iconColor = isSaida ? "#FF0000" : "#86D946";
	console.log("item", item);
	return (
		<div
			className={`flex flex-row items-center justify-between w-full h-15 bg-[#FAFAFA] rounded border-2`}
			style={{ borderColor }}
		>
			<div className="flex flex-row items-center justify-center w-[15%] space-x-2">
				<MdOutlineTransitEnterexit
					color={iconColor}
					size={40}
					className={isSaida ? "rotate-90" : "rotate-0"}
				/>
				<div>
					<span className="text-[11px] text-[#8D8D8D]">R$</span>
					<span className="text-[20px]">{item.price}</span>
				</div>
			</div>

			<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

			<div className="flex flex-col items-start w-[35%] h-full pl-3 pr-3">
				<div className="flex flex-row items-start justify-start w-full text-[#8D8D8D] text-[11px]">
					<span>{new Date(item.transactionDate).toLocaleDateString()}</span>
				</div>
				<div className="text-[18px]">
					<span>{item.information}</span>
				</div>
			</div>

			<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

			<div className="flex items-center justify-center w-[20%]">
				<div
					className="border-2 rounded p-1 px-2 text-[#000000]"
					style={{ borderColor: item.tag?.color || "#000000" }}
				>
					{item.tag?.surname?.toUpperCase().charAt(0) +
						item.tag?.surname.toLowerCase().slice(1)}
				</div>
			</div>

			<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

			<div className="flex items-center justify-center w-[10%]">
				<button
					onClick={() => {
						showModal();
					}}
					className="text-amber-500 hover:text-amber-600"
				>
					<FaPencilAlt size={18} />
				</button>
			</div>

			<div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

			<div className="flex items-center justify-center w-[10%]">
				<button
					onClick={() => handleDeleteTransaction(item.id)}
					className="text-gray-400 hover:text-gray-600"
				>
					<FaTrash size={18} />
				</button>
			</div>
		</div>
	);
};
