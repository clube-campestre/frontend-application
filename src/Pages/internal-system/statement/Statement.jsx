import { api } from "../../../provider/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { LuCirclePlus } from "react-icons/lu";
import { StatementCard } from "../../../components/statement-card/StatementCard";

const statementFields = [
    { id: "information", type: "text", label: "Descrição", isRequired: true },
    { id: "value", type: "number", label: "Valor", isRequired: true },
    { id: "date", type: "date", label: "Data", isRequired: true },
    { id: "tag", type: "text", label: "Tag", isRequired: true },
];

const Statement = () => {
    // Exemplo de dados fictícios para passar para o StatementCard
    const transactions = [
        {
            id: 1,
            type: "ENTRADA",
            amount: 1500,
            date: "2023-10-01",
            description: "Salário",
            category: "Receita",
        },
        {
            id: 2,
            type: "SAIDA",
            amount: 200,
            date: "2023-10-02",
            description: "Supermercado",
            category: "Despesa",
        },
        // Adicione mais transações conforme necessário
    ];

    return (
        <div className="flex items-center justify-center w-full h-[82vh]">
            <div className="flex flex-col items-center justify-start w-[80vw] h-[82vh]">
                {/* Header Section */}
                <header className="flex items-center justify-between w-full h-16">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-2 bg-yellow-400 rounded"></div>
                        <h2 className="text-xl font-normal">Lançar Receita</h2>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#D9D9D9] text-black rounded hover:bg-gray-400">
                        Adicionar Transação <LuCirclePlus />
                    </button>
                </header>

                {/* Filter Section */}
                <section className="flex flex-col w-full p-4 rounded shadow mb-6 bg-[#7C7C7C]">
                    <input
                        type="text"
                        placeholder="Buscar por descrição"
                        className="w-full mb-4 p-2 border border-gray-300 rounded bg-[#EDEDED]"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <select
                            name="tag"
                            id="tag"
                            className="p-2 border w-[20%] border-gray-300 rounded bg-[#EDEDED]"
                        >
                            <option value="receita">Receita</option>
                            <option value="despesa">Despesa</option>
                        </select>
                        <input
                            type="date"
                            id="data-inicio"
                            className="p-2 border w-[24%] border-gray-300 rounded bg-[#EDEDED]"
                        />
                        <input
                            type="date"
                            id="data-fim"
                            className="p-2 border w-[24%] border-gray-300 rounded bg-[#EDEDED]"
                        />
                        <select
                            name="tipo-transacao"
                            id="tipo-transacao"
                            className="p-2 border w-[24%] border-gray-300 rounded bg-[#EDEDED]"
                        >
                            <option value="entrada">Entrada</option>
                            <option value="saida">Saída</option>
                        </select>
                    </div>
                </section>

                {/* Statement List Section */}
                <section className="w-full h-[48.5vh] bg-[#EDEDED] p-4 rounded shadow overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <StatementCard key={transaction.id} item={transaction} />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Nenhuma transação encontrada.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Statement;