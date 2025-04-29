import React, { useState } from 'react';
import Formulario from '../../../components/admin-internal/FormMember';
import Step2 from '../admin/AddMember2'; 
import Step3 from '../admin/AddMember3';
import Step4 from '../admin/AddMember4';
import Step5 from "../admin/AddMember5";
import Step6 from "../admin/AddMember6"

const AddMember = () => {
  const [step, setStep] = useState(1);
  const [memberData, setMemberData] = useState({});

  const handleNext = (dados) => {
    setMemberData((prev) => ({ ...prev, ...dados }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const camposStep1 = [
    {
      id: 'nomeCompleto',
      tipo: 'texto',
      rotulo: 'Nome completo',
      placeholder: 'nome completo',
      obrigatorio: true,
      metade: true
    },
    {
      id: 'certidaoNascimento',
      tipo: 'texto',
      rotulo: 'Certidão de nascimento',
      placeholder: 'certidão de nascimento',
      metade: true
    },
    {
      id: 'cpf',
      tipo: 'texto',
      rotulo: 'CPF',
      placeholder: 'CPF',
      obrigatorio: true,
      metade: true
    },
    {
      id: 'orgaoExpedidor',
      tipo: 'texto',
      rotulo: 'Órgão expedidor',
      placeholder: 'orgão expedidor',
      metade: true
    },
    {
      id: 'dataNascimento',
      tipo: 'data',
      rotulo: 'Data de nascimento',
      obrigatorio: true,
      metade: true
    },
    {
      id: 'contato',
      tipo: 'texto',
      rotulo: 'Contato',
      placeholder: 'contato',
      metade: true
    },
    {
      id: 'sexo',
      tipo: 'radio',
      rotulo: 'Sexo',
      obrigatorio: true,
      opcoes: [
        { valor: 'feminino', rotulo: 'Feminino' },
        { valor: 'masculino', rotulo: 'Masculino' }
      ]
    },
    {
      id: 'tamanhoCamiseta',
      tipo: 'select',
      rotulo: 'Tamanho camiseta',
      obrigatorio: true,
      opcoes: [
        { valor: 'P', rotulo: 'P' },
        { valor: 'M', rotulo: 'M' },
        { valor: 'G', rotulo: 'G' },
        { valor: 'GG', rotulo: 'GG' }
      ]
    }
  ];

  return (
    <>
      {step === 1 && (
        <Formulario
          titulo="Cadastrar Membro"
          campos={camposStep1}
          textoBotao="Próximo"
          aoEnviar={handleNext}
          etapaAtual={1}
          totalEtapas={5}
        />
      )}

      {step === 2 && (
        <Step2
          data={memberData}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setMemberData((prev) => ({ ...prev, ...data }))}
        />
      )}

{step === 3 && (
        <Step3
          data={memberData}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setMemberData((prev) => ({ ...prev, ...data }))}
        />
      )}
{step === 4 && (
        <Step4
          data={memberData}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setMemberData((prev) => ({ ...prev, ...data }))}
        />
      )}

{step === 5 && (
        <Step5
          data={memberData}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setMemberData((prev) => ({ ...prev, ...data }))}
        />
      )}

{step === 6 && (
        <Step6
          data={memberData}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setMemberData((prev) => ({ ...prev, ...data }))}
        />
      )}

      
    </>
  );
};

export default AddMember;
