import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";




// Etapa 6 - InternData
function InternData({ dados, setDados }) {
  return (
    <div className="flex flex-col w-full justify-center items-center">
        <div className="flex align-center self-start items-center ml-20 gap-2">
            <div className="border-3 h-10 border-amber-400 rounded"></div>
            <h2 className="font-semibold text-xl">Dados Internos</h2>
        </div>

         <div className="flex flex-row justify-around items-center h-[90%] w-[85%]">
            <div className="flex flex-col justify-between items-center gap-5">
                {/* ...existing AddMemberInput components... */}
                <AddMemberInput
                    id="unidade"
                    type="select"
                    options={[
                        { value: "panda", label: "Panda" },
                        { value: "falcao", label: "Falção" },
                        { value: "lince", label: "Lince" },
                        { value: "leao", label: "Leão" },
                        { value: "aguia_real", label: "Águia Real" },
                        { value: "tigre", label: "Tigre" },
                        { value: "raposa", label: "Raposa" },
                        { value: "urso", label: "Urso" },
                        { value: "pantera", label: "Pantera" },
                        { value: "lobo", label: "Lobo" },
                    ]}
                    label="Unidade"
                    value={dados.unidade || ""}
                    onChange={(e) => setDados({ ...dados, unidade: e.target.value })}
                    className="h-[8vh] w-[20vw]"
                />
                {/* ...outros AddMemberInput... */}
                <AddMemberInput
                    id="unity_role"
                    type="select"
                    options={[
                        { value: "conselheiro", label: "Conselheiro" },
                        { value: "conselheiro_auxiliar", label: "Conselheiro Auxiliar" },
                        { value: "capitao", label: "Capitão" },
                        { value: "vice_capitao", label: "Vice-Capitão" },
                        { value: "secretario", label: "Secretário" },
                        { value: "vice-secretario", label: "Vice-Secretário" },
                        { value: "padioleiro", label: "Padioleiro" },
                        { value: "capelao", label: "Capelão" },
                        { value: "almo_xarifado", label: "Almoxarifado" },
                        { value: "member", label: "Membro" }
                    ]}
                    label="Função na Unidade"
                    value={dados.unity_role || ""}
                    onChange={(e) => setDados({ ...dados, unity_role: e.target.value })}
                    className="h-[8vh] w-[20vw]"
                />
                <AddMemberInput
                    id="class_category"
                    type="select"
                    options={[
                        { value: "amigo", label: "Amigo" },
                        { value: "companheiro", label: "Companheiro" },
                        { value: "pesquisador", label: "Pesquisador" },
                        { value: "pioneiro", label: "Pioneiro" },
                        { value: "excursionista", label: "Excursionista" },
                        { value: "guia", label: "Guia" },
                        { value: "agrupadas", label: "Agrupadas" },
                        { value: "desbravadores-completo", label: "Desbravadores Completo" },
                        { value: "lider", label: "Líder" },
                        { value: "lider_master", label: "Líder Master" },
                        { value: "lider_master_avancado", label: "Líder Master Avançado" }
                    ]}
                    label="Categoria da Classe"
                    value={dados.class_category || ""}
                    onChange={(e) => setDados({ ...dados, class_category: e.target.value })}
                    className="h-[8vh] w-[20vw]"
                />
                <AddMemberInput
                    id="class_role"
                    type="select"
                    options={[
                        { value: "instrutor", label: "Instrutor" },
                        { value: "instrutor_auxiliar", label: "Instrutor Auxiliar" },
                        { value: "meber", label: "Membro" }
                    ]}
                    label="Função na Classe"
                    value={dados.class_role || ""}
                    onChange={(e) => setDados({ ...dados, class_role: e.target.value })}
                    className="h-[8vh] w-[20vw]"
                />
            </div>
            <div className="flex h-full items-center justify-center flex-col">
                <h3 className="mb-2 text-[15px] font-medium text-gray-700">Foto do membro</h3>
                <label className="flex flex-col items-center justify-center w-56 h-72 border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-amber-400 transition-colors">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setDados({ ...dados, foto: file });
                            }
                        }}
                    />
                    {dados.foto ? (
                        <img
                            src={typeof dados.foto === "string" ? dados.foto : URL.createObjectURL(dados.foto)}
                            alt="Pré-visualização"
                            className="object-cover w-full h-full rounded"
                        />
                    ) : (
                        <span className="text-gray-400 text-center">
                            Clique para adicionar<br />uma foto
                        </span>
                    )}
                </label>
            </div>
        </div>
    </div>
  );
}

export default InternData;