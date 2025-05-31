import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";
import MedicalDataCard from "../../../../components/medical-data-card/MedicalDataCard";




// Etapa 4 - MedicalData
function MedicalData({ dados, setDados }) {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex align-center items-center ml-20 gap-2">
        <div className="border-3 h-10 border-amber-400 rounded"></div>
        <h2 className="font-semibold text-xl">Dados Médicos</h2>
      </div>
      
    <div className="flex flex-col align-center justify-center items-center h-[90%] gap-6 mt-4 p-4 ">
        <div className="flex flex-row justify-between items-center w-[85%]">
            <AddMemberInput
                id="blood_type"
                type="select"
                options={[
                    { value: "a+", label: "A+" },
                    { value: "a-", label: "A-" },
                    { value: "b+", label: "B+" },
                    { value: "b-", label: "B-" },
                    { value: "ab+", label: "AB+" },
                    { value: "ab-", label: "AB-" },
                    { value: "o+", label: "O+" },
                    { value: "o-", label: "O-" }
                ]}
                label="Tipo Sanguíneo"
                value={dados.blood_type || ""}
                onChange={(e) => setDados({ ...dados, blood_type: e.target.value })}
                className="h-[8vh] w-[20vw]"
            />
        </div>
        <div className="w-[85%] overflow-y-auto flex justify-center px-8 py-4">
            <MedicalDataCard
                questions={[
                "Problemas cardíacos?",
                "Alergia a algum medicamento?",
                "Tem alergia a lactose?",
                "Tem alguma deficiência?",
                "Transfusão de sangue?",
                "Alergia de pele? Se sim, faz uso de medicamento?",
                "Tem ou teve desmaio ou convulsão? Se sim, faz uso de qual medicamento?",
                "Possui transtornos psicológicos? Se sim, quais?",
                "Possui alergia? Se sim, quais e qual medicamento usa?",
                "É diabético? Se sim, qual medicamento usa?",
                "Teve algum ferimento grave recente?",
                "Algum tipo de fratura recente? Se sim, quais?",
                "Passou por cirurgias? Se sim, quais?",
                "Motivo de internação nos últimos 5 anos:"
                ]}
                onChange={respostas => console.log(respostas)}
            />
        </div>
      </div>
    </div>
  );
}

export default MedicalData;