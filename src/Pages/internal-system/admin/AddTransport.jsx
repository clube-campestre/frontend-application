import FormularioCadastro from '../../../components/admin-internal/FormRegister';

const camposTransporte = [
  { id: 'titulo', tipo: 'texto', rotulo: 'Título', obrigatorio: true },
  { id: 'cotacao', tipo: 'numero', rotulo: 'Cotação', obrigatorio: true },
  { id: 'distanciaHistorica', tipo: 'numero', rotulo: 'Distância Histórica', obrigatorio: true },
  { id: 'capacidade', tipo: 'numero', rotulo: 'Capacidade', obrigatorio: true },
  { id: 'telefone', tipo: 'texto', rotulo: 'Telefone', obrigatorio: true },
  { id: 'whatsapp', tipo: 'texto', rotulo: 'WhatsApp', obrigatorio: false }
];

const AdicionarTransporte = ({ aoEnviar }) => {
  return (
    <FormularioCadastro
      tituloFormulario="Cadastrar Transporte"
      campos={camposTransporte}
      aoEnviar={aoEnviar}
    />
  );
};

export default AdicionarTransporte;
