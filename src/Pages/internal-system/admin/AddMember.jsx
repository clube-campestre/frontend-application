import React from 'react';
import Formulario from '../../../components/admin-internal/FormMember';

const AddMember = () => {
  const camposMembro = [
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

  const handleEnvioMembro = (dados) => {
    console.log('Dados do membro:', dados);
  };

  return (
    <Formulario
      titulo="Cadastrar Membro"
      campos={camposMembro}
      textoBotao="Próximo"
      aoEnviar={handleEnvioMembro}
      etapaAtual={1}
      totalEtapas={5}
    />
  );
};

export default AddMember;