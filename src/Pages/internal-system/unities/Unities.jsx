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
import EditModal from "../../../components/edit-modal/EditModal";
import MemberModal from "../../../components/member-manage/MemberModal";
import { useEffect } from "react";
import { api } from "../../../provider/api";
import Toast from "../../../utils/Toast";

const Unities = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedUnitName, setSelectedUnitName] = useState(null);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddUnitPointModal, setShowAddUnitPointModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [unitPoints, setUnitPoints] = useState(null);
  const [unitCounselor, setUnitCounselor] = useState(null);

  const handleShowEditMemberModal = () => {
    setShowEditMemberModal(!showEditMemberModal);
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  const handleShowAddMemberModal = () => {
    setShowAddMemberModal((prev) => !prev);
  };

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

  const unitPointsFields = [
    {
      name: "unit",
      label: "Unidade",
      placeholder: "Selecione a unidade",
      type: "select",
      options: unities.map((unit) => ({
        value: unit.name,
        label: unit.name,
      })),
      selectedOption: "Selecione uma unidade",
      isRequired: true,
    },
    {
      name: "points",
      label: "Pontos da Unidade",
      placeholder: "Digite os pontos da unidade",
      type: "number",
      isRequired: true,
    },
  ];

  const membersFields = [
    {
      name: "name",
      label: "Nome do Membro",
      placeholder: "Digite o nome do membro",
      type: "text",
      isRequired: true,
    },
    {
      name: "cpf",
      label: "CPF",
      placeholder: "XXX.XXX.XXX-XX",
      type: "text",
      isRequired: true,
    },
    {
      name: "birthday",
      label: "Data de Nascimento",
      placeholder: "DD/M	M/AAAA",
      type: "date",
      isRequired: true,
    },
    {
      name: "contact",
      label: "Contato",
      placeholder: "(XX) XXXXX-XXXX",
      type: "text",
      isRequired: true,
    },
    {
      name: "responsibleName",
      label: "Nome do Responsável",
      placeholder: "Digite o nome do responsável",
      type: "text",
      isRequired: true,
    },
    {
      name: "responsibleContact",
      label: "Contato do Responsável",
      placeholder: "(XX) XXXXX-XXXX",
      type: "text",
      isRequired: true,
    },
  ];

  const mockMembers = [
    {
      id: 1,
      name: "Ana Souza",
      birthday: "10/02/2008",
      contact: "(11) 91234-5678",
      cpf: "123.456.789-00",
      responsibleContact: "(11) 99876-5432",
      unit: "Panda",
      unitId: 1,
      unitRole: "Membro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
    {
      id: 2,
      name: "Bruno Lima",
      birthday: "12/07/2007",
      contact: "(21) 93456-7890",
      cpf: "987.654.321-00",
      responsibleContact: "(21) 98765-4321",
      unit: "Falcão",
      unitId: 2,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor Associado",
    },
    {
      id: 3,
      name: "Carla Mendes",
      birthday: "05/11/2009",
      contact: "(31) 90012-3456",
      cpf: "456.789.123-00",
      responsibleContact: "(31) 98888-7777",
      unit: "Tigre",
      unitId: 4,
      unitRole: "Conselheiro Associado",
      classCategory: "Amigo",
      classRole: "Membro",
    },
    {
      id: 4,
      name: "Daniel Oliveira",
      birthday: "05/04/2006",
      contact: "(71) 91111-2222",
      cpf: "321.654.987-00",
      responsibleContact: "(71) 97777-6666",
      unit: "Lobo",
      unitId: 8,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
    {
      id: 5,
      name: "Eduarda Santos",
      birthday: "12/08/2010",
      contact: "(85) 93333-4444",
      cpf: "789.123.456-00",
      responsibleContact: "(85) 96666-5555",
      unit: "Águia Real",
      unitId: 3,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
    {
      id: 6,
      name: "Eduarda Santos",
      birthday: "12/08/2010",
      contact: "(85) 93333-4444",
      cpf: "789.123.456-00",
      responsibleContact: "(85) 96666-5555",
      unit: "Águia Real",
      unitId: 3,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
    {
      id: 7,
      name: "Eduarda Santos",
      birthday: "12/08/2010",
      contact: "(85) 93333-4444",
      cpf: "789.123.456-00",
      responsibleContact: "(85) 96666-5555",
      unit: "Águia Real",
      unitId: 3,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
    {
      id: 8,
      name: "Eduarda Santos",
      birthday: "12/08/2010",
      contact: "(85) 93333-4444",
      cpf: "789.123.456-00",
      responsibleContact: "(85) 96666-5555",
      unit: "Águia Real",
      unitId: 3,
      unitRole: "Conselheiro",
      classCategory: "Amigo",
      classRole: "Instrutor",
    },
  ];

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (selectedUnit === null) {
          const response = await api.get(`/members`);
          setMembers(response.data);
        } else {
          const response = await api.get(`/members/unit/${selectedUnitName}`);
          setMembers(response.data.members);
          setUnitPoints(response.data.score);
          setUnitCounselor(response.data.counselorName);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [selectedUnit]);

  const handleEditMember = async (member) => {
    try {
      const response = await api.put(`/members/${member.id}`, member);
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Membro editado com sucesso!",
        });
        setSelectedUnit(null);
        handleShowEditMemberModal();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Erro ao editar membro.",
      });
      console.error("Error editing member:", error);
    }
  };

  const handleUpdateMemberUnit = async (members) => {
    try {
      await Promise.all(
        members.map(async (member) => {
          const response = await api.put(`/members/${member.id}`, member);
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Membro editado com sucesso!",
            });
          }
          handleShowAddMemberModal();
        })
      );
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Erro ao editar membro.",
      });
      console.error("Error editing member:", error);
    }
  };

  const handleAddUnitPoint = async (data) => {
    if (!data.unit || !data.points) {
      Toast.fire({
        icon: "error",
        title: "Dados inválidos para adicionar pontuação.",
      });
      return;
    }

    if (data.points < 0) {
      Toast.fire({
        icon: "error",
        title: "A pontuação não pode ser negativa.",
      });
      return;
    }
    
    let unitName = data.unit.toLowerCase();

    if (unitName === "águia real"){
      unitName = "aguia_real";
    } else if (unitName === "falcão") {
      unitName = "falcao";
    } else if (unitName === "leão") {
      unitName = "leao";
    }

    try {
      const response = await api.put(
        "/units/score",
        {},
        {
          params: {
            unitName: unitName,
            newScore: data.points,
          },
        }
      );
      if (response.status === 200) {
        Toast.fire({
          icon: "success",
          title: "Pontuação adicionada com sucesso!",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Erro ao adicionar pontuação.",
      });
      console.error("Error adding unit point:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-self-center justify-around h-[82vh] w-[80vw]">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full h-16 rounded-t-lg">
        <div className="flex items-center gap-2">
          {unities.map((unit) => (
            <img
              key={unit.id}
              src={unit.logo || "/placeholder.svg"}
              alt={`Unit ${unit.name}`}
              className={`h-16 cursor-pointer transition-all ${
                selectedUnit === unit.id
                  ? "h-20 grayscale-0"
                  : "h-12 grayscale"
              }`}
              onClick={() =>
                setSelectedUnit(selectedUnit === unit.id ? null : unit.id) &&
                setSelectedUnitName(selectedUnitName === unit.name ? null : unit.name)
              }
            />
          ))}
        </div>
        <div className="flex items-center gap-2 px-2 py-2 text-[#021c4f] bg-[#EDEDED] rounded">
          {selectedUnit ? (
            <>
              <span className="text-[20px] font-medium">PONTUAÇÃO</span>
              <span className="text-4xl font-extrabold">
                {unitPoints || 0}
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
      <div className="flex flex-col items-center h-[65vh] w-full bg-[#EDEDED] rounded-[7px] shadow-md ">
        {/* Counselor Section */}
        <div className="flex items-center justify-between w-full p-4">
          <div className="flex items-center gap-2">
            {selectedUnit && (
              <>
                <div className="h-[5vh] w-2 bg-[#FCAE2D] rounded-full"></div>
                <span className="text-2xl">Conselheiro(a):</span>
                <span className="font-bold text-2xl">
                  {unitCounselor || "Indefinido"}
                </span>
              </>
            )}
          </div>
          {selectedUnit && (
            <>
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 px-2 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
                  onClick={handleShowAddMemberModal}
                >
                  Adicionar Membros <LuCirclePlus />
                </button>
                <button
                  className="flex items-center gap-2 px-2 py-2 bg-[#D9D9D9] text-[#021c4f] shadow-md rounded hover:bg-gray-400"
                  onClick={() => setShowAddUnitPointModal(true)}
                >
                  Adicionar Pontuação <LuCirclePlus />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Members Section */}
        <div className="flex flex-col gap-2 w-[98%] h-[53vh] p-4 overflow-y-auto">
          {/* members.length > 0 ? (
						members.map((member) => (
							<MemberCard
								key={member.id}
								item={member}
								showModal={handleShowEditMemberModal}
								handleSelectMember={handleSelectMember}
							/>
						))
					)  */}
          {mockMembers.length > 0 ? (
            mockMembers
              .filter(
                (member) => !selectedUnit || member.unitId === selectedUnit
              )
              .map((member) => (
                <MemberCard
                  key={member.id}
                  item={member}
                  showModal={handleShowEditMemberModal}
                  handleSelectMember={handleSelectMember}
                />
              ))
          ) : (
            <p className="text-gray-500 text-center">
              Nenhum membro encontrado.
            </p>
          )}
          {showEditMemberModal && (
            <EditModal
              title="Editar Membro"
              fields={membersFields}
              editingItem={selectedMember}
              onClose={handleShowEditMemberModal}
              onSubmit={(data) => {
                handleEditMember(data);
                handleShowEditMemberModal();
              }}
            />
          )}
          {showAddUnitPointModal && (
            <EditModal
              title="Adicionar Pontuação"
              fields={unitPointsFields}
              onClose={() => setShowAddUnitPointModal(false)}
              onSubmit={(data) => {
                handleAddUnitPoint(data);
                setShowAddUnitPointModal(false);
              }}
            />
          )}
          {showAddMemberModal && (
            <MemberModal
              members={mockMembers}
              unitId={selectedUnit}
              unitName={selectedUnitName}
              isOpen={showAddMemberModal}
              onClose={handleShowAddMemberModal}
              onConfirm={(selectedMembers) => {
                console.log("Membros selecionados:", selectedMembers);
                handleUpdateMemberUnit(selectedMembers)
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Unities;
