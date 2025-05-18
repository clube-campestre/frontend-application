import loboImage from "../../../assets/images/lobo.png";
import falcaoImage from "../../../assets/images/falcao.png";
import pandaImage from "../../../assets/images/panda.png";
import panteraImage from "../../../assets/images/pantera.png";
import raposaImage from "../../../assets/images/raposa.png";
import tigreImage from "../../../assets/images/tigre.png";
import ursoImage from "../../../assets/images/urso.png";
import aguiaRealImage from "../../../assets/images/aguia-real.png";
import { LuCirclePlus } from "react-icons/lu";
import { MemberCard } from "../../../components/member-card/MemberCard";
import { useState } from "react";

const Unities = () => {
    const [selectedUnity, setSelectedUnity] = useState(null);
    const unities = [
        { id: 1, name: "Panda", logo: pandaImage, points: 250 },
        { id: 2, name: "Falcão", logo: falcaoImage, points: 115 },
        { id: 3, name: "Águia Real", logo: aguiaRealImage, points: 42 },
        { id: 4, name: "Tigre", logo: tigreImage, points: 65 },
        { id: 5, name: "Raposa", logo: raposaImage, points: 76 },
        { id: 6, name: "Urso", logo: ursoImage, points: 54 },
        { id: 7, name: "Pantera", logo: panteraImage, points: 87 },
        { id: 8, name: "Lobo", logo: loboImage, points: 120 },
    ];
    
    const mockMembers = [
        {
          id: 1,
          name: "Ana Souza",
          birthday: "10/02/2008",
          contact: "(11) 91234-5678",
          cpf: "123.456.789-00",
          responsibleContact: "(11) 99876-5432",
          unity: "Panda",
          unityId: 1
        },
        {
          id: 2,
          name: "Bruno Lima",
          birthday: "22/07/2007",
          contact: "(21) 93456-7890",
          cpf: "987.654.321-00",
          responsibleContact: "(21) 98765-4321",
          unity: "Falcão",
          unityId: 2
        },
        {
          id: 3,
          name: "Carla Mendes",
          birthday: "05/11/2009",
          contact: "(31) 90012-3456",
          cpf: "456.789.123-00",
          responsibleContact: "(31) 98888-7777",
          unity: "Tigre",
          unityId: 4
        },
        {
          id: 4,
          name: "Daniel Oliveira",
          birthday: "14/04/2006",
          contact: "(71) 91111-2222",
          cpf: "321.654.987-00",
          responsibleContact: "(71) 97777-6666",
          unity: "Lobo",
          unityId: 8
        },
        {
          id: 5,
          name: "Eduarda Santos",
          birthday: "30/08/2010",
          contact: "(85) 93333-4444",
          cpf: "789.123.456-00",
          responsibleContact: "(85) 96666-5555",
          unity: "Águia Real",
          unityId: 3
        },
      ];


    return (
        <div className="flex flex-col items-center justify-self-center justify-around h-[82vh] w-[80vw]">
            { /* Header Section */}
                        <div className="flex items-center justify-between w-full h-16 rounded-t-lg">
                            <div className="flex items-center gap-2">
                                {unities.map((unity) => (
                                    <img
                                        key={unity.id}
                                        src={unity.logo || "/placeholder.svg"}
                                        alt={`Unity ${unity.name}`}
                                        className={`h-15 cursor-pointer transition-all ${
                                            selectedUnity === unity.id
                                                ? "h-20 grayscale-0"
                                                : "h-12 grayscale"
                                        }`}
                                        onClick={() =>
                                            setSelectedUnity(
                                                selectedUnity === unity.id ? null : unity.id
                                            )
                                        }
                                    />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 px-2 py-2 text-[#021c4f] bg-[#EDEDED] rounded">
                                {selectedUnity ? (
                                    <>
                                        <span className="text-[20px] font-medium">PONTUAÇÃO</span>
                                        <span className="text-4xl font-extrabold">
                                            {unities.find((u) => u.id === selectedUnity)?.points || 0}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-[20px] font-medium ">
                                        Selecione uma unidade
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Main Content Section */}
            <div className="flex flex-col items-center h-[65vh] w-full bg-[#EDEDED] rounded-[7px] shadow-md overflow-y-auto">
                {/* Counselor Section */}
                <div className="flex items-center justify-between w-full p-4 h-[10vh]">
                    <div className="flex items-center gap-2">
                        <div className="h-[5vh] w-2 bg-[#FCAE2D] rounded-full"></div>
                        <span className="text-2xl">Conselheiro(a):</span>
                        <span className="font-bold text-2xl">Ellen</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400">
                        Adicionar Membros <LuCirclePlus />
                    </button>
                </div>

                {/* Members Section */}
                <div className="flex flex-col gap-2 w-full h-[70vh] p-4 overflow-y-auto">
                    {mockMembers.length > 0 ? (
                        mockMembers
                            .filter(
                                (member) =>
                                    !selectedUnity ||
                                    member.unityId === selectedUnity
                            )
                            .map((member) => (
                                <MemberCard key={member.id} item={member} />
                            ))
                    ) : (
                        <p className="text-gray-500 text-center">
                            Nenhum membro encontrado.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Unities;