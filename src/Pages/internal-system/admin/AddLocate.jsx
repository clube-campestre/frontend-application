import FormularioCadastro from '../../../components/admin-internal/FormRegister';

const camposLocal = [
  { id: 'local', tipo: 'texto', rotulo: 'Local', obrigatorio: true },
  { id: 'endereco', tipo: 'texto', rotulo: 'Endereço', obrigatorio: true },
  { id: 'cotacao', tipo: 'numero', rotulo: 'Cotação', obrigatorio: true },
  { id: 'capacidade', tipo: 'numero', rotulo: 'Capacidade', obrigatorio: true },
  { id: 'telefone', tipo: 'texto', rotulo: 'Telefone', obrigatorio: true },
  { id: 'whatsapp', tipo: 'texto', rotulo: 'WhatsApp', obrigatorio: false }
];

const AdicionarLocal = ({ aoEnviar }) => {
  return (
    <FormularioCadastro
      tituloFormulario="Cadastrar Local"
      campos={camposLocal}
      aoEnviar={aoEnviar}
    />
  );
};

export default AdicionarLocal;
