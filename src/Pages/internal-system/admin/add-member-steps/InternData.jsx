import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react"; // Ícones para melhorar UX
import AddMemberInput from "../../../../components/add-member-input/AddMemberInput";

// --- COMPONENTE PRINCIPAL ---

function InternData({ dados, setDados, errors = {}, setErrors}) {
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (field, value) => {
    setDados({ ...dados, [field]: value });
    // Limpar erro ao digitar
    if (errors[field] && setErrors) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };


  return (
    // Container Principal: Removemos ml-20 e usamos max-w-screen-xl para centralizar
    <div className="w-full max-w-screen-xl mx-auto p-4 md:p-8 font-sans">
      
      {/* Header da Seção */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        <div className="w-1.5 h-8 bg-amber-400 rounded-full"></div>
        <h2 className="font-bold text-xl md:text-2xl text-gray-800">Dados Internos</h2>
      </div>

      {/* GRID PRINCIPAL: 
          - Mobile: 1 coluna (inputs em cima, foto embaixo)
          - Desktop (lg): 3 colunas (Inputs ocupam 2, Foto ocupa 1)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* COLUNA DA ESQUERDA: Inputs (Ocupa 2 colunas no desktop) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          <AddMemberInput
            id="unit"
            type="select"
            options={[
              { value: "PANDA", label: "Panda" },
              { value: "FALCAO", label: "Falcão" },
              { value: "LINCE", label: "Lince" },
              { value: "LEAO", label: "Leão" },
              { value: "AGUIA_REAL", label: "Águia Real" },
              { value: "TIGRE", label: "Tigre" },
              { value: "RAPOSA", label: "Raposa" },
              { value: "URSO", label: "Urso" },
              { value: "PANTERA", label: "Pantera" },
              { value: "LOBO", label: "Lobo" },
              { value: "", label: "Nenhuma" },
            ]}
            label="Unidade"
            value={String(dados.unit || "")}
            onChange={(e) => setDados({...dados, unit: e.target.value})}
            className="w-full"
          />

          <AddMemberInput
            id="unitRole"
            type="select"
            options={[
              { value: "", label: "Selecione..." },
              { value: "CONSELHEIRO", label: "Conselheiro" },
              { value: "CONSELHEIRO_AUXILIAR", label: "Conselheiro Auxiliar" },
              { value: "CAPITAO", label: "Capitão" },
              { value: "VICE_CAPITAO", label: "Vice-Capitão" },
              { value: "SECRETARIO", label: "Secretário" },
              { value: "VICE_SECRETARIO", label: "Vice-Secretário" },
              { value: "PADIOLEIRO", label: "Padioleiro" },
              { value: "CAPELAO", label: "Capelão" },
              { value: "ALMOXARIFADO", label: "Almoxarifado" },
              { value: "MEMBRO", label: "Membro" },
              { value: "NENHUMA", label: "Nenhuma" },
            ]}
            label="Função na Unidade"
            value={String(dados.unitRole || "")}
            onChange={(e) => handleChange("unitRole", e.target.value)}
            required={true}
            error={errors.unitRole}
            className="w-full"
          />

          <AddMemberInput
            id="classCategory"
            type="select"
            options={[
              { value: "", label: "Selecione..." },
              { value: "AMIGO", label: "Amigo" },
              { value: "COMPANHEIRO", label: "Companheiro" },
              { value: "PESQUISADOR", label: "Pesquisador" },
              { value: "PIONEIRO", label: "Pioneiro" },
              { value: "EXCURSIONISTA", label: "Excursionista" },
              { value: "GUIA", label: "Guia" },
              { value: "AGRUPADAS", label: "Agrupadas" },
              { value: "DESBRAVADORES_COMPLETO", label: "Desbravadores Completo" },
              { value: "LIDER", label: "Líder" },
              { value: "LIDER_MASTER", label: "Líder Master" },
              { value: "LIDER_MASTER_AVANCADO", label: "Líder Master Avançado" },
              { value: "NENHUMA", label: "Nenhuma" },
            ]}
            label="Categoria da Classe"
            value={String(dados.classCategory || "")}
            onChange={(e) => handleChange("classCategory", e.target.value)}
            required={true}
            error={errors.classCategory}
            className="w-full"
          />

          <AddMemberInput
            id="classRole"
            type="select"
            options={[
              { value: "", label: "Selecione..." },
              { value: "INSTRUTOR", label: "Instrutor" },
              { value: "INSTRUTOR_AUXILIAR", label: "Instrutor Auxiliar" },
              { value: "MEMBRO", label: "Membro" },
              { value: "NENHUMA", label: "Nenhuma" },
            ]}
            label="Função na Classe"
            value={String(dados.classRole || "")}
            onChange={(e) => handleChange("classRole", e.target.value)}
            required={true}
            error={errors.classRole}
            className="w-full"
          />
        </div>

        {/* COLUNA DA DIREITA: Upload de Foto (Ocupa 1 coluna no desktop) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-start h-full">
          <h3 className="mb-3 text-sm font-semibold text-gray-600 w-full text-left lg:text-center">
            Foto do membro
          </h3>
          
          <div className="relative w-full aspect-[3/4] max-w-[240px]">
            <label className="relative flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all group bg-gray-50 overflow-hidden">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const dataUrl = String(reader.result || "");
                      const base64 = dataUrl.includes(",")
                        ? dataUrl.split(",")[1]
                        : dataUrl;
                      setDados({
                        ...dados,
                        image: base64,
                        imageFormat: file.type,
                        imageFile: file,
                        imagePreview: dataUrl, // Usa dataURL direto para preview
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {dados.imagePreview || dados.foto ? (
                <img
                  src={dados.imagePreview || dados.foto}
                  alt="Pré-visualização"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-amber-500 transition-colors p-4 text-center">
                  <Upload size={40} strokeWidth={1.5} className="mb-2" />
                  <span className="text-sm font-medium">Clique para adicionar foto</span>
                  <span className="text-xs mt-1 opacity-70">(Formatos: JPG, PNG)</span>
                </div>
              )}
              
              {/* Overlay para editar quando já tem foto */}
              {(dados.imagePreview || dados.foto) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full border border-white/30">Alterar foto</span>
                  </div>
              )}
            </label>
            
            {/* Botão de remover imagem */}
            {(dados.imagePreview || dados.foto) && (
              <button
                type="button"
                onClick={() => {
                  setDados({
                    ...dados,
                    image: null,
                    imageFormat: null,
                    imageFile: null,
                    imagePreview: null,
                    foto: null,
                  });
                  // Limpar o input file
                  const fileInput = document.getElementById('image-upload');
                  if (fileInput) fileInput.value = '';
                }}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all z-10"
                title="Remover imagem"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Checkbox de Termos */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={Boolean(dados.acceptTerms)}
            onChange={(e) => handleChange("acceptTerms", e.target.checked)}
            className={`mt-1 w-5 h-5 text-amber-500 rounded border-gray-300 focus:ring-amber-400 cursor-pointer accent-amber-500 ${errors.acceptTerms ? 'border-red-500' : ''}`}
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer select-none">
            Declaro que as informações acima são verdadeiras e aceito os{" "}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
            >
              termos de uso
            </button>{" "}
            e política de privacidade do clube.
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        {errors.acceptTerms && (
          <span className="text-red-500 text-xs ml-8">{errors.acceptTerms}</span>
        )}
      </div>

      {/* Modal de Termos */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative">
            
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FileText className="text-amber-500" /> Termos de Uso
              </h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo Scrollável */}
            <div className="overflow-y-auto p-6 md:p-8 text-gray-600 space-y-6 leading-relaxed text-sm md:text-base">
                <section>
                    <h4 className="font-bold text-gray-800 mb-2">1. Aceitação dos Termos</h4>
                    <p>Ao acessar e utilizar esta aplicação, o usuário declara ter lido, compreendido e aceitado integralmente os presentes Termos de Uso.</p>
                </section>

                <section>
                    <h4 className="font-bold text-gray-800 mb-2">2. Finalidade da Aplicação</h4>
                    <p>Esta aplicação foi desenvolvida para uso interno do Clube Campestre, visando facilitar a comunicação e gerenciamento.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Exibição controlada de informações entre membros.</li>
                        <li>Uso administrativo pela secretaria.</li>
                    </ul>
                </section>

                <section>
                    <h4 className="font-bold text-gray-800 mb-2">3. Coleta e Uso de Dados</h4>
                    <p>Autoriza-se o clube a coletar e processar dados pessoais (nome, telefone, etc.) exclusivamente para fins internos.</p>
                </section>
                
                {/* ... Outros termos resumidos para brevidade visual ... */}
                
                <section>
                    <h4 className="font-bold text-gray-800 mb-2">4. Responsabilidade</h4>
                    <p>O usuário compromete-se a fornecer informações verdadeiras e manter seus dados atualizados.</p>
                </section>
            </div>

            {/* Footer do Modal */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-5 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setDados({...dados, acceptTerms: true});
                  setShowTermsModal(false);
                }}
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium shadow-sm shadow-amber-200 transition-all transform active:scale-95"
              >
                Li e Aceito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternData;