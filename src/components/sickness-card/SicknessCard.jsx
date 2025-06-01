import React from "react";

const SicknessCard = ({ sicknessList = [], values = {}, onChange }) => {
  const handleChange = (sicknessKey, value) => {
    if (onChange) {
      onChange(sicknessKey, value === true);
    }
  };

  return (
    <table className="rounded-lg overflow-hidden" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th className="bg-amber-400 text-white rounded-tl-lg" style={{ border: "2px solid #ccc", padding: "8px" }}>Doença</th>
          <th className="bg-amber-400 text-white" style={{ border: "2px solid #ccc", padding: "8px" }}>Sim</th>
          <th className="bg-amber-400 text-white rounded-tr-lg" style={{ border: "2px solid #ccc", padding: "8px" }}>Não</th>
        </tr>
      </thead>
      <tbody>
        {sicknessList.map(({ key, label }) => (
          <tr key={key}>
            <td className="bg-white" style={{ border: "1px solid #ccc", padding: "8px" }}>{label}</td>
            <td className="bg-white" style={{ border: "1px solid #ccc", textAlign: "center" }}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={key}
                  value={true}
                  checked={values[key] === true}
                  onChange={() => handleChange(key, true)}
                  className="peer sr-only"
                />
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-[#666666] peer-checked:bg-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400"></span>
              </label>
            </td>
            <td className="bg-white" style={{ border: "1px solid #ccc", textAlign: "center" }}>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={key}
                  value={false}
                  checked={values[key] === false}
                  onChange={() => handleChange(key, false)}
                  className="peer sr-only"
                />
                <span className="w-6 h-6 rounded-full flex items-center justify-center bg-[#666666] peer-checked:bg-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400"></span>
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SicknessCard;