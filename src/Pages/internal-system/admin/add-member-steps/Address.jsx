import { useState, useEffect } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

function Address({ dados, setDados }) {
    const [isLoadingCep, setIsLoadingCep] = useState(false);


    // Máscara para CEP
    const formatCep = (value) => {
        let cep = value.replace(/\D/g, "");
        if (cep.length > 5) {
            cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
        }
        return cep.slice(0, 9);
    };

    // Handler para mudança dos campos
    const handleChange = (id, value) => {
        if (id === "cep") {
            setDados({ ...dados, cep: formatCep(value) });
        } else {
            setDados({ ...dados, [id]: value });
        }
    };

    // Busca o endereço pelo CEP
    const buscarCep = async (cep) => {
        const cepNumerico = (cep || "").replace(/\D/g, "");
        if (cepNumerico.length !== 8) return;
        setIsLoadingCep(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
            const data = await res.json();
            
            // Depois de receber data da API:
            const novosDados = {
            street: data.logradouro,
            complement: data.bairro,
            district: data.district,
            city: data.localidade,
            state: data.uf,
            cep: formatCep(cepNumerico),
            };
            console.log("Atualizando dados com:", novosDados);
            setDados(novosDados);

            console.log("Dados do CEP:", dados);

        } catch (e) {
            // erro silencioso
        } finally {
            setIsLoadingCep(false);
        }
    };

    // Handler para blur do campo CEP
    const handleBlur = (id, value) => {
        console.log("handleBlur chamado com:", id, value);
        if (id === "cep") {
            const cepNumerico = value.replace(/\D/g, "");
            if (cepNumerico.length === 8) {
                buscarCep(cepNumerico);
            }
        }
    };

    // Campos que devem ser bloqueados durante a busca
    const isEndereco = (id) => ["logradouro", "bairro", "cidade", "estado"].includes(id);


    useEffect(() => {
        console.log("✅ dados atualizados:", dados);
    }, [dados]);

    return (
        <div className="flex flex-col w-full ">
            <div className="flex align-center items-center ml-20 gap-2">
                <div className="border-3 h-10 border-amber-400 rounded"></div>
                <h2 className="font-semibold text-xl">Endereço</h2>
            </div>
            <div className="flex flex-col align-center justify-center items-center h-[90%] gap-3">
                <div className="flex flex-row justify-between items-center w-[85%] ">
                    <AddMemberInput
                        id="cep"
                        type="text"
                        label="CEP"
                        value={dados.cep || ""}
                        onChange={(e) => handleChange("cep", e.target.value)}
                        onBlur={(e) => handleBlur("cep", e.target.value)}
                        className="h-[8vh] w-[17vw]"
                    />
                    <AddMemberInput
                        id="houseNumber"
                        type="text"
                        label="Número"
                        value={dados.houseNumber || ""}
                        onChange={(e) => handleChange("houseNumber", e.target.value)}
                        onBlur={(e) => handleBlur("houseNumber", e.target.value)}
                        className="h-[8vh] w-[12vw]"
                    />
                    <AddMemberInput
                        id="complement"
                        type="text"
                        label="Complemento"
                        value={dados.complement || ""}
                        onChange={(e) => handleChange("complement", e.target.value)}
                        className="h-[8vh] w-[22vw] "
                    />
                </div>
                <div className="flex flex-row justify-between items-center w-[85%]">
                    <AddMemberInput
                        id="district"
                        type="text"
                        label="Bairro"
                        value={dados.district || ""}
                        onChange={(e) => handleChange("district", e.target.value)}
                        className="h-[8vh] w-[30vw]"
                        disabled={isEndereco("district") && isLoadingCep}
                    />
                    <AddMemberInput
                        id="state"
                        type="text"
                        label="Estado"
                        value={dados.state || ""}
                        onChange={(e) => handleChange("state", e.target.value)}
                        className="h-[8vh] w-[22vw]"
                        disabled={isEndereco("state") && isLoadingCep}
                    />
                </div>
                <div className="flex flex-row justify-between items-center w-[85%]">
                    <AddMemberInput
                        id="city"
                        type="text"
                        label="Cidade"
                        value={dados.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="h-[8vh] w-[22vw]"
                        disabled={isEndereco("city") && isLoadingCep}
                    />
                    <AddMemberInput
                        id="street"
                        type="text"
                        label="Logradouro"
                        value={dados.street || ""}
                        onChange={(e) => handleChange("street", e.target.value)}
                        className="h-[8vh] w-[30vw]"
                        disabled={isEndereco("street") && isLoadingCep}
                    />
                </div>
                <div className="flex flex-row justify-between items-center w-[85%]">
                    <AddMemberInput
                        id="referenceHouse"
                        type="text"
                        label="Referência"
                        value={dados.referenceHouse || ""}  
                        onChange={(e) => handleChange("referenceHouse", e.target.value)}
                        className="h-[8vh] w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default Address;