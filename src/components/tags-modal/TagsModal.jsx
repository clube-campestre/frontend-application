import React from "react";
import { LuTags, LuCirclePlus } from "react-icons/lu";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import EditModal from "../edit-modal/EditModal";

/**
 * Componente Modal de Gerenciamento de Tags
 * @param {boolean} isOpen - Controla se o modal está aberto
 * @param {function} onClose - Callback para fechar o modal
 * @param {array} tags - Lista de tags
 * @param {object} editingTag - Tag sendo editada (null se não estiver editando)
 * @param {function} onEditTag - Callback quando inicia edição: (tag) => void
 * @param {function} onCancelEdit - Callback para cancelar edição
 * @param {function} onSaveTag - Callback para salvar tag: (tagData) => void
 * @param {function} onDeleteTag - Callback para deletar tag: (tagId) => void
 * @param {boolean} showTagModal - Controla se mostra formulário de nova tag
 * @param {function} onShowTagModal - Callback para mostrar formulário: (show) => void
 * @param {function} onCreateTag - Callback para criar tag: (tagData) => void
 * @param {array} tagFields - Campos do formulário para nova tag
 * @param {array} tagEditFields - Campos do formulário para editar tag
 */
const TagsModal = ({
    isOpen,
    onClose,
    tags = [],
    editingTag,
    onEditTag,
    onCancelEdit,
    onSaveTag,
    onDeleteTag,
    showTagModal,
    onShowTagModal,
    onCreateTag,
    tagFields = [],
    tagEditFields = []
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col relative animate-fadeIn">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <LuTags className="text-[#FCAE2D]" /> Gerenciar Tags
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Fechar modal"
                    >
                        <span className="text-2xl leading-none">&times;</span>
                    </button>
                </div>

                {/* Body Modal */}
                <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
                    
                    {!editingTag && !showTagModal && (
                        <button
                            onClick={() => onShowTagModal(true)}
                            className="w-full mb-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#FCAE2D] hover:text-[#FCAE2D] hover:bg-white transition-all font-medium flex items-center justify-center gap-2"
                        >
                            <LuCirclePlus /> Nova Tag
                        </button>
                    )}

                    {showTagModal && (
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">Nova Tag</h3>
                            <EditModal
                                onClose={() => onShowTagModal(false)}
                                onSubmit={onCreateTag}
                                editingItem={null}
                                title=""
                                fields={tagFields}
                                containerClassName="w-full shadow-none p-0 bg-transparent"
                                floatingLabels={true}
                            />
                        </div>
                    )}

                    {editingTag ? (
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">Editando: {editingTag.surname}</h3>
                            <EditModal
                                onClose={onCancelEdit}
                                onSubmit={onSaveTag}
                                editingItem={editingTag}
                                title=""
                                fields={tagEditFields}
                                containerClassName="w-full shadow-none p-0 bg-transparent"
                            />
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {tags.length === 0 && (
                                <p className="text-center text-gray-400 text-sm">Nenhuma tag encontrada.</p>
                            )}
                            {tags.map((tag) => {
                                const isDefault = String(tag.surname || "").trim().toLowerCase() === "outros";
                                return (
                                    <div 
                                        key={tag.id} 
                                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-3 h-3 rounded-full" 
                                                style={{ background: tag.color }}
                                            ></div>
                                            <span className="text-sm font-medium text-gray-700">{tag.surname}</span>
                                            {tag.goal && (
                                                <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">
                                                    Meta: {tag.goal}
                                                </span>
                                            )}
                                            {tag.privateGoal && (
                                                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                                                    Privada
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-1">
                                            {!isDefault && (
                                                <>
                                                    <button 
                                                        onClick={() => onEditTag(tag)} 
                                                        className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded transition-colors"
                                                        aria-label="Editar tag"
                                                    >
                                                        <FaPencilAlt size={14} />
                                                    </button>
                                                    <button 
                                                        onClick={() => onDeleteTag(tag.id)} 
                                                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        aria-label="Deletar tag"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagsModal;

