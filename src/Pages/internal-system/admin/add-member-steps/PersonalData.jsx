import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";




// Etapa 1 - PersonalData
function PersonalData({ dados, setDados }) {
  return (
    <div className="flex flex-col w-full ">
        <div className="flex align-center items-center ml-20 gap-2">
            <div className="border-3 h-10 border-amber-400 rounded"></div>
            <h2 className="font-semibold text-xl">Dados Pessoais</h2>
        </div>

        <div className="flex flex-col align-center justify-center items-center h-[90%] gap-3">
            <div className="flex flex-row justify-between items-center w-[85%] ">
                <AddMemberInput
                    id="username"
                    type="text"
                    label="Nome"
                    value={dados.username || ""}
                    onChange={(e) => setDados({ ...dados, username: e.target.value })}
                    className="h-[8vh] w-[30vw]"
                />
                <AddMemberInput
                    id="birthCertificate"
                    type="text"
                    label="Certidão de Nascimento"
                    value={dados.birthCertificate || ""}
                    onChange={(e) => setDados({ ...dados, birthCertificate: e.target.value })}
                    className="h-[8vh] w-[22vw] "
                />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
                <AddMemberInput
                    id="cpf"
                    type="text"
                    label="CPF"
                    value={dados.cpf || ""}
                    onChange={(e) => setDados({ ...dados, cpf: e.target.value })}
                    className="h-[8vh] w-[30vw]"
                />
                <AddMemberInput
                    id="issuingAuthority"
                    type="text"
                    label="Órgão Expedidor"
                    value={dados.issuingAuthority || ""}
                    onChange={(e) => setDados({ ...dados, issuingAuthority: e.target.value })}
                    className="h-[8vh] w-[22vw]"
                />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
                <AddMemberInput
                    id="birthDate"
                    type="date"
                    label="Data de Nascimento"
                    value={dados.birthDate || ""}
                    onChange={(e) => setDados({ ...dados, birthDate: e.target.value })}
                    className="h-[8vh] w-[22vw]"
                />
                <AddMemberInput
                    id="contact"
                    type="text"
                    label="Contato"
                    value={dados.contact || ""}
                    onChange={(e) => setDados({ ...dados, contact: e.target.value })}
                    className="h-[8vh] w-[30vw]"
                />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
                <AddMemberInput
                    id="sex"
                    type="select"
                    options={[
                        { value: "MASCULINO", label: "Masculino" },
                        { value: "FEMININO", label: "Feminino" },
                        { value: "OUTRO", label: "Outro" }
                    ]}
                    label="Sexo"
                    value={dados.sex || ""}
                    onChange={(e) => setDados({ ...dados, sex: e.target.value })}
                    className="h-[8vh] w-[15vw]"
                />
                <AddMemberInput
                    id="tshirtSize"
                    type="select"
                    options={[
                        { value: "PP", label: "PP" },
                        { value: "P", label: "P" },
                        { value: "M", label: "M" },
                        { value: "G", label: "G" },
                        { value: "GG", label: "GG" },
                        { value: "XG", label: "XG" }
                    ]}
                    label="Tamanho da Camiseta"
                    value={dados.tshirtSize || ""}
                    onChange={(e) => setDados({ ...dados, tshirtSize: e.target.value })}
                    className="h-[8vh] w-[15vw]"
                />
                <AddMemberInput
                    id="isBaptized"
                    type="select"
                    options={[
                        { value: "true", label: "Sim" },
                        { value: "false", label: "Não" }
                    ]}
                    label="Batizado"
                    value={string(dados.isBaptized)}
                    onChange={e => setDados({ ...dados, isBaptized: e.target.value === "true" })}
                    className="h-[8vh] w-[15vw]"
                />
            </div>
        </div>
    </div>
  );
}

export default PersonalData;