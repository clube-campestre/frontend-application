import { MdOutlineTransitEnterexit } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export const StatementCard = ({ item }) => {
    const isSaida = item.type === "SAIDA";
    const borderColor = isSaida ? "#FF0000" : "#86D946";
    const iconColor = isSaida ? "#FF0000" : "#86D946";

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
                    <span className="text-[20px]">{item.amount}</span>
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            <div className="flex flex-col items-start w-[35%] h-full pl-3 pr-3">
                <div className="flex flex-row items-start justify-start w-full text-[#8D8D8D] text-[11px]">
                    <span>{item.date}</span>
                </div>
                <div className="text-[16px]">
                    <span>{item.description}</span>
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            <div className="flex items-center justify-center w-[20%]">
                <div
                    className="border-2 rounded p-1 px-2 text-[#022C81]"
                    style={{ borderColor: "#022C81" }}
                >
                    {item.category}
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            <div className="flex items-center justify-center w-[10%]">
                <MdOutlineEdit size={30} />
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            <div className="flex items-center justify-center w-[10%]">
                <MdDeleteOutline size={30} />
            </div>
        </div>
    );
};
