import React, { useState, useEffect } from "react";

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: 28,
    letterSpacing: 0.5
  },
  questionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24
  },
  questionBlock: {
    marginBottom: 0,
    paddingBottom: 18,
    borderBottom: "1px solid #ffffff",
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
    padding: "18px 20px"
  },
  question: {
    fontWeight: 600,
    fontSize: 17,
    marginBottom: 10,
    color: "#334155"
  },
  radioGroup: {
    display: "flex",
    gap: 24,
    marginBottom: 8
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: 15,
    cursor: "pointer",
    fontWeight: 500,
    color: "#475569"
  },
  radioInput: {
    accentColor: "#2563eb",
    marginRight: 8,
    width: 18,
    height: 18
  },
  textarea: {
    width: "100%",
    minHeight: 60,
    borderRadius: 8,
    border: "1.5px solid #cbd5e1",
    padding: 10,
    fontSize: 15,
    marginTop: 10,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
    background: "#f8fafc"
  }
};

const MedicalDataCard = ({ questions, onChange }) => {
    const [answers, setAnswers] = useState(
        questions.map(() => ({ value: null, extra: "" }))
    );

    useEffect(() => {
    // Transforma para o formato esperado pelo MedicalData.jsx
    const result = answers.map((ans) => ({
        value: ans.value === "sim" ? true : ans.value === "nao" ? false : null,
        extra: ans.value === "sim" ? ans.extra : ""
    }));
    onChange && onChange(result);
    }, [answers, onChange]);

    const handleChange = (idx, value) => {
        setAnswers(prev =>
        prev.map((ans, i) =>
            i === idx ? { value, extra: value === "sim" ? ans.extra : "" } : ans
        )
        );
    };

    const handleExtraChange = (idx, text) => {
        setAnswers(prev =>
        prev.map((ans, i) =>
            i === idx ? { ...ans, extra: text } : ans
        )
        );
    };

  return (
      <div style={styles.questionsGrid}>
        {questions.map((q, idx) => (
          <div key={idx} style={styles.questionBlock}>
            <div style={styles.question}>{q}</div>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value="sim"
                  checked={answers[idx].value === "sim"}
                  onChange={() => handleChange(idx, "sim")}
                  style={styles.radioInput}
                />
                Sim
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value="nao"
                  checked={answers[idx].value === "nao"}
                  onChange={() => handleChange(idx, "nao")}
                  style={styles.radioInput}
                />
                Não
              </label>
            </div>
            {answers[idx].value === "sim" && (
              <textarea
                placeholder="Descreva aqui..."
                value={answers[idx].extra}
                onChange={e => handleExtraChange(idx, e.target.value)}
                style={styles.textarea}
              />
            )}
          </div>
        ))}
      </div>
  );
};

export default MedicalDataCard;