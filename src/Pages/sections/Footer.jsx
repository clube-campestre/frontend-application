import React from 'react'; // Adicionado para clareza
import Logo from "../../assets/images/Logo.png";
// import Maps from "../../assets/images/maps.jpg"; // Não estava sendo usado
import WhatsApp from "../../assets/images/whatsapp.png";
import Facebook from "../../assets/images/facebook.png";
import Mail from "../../assets/images/email.png";
import setaScroll from "../../assets/images/setaScroll.png";
import Instagram from "../../assets/images/instagram.png";
import GoogleMaps from "../../components/google-maps/MapsApi";

// Dados para facilitar a manutenção
const socialLinks = [
  { icon: Facebook, alt: "Facebook", href: "#" },
  { icon: Instagram, alt: "Instagram", href: "#" },
  { icon: Mail, alt: "Email", href: "#" },
  { icon: WhatsApp, alt: "WhatsApp", href: "#" },
];

const developers = [
  "Ellen Caroline",
  "Moisés Silva",
  "Murillo Henrique",
  "Nathan Piazentino",
  "Ronielle Andrade",
  "Ruth Fernandes",
];

const pageLinks = [
  { href: "#header", text: "Início" },
  { href: "#about-us", text: "Sobre nós" },
  { href: "#unities", text: "Unidades" },
  { href: "#classes", text: "Classes" },
];

const Footer = () => {
  const scrollToTop = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-12 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Seção 1: Logo e Botão de Voltar ao Topo */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <img src={Logo} alt="Logo" className="h-16" />
          <div
            className="bg-[#FCAE2D] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors"
            onClick={scrollToTop}
          >
            <img src={setaScroll} alt="Voltar ao topo" className="w-4 h-4" />
          </div>
        </div>

        {/* Separador */}
        <hr className="my-8 border-gray-700" />

        {/* Seção 2: Grid de Conteúdo (Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
        
          {/* Coluna 1: Páginas */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-semibold mb-4">
              Páginas
            </h4>
            <div className="flex flex-col gap-2">
              {pageLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-gray-300 transition-colors">
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Redes Sociais */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-semibold mb-4">
              Redes sociais
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-full p-2 flex items-center justify-center w-10 h-10 hover:scale-110 transition-transform"
                >
                  <img src={social.icon} alt={social.alt} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 3: Endereço */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-semibold mb-4">
              Endereço
            </h4>
            <p className="mb-4 text-gray-300">Rua Professor Felício Cintra do Prado, 219</p>
            <div className="w-full h-32 rounded-lg overflow-hidden">
              <GoogleMaps />
            </div>
          </div>

          {/* Coluna 4: Desenvolvido por */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-semibold mb-4">
              Desenvolvido por
            </h4>
            <div className="flex flex-col gap-1 text-gray-300">
              {developers.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>

        </div>

        {/* Seção 3: Copyright */}
        <div className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-700">
          © {new Date().getFullYear()} Clube de Desbravadores. Todos os direitos reservados.
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;