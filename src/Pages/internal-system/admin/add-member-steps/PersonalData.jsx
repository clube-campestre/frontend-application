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
                    id="nome"
                    type="text"
                    label="Nome"
                    value={dados.nome || ""}
                    onChange={(e) => setDados({ ...dados, nome: e.target.value })}
                    className="h-[8vh] w-[30vw]"
                />
                <AddMemberInput
                    id="certidaoDeNascimento"
                    type="text"
                    label="Certidão de Nascimento"
                    value={dados.certidaoDeNascimento || ""}
                    onChange={(e) => setDados({ ...dados, certidaoDeNascimento: e.target.value })}
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
                    id="orgaoExpedidor"
                    type="text"
                    label="Órgão Expedidor"
                    value={dados.orgaoExpedidor || ""}
                    onChange={(e) => setDados({ ...dados, orgaoExpedidor: e.target.value })}
                    className="h-[8vh] w-[22vw]"
                />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
                <AddMemberInput
                    id="dataNascimento"
                    type="date"
                    label="Data de Nascimento"
                    value={dados.dataNascimento || ""}
                    onChange={(e) => setDados({ ...dados, dataNascimento: e.target.value })}
                    className="h-[8vh] w-[22vw]"
                />
                <AddMemberInput
                    id="contato"
                    type="text"
                    label="Contato"
                    value={dados.contato || ""}
                    onChange={(e) => setDados({ ...dados, contato: e.target.value })}
                    className="h-[8vh] w-[30vw]"
                />
            </div>
            <div className="flex flex-row justify-between items-center w-[85%]">
                <AddMemberInput
                    id="sexo"
                    type="select"
                    options={[
                        { value: "masculino", label: "Masculino" },
                        { value: "feminino", label: "Feminino" },
                    ]}
                    label="Sexo"
                    value={dados.sexo || ""}
                    onChange={(e) => setDados({ ...dados, sexo: e.target.value })}
                    className="h-[8vh] w-[15vw]"
                />
                <AddMemberInput
                    id="tamanhoCamiseta"
                    type="select"
                    options={[
                        { value: "pp", label: "PP" },
                        { value: "p", label: "P" },
                        { value: "m", label: "M" },
                        { value: "g", label: "G" },
                        { value: "gg", label: "GG" },
                        { value: "xg", label: "XG" }
                    ]}
                    label="Tamanho da Camiseta"
                    value={dados.tamanhoCamiseta || ""}
                    onChange={(e) => setDados({ ...dados, tamanhoCamiseta: e.target.value })}
                    className="h-[8vh] w-[15vw]"
                />
                <AddMemberInput
                    id="batizado"
                    type="select"
                    options={[
                        { value: "true", label: "Sim" },
                        { value: "false", label: "Não" }
                    ]}
                    label="Batizado"
                    value={dados.batizado || ""}
                    onChange={(e) => setDados({ ...dados, batizado: e.target.value })}
                    className="h-[8vh] w-[15vw]"
                />
            </div>
        </div>
    </div>
  );
}

export default PersonalData;