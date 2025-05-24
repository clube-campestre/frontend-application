import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

const ModalSecretary = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-sans">
      <div className="bg-white rounded-lg w-[900px] h-[540px] shadow-lg relative p-8 flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex items-center text-blue-900 font-bold text-sm cursor-pointer"
        >
          <div className="bg-blue-900 rounded-full p-1 mr-2">
            <IoIosArrowBack className="text-white text-sm" />
          </div>
          Voltar
        </button>

        <div className="flex flex-1 items-center justify-between space-x-10 mt-6">
          <div className="flex flex-col space-y-4 w-1/2">
            <InputField label="Nome completo" icon={<FaUser />} value={member.name} />
            <InputField label="Aniversario" icon={<FaUser />} value={member.birthday} />
            <InputField label="Telefone" icon={<FaPhoneAlt />} value={member.contact} />
            <InputField label="Nome do pai" icon={<FaUser />} value={member.fatherName} />
            <InputField label="Nome da mãe" icon={<FaUser />} value={member.motherName} />
          </div>

          <div className="flex flex-col space-y-4 w-1/2">
            <div className="w-full h-40 rounded bg-gray-50 flex items-center justify-center border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zM6.75 21a7.5 7.5 0 0110.5 0"
                />
              </svg>
            </div>
            <InputField label="Telefone do pai" icon={<FaPhoneAlt />} value={member.fatherPhone} />
            <InputField label="Telefone da mãe" icon={<FaPhoneAlt />} value={member.motherPhone} />
          </div>
        </div>

        <div className="mt-4 w-full text-right">
          <button className="text-blue-900 font-semibold flex items-center space-x-1 cursor-pointer inline-flex justify-end">
            <span>Ver informações completas</span>
            <span className="ml-1 w-5 h-5 rounded-full border border-blue-900 text-blue-900 flex items-center justify-center text-xs font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, icon, value }) => (
  <div className="flex items-center bg-[#f5f5f5] border border-gray-200 rounded px-3 py-2 space-x-2 text-sm">
    <span className="text-yellow-500">{icon}</span>
    <span className="text-gray-700">{label}:</span>
    <span className="font-medium text-gray-800 truncate">{value || "-"}</span>
  </div>
);

export default ModalSecretary;
