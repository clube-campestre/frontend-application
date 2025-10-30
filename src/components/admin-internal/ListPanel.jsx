import React from 'react';

const ListPanel = ({ title, children, emptyMessage = "Nenhum item encontrado" }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-full h-full flex flex-col">
      <h2 className="text-lg text-gray-800 font-medium mb-4">{title}</h2>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-amber-500 scrollbar-thumb-rounded-md">
        {React.Children.count(children) > 0 ? (
          children
        ) : (
          <div className="text-gray-500 text-center py-5 italic">{emptyMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ListPanel;