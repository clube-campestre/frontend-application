import { useState, useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function EditModal({
  onClose,
  onSubmit,
  editingItem,
  fields,
  title,
}) {
  const [form, setForm] = useState({});
  const [hoveredNota, setHoveredNota] = useState(0);
  useEffect(() => {
    if (editingItem) {
      setForm(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    console.log("Form submitted:", form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000da]">
      <div className="bg-[#f3f3f3] p-10 rounded-xl shadow-lg min-w-[500px] relative">
        <button onClick={onClose} className="absolute top-1 right-3 text-3xl">
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">
          <span className="border-l-4 border-[#FCAE2D] mr-3"></span>
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => {
              if (field.type === "radio") {
                return (
                  <div key={field.name}>
                    <p className="font-semibold">{field.label}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {field.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={option}
                            checked={
                              form[field.name]?.toLowerCase?.() ===
                              option.toLowerCase()
                            }
                            onChange={() =>
                              setForm({
                                ...form,
                                [field.name]: option,
                              })
                            }
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              } else if (field.type == "date") {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      className="w-full px-3 py-2 rounded border"
                      type={field.type}
                      name={field.name}
                      value={
                        form[field.name]
                          ? new Date(form[field.name])
                              .toISOString()
                              .slice(0, 10)
                          : ""
                      }
                      onChange={handleChange}
                      required={field.required}
                    />
                  </div>
                );
              } else if (field.name === "rating") {
                return (
                  <div key={field.name}>
                    <label className="block mb-1 font-medium">Nota</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((valor) => (
                        <button
                          key={valor}
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              rating: valor,
                            })
                          }
                          onMouseEnter={() => setHoveredNota(valor)}
                          onMouseLeave={() => setHoveredNota(0)}
                          className="w-8 h-8 rounded-full cursor-pointer"
                        >
                          {valor <= (hoveredNota || form.rating || 0) ? (
                            <FaStar color="#FCAE2D" />
                          ) : (
                            <FaRegStar color="#FCAE2D" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      className="w-full px-3 py-2 rounded border"
                      type={field.type}
                      name={field.name}
                      value={form[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      required={field.required}
                    />
                  </div>
                );
              }
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#FCAE2D] text-white px-6 py-2 rounded font-semibold hover:bg-[#e29d23]"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
