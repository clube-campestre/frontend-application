import React from 'react';

const AddButton = ({ label, onClick }) => {
  return (
    <button 
      className="flex items-center bg-white border border-gray-200 rounded-lg px-15 py-4 cursor-pointer text-lg transition-all hover:bg-gray-50 shadow-sm"
      onClick={onClick}
    >
      <span className="text-amber-500 font-bold mr-2 text-base">+</span>
      <span className="text-gray-800">{label}</span>
    </button>
  );
};

export default AddButton;