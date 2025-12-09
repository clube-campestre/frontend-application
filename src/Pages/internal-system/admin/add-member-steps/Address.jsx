import { useState, useEffect } from "react";
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

function Address({ dados, setDados, errors = {}, setErrors }) {
    const [isLoadingCep, setIsLoadingCep] = useState(false);

    const handleChange = (id, value) => {
        setDados({ ...dados, [id]: value });
        // Limpar erro ao digitar
        if (errors[id] && setErrors) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
        }
    };

    // Máscara para CEP
    const formatCep = (value) => {
        let cep = value.replace(/\D/g, "");
        if (cep.length > 5) {
            cep = cep.slice(0, 5) + "-" + cep.slice(5, 8);
        }
        return cep.slice(0, 9);
    };

    // Handler para mudança dos campos (removido, usando o handleChange acima)

    // Busca o endereço pelo CEP
    const buscarCep = async (cep) => {
        const cepNumerico = (cep || "").replace(/\D/g, "");
        if (cepNumerico.length !== 8) return;
        setIsLoadingCep(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
            const data = await res.json();

            // Depois de receber data da API:
            handleChange("street", data.logradouro || "");
            handleChange("district", data.bairro || "");
            handleChange("city", data.localidade || "");
            handleChange("state", data.uf || "");
            handleChange("cep", formatCep(cepNumerico));

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

    }, [dados]);

    return (
        // Container Principal: Centralizado, com padding seguro para mobile e largura máxima para desktop
        <div className="flex flex-col w-full max-w-screen-xl mx-auto p-4 md:p-8">
            
            {/* Header: Alinhamento ajustado e margem removida */}
            <div className="flex items-center gap-2 mb-6">
                <div className="border-[3px] h-10 border-amber-400 rounded"></div>
                <h2 className="font-semibold text-xl text-gray-800">Endereço</h2>
            </div>

            {/* GRID SYSTEM: 
                - Mobile (padrão): grid-cols-1 (1 coluna, itens empilhados)
                - Tablet/Desktop (md): grid-cols-12 (12 colunas para layout complexo)
                - gap-4: Espaçamento consistente entre os inputs
            */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                
                {/* Linha 1: CEP, Número, Complemento */}
                <div className="md:col-span-3">
                    <AddMemberInput
                        id="cep"
                        type="text"
                        label="CEP"
                        value={dados.cep || ""}
                        onChange={(e) => {
                            const formatted = formatCep(e.target.value);
                            handleChange("cep", formatted);
                        }}
                        onBlur={(e) => handleBlur("cep", e.target.value)}
                        required={true}
                        error={errors.cep}
                        className="w-full" 
                    />
                </div>
                <div className="md:col-span-2">
                    <AddMemberInput
                        id="houseNumber"
                        type="text"
                        label="Número"
                        value={dados.houseNumber || ""}
                        onChange={(e) => handleChange("houseNumber", e.target.value)}
                        onBlur={(e) => handleBlur("houseNumber", e.target.value)}
                        required={true}
                        error={errors.houseNumber}
                        className="w-full"
                    />
                </div>
                <div className="md:col-span-7">
                    <AddMemberInput
                        id="complement"
                        type="text"
                        label="Complemento"
                        value={dados.complement || ""}
                        onChange={(e) => handleChange("complement", e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Linha 2: Bairro, Estado */}
                <div className="md:col-span-8">
                    <AddMemberInput
                        id="district"
                        type="text"
                        label="Bairro"
                        value={dados.district || ""}
                        onChange={(e) => handleChange("district", e.target.value)}
                        required={true}
                        error={errors.district}
                        className="w-full"
                        disabled={isEndereco("district") && isLoadingCep}
                    />
                </div>
                <div className="md:col-span-4">
                    <AddMemberInput
                        id="state"
                        type="text"
                        label="Estado"
                        value={dados.state || ""}
                        onChange={(e) => handleChange("state", e.target.value)}
                        required={true}
                        error={errors.state}
                        className="w-full"
                        disabled={isEndereco("state") && isLoadingCep}
                    />
                </div>

                {/* Linha 3: Cidade, Logradouro */}
                <div className="md:col-span-5">
                    <AddMemberInput
                        id="city"
                        type="text"
                        label="Cidade"
                        value={dados.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                        required={true}
                        error={errors.city}
                        className="w-full"
                        disabled={isEndereco("city") && isLoadingCep}
                    />
                </div>
                <div className="md:col-span-7">
                    <AddMemberInput
                        id="street"
                        type="text"
                        label="Logradouro"
                        value={dados.street || ""}
                        onChange={(e) => handleChange("street", e.target.value)}
                        required={true}
                        error={errors.street}
                        className="w-full"
                        disabled={isEndereco("street") && isLoadingCep}
                    />
                </div>

                {/* Linha 4: Referência */}
                <div className="md:col-span-12">
                    <AddMemberInput
                        id="referenceHouse"
                        type="text"
                        label="Referência"
                        value={dados.referenceHouse || ""}
                        onChange={(e) => handleChange("referenceHouse", e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default Address;