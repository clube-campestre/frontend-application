import React, { useState, useEffect } from "react";

const AddMember4 = ({ onNext, onBack, onChange, data }) => {
  const [form, setForm] = useState({
    fatherName: data.fatherName || "",
    fatherEmail: data.fatherEmail || "",
    fatherContact: data.fatherContact || "",
    motherName: data.motherName || "",
    motherEmail: data.motherEmail || "",
    motherContact: data.motherContact || "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const allFilled = Object.values(form).every((val) => val.trim() !== "");
    setIsValid(allFilled);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onChange(form);
      onNext();
    }
  };

  const inputStyle =
    "p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FCAE2D] focus:border-[#FCAE2D]";

  return (
    <div className="flex flex-col items-center bg-white px-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 shadow-md rounded-xl px-10 py-8 w-full max-w-3xl grid grid-cols-2 gap-4"
      >
        <h2 className="col-span-2 text-lg font-semibold mb-4 flex items-center">
          <span className="w-1 h-5 bg-[#FCAE2D] rounded-sm mr-2"></span>
          Cadastrar Membro
        </h2>

        <input
          type="text"
          name="fatherName"
          placeholder="Nome do pai"
          value={form.fatherName}
          onChange={handleChange}
          className={`col-span-2 ${inputStyle}`}
        />

        <input
          type="email"
          name="fatherEmail"
          placeholder="Email"
          value={form.fatherEmail}
          onChange={handleChange}
          className={inputStyle}
        />

        <input
          type="text"
          name="fatherContact"
          placeholder="Contato"
          value={form.fatherContact}
          onChange={handleChange}
          className={inputStyle}
        />

        <input
          type="text"
          name="motherName"
          placeholder="Nome da mãe"
          value={form.motherName}
          onChange={handleChange}
          className={`col-span-2 ${inputStyle}`}
        />

        <input
          type="email"
          name="motherEmail"
          placeholder="Email"
          value={form.motherEmail}
          onChange={handleChange}
          className={inputStyle}
        />

        <input
          type="text"
          name="motherContact"
          placeholder="Contato"
          value={form.motherContact}
          onChange={handleChange}
          className={inputStyle}
        />

        <p className="col-span-2 text-xs text-[#001B5E] italic mt-1">
          Caso não tenha pai ou mãe, insira o nome do responsável legal.
        </p>

        <div className="flex justify-between items-center col-span-2 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-full hover:bg-gray-400 transition"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`${
              isValid
                ? "bg-[#FCAE2D] hover:bg-[#e79d25]"
                : "bg-gray-300 cursor-not-allowed"
            } text-white font-bold py-2 px-6 rounded-full shadow transition`}
          >
            Próximo
          </button>
        </div>
      </form>

      <div className="flex gap-2 mt-6 mb-10">
        <span className="w-3 h-3 rounded-full bg-[#FCAE2D]"></span>
        <span className="w-3 h-3 rounded-full bg-[#FCAE2D]"></span>
        <span className="w-3 h-3 rounded-full bg-[#FCAE2D]"></span>
        <span className="w-3 h-3 rounded-full bg-[#FCAE2D]"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
        <span className="w-3 h-3 rounded-full bg-gray-300"></span>
      </div>
    </div>
  );
};

export default AddMember4;
