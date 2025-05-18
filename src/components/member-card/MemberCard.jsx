import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export const MemberCard = ({ item }) => {
    return (
        <div
            className="flex flex-row items-center justify-between w-full h-15 bg-[#FAFAFA] rounded border-2"
            style={{ borderColor: "#86D946" }}
        >
            {/* Nome e Data de Aniversário */}
            <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
                <div className="text-[16px] font-bold">
                    <span>{item.name}</span>
                </div>
                <div className="text-[11px] text-[#8D8D8D]">
                    <span>{item.birthday}</span>
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            {/* Contato e CPF */}
            <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
                <div className="text-[16px]">
                    <span>{item.contact}</span>
                </div>
                <div className="text-[11px] text-[#8D8D8D]">
                    <span>CPF: {item.cpf}</span>
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            {/* Contato do Responsável */}
            <div className="flex flex-col items-start w-[25%] h-full pl-3 pr-3">
                <div className="text-[16px]">
                    <span>{item.responsibleContact}</span>
                </div>
                <div className="text-[11px] text-[#8D8D8D]">
                    <span>Responsável</span>
                </div>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            {/* Botão Editar */}
            <div className="flex items-center justify-center w-[10%]">
                <MdOutlineEdit size={30} color="#FCAE2D"/>
            </div>

            <div className="h-[90%] w-0.5 bg-[#EDEDED]"></div>

            {/* Botão Apagar */}
            <div className="flex items-center justify-center w-[10%]">
                <MdDeleteOutline size={30} color="#E31117"/>
            </div>
        </div>
    );
};