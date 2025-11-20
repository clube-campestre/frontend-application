import React from "react";

// --- IMPORTS ORIGINAIS ---
import Logo from "../../assets/images/Logo.png";
import Maps from "../../assets/images/maps.jpg"; // Mantido caso precise de fallback
import WhatsApp from "../../assets/images/whatsapp.png";
import Facebook from "../../assets/images/facebook.png";
import Mail from "../../assets/images/email.png";
import setaScroll from "../../assets/images/setaScroll.png";
import Instagram from "../../assets/images/instagram.png";
import GoogleMaps from "../../components/google-maps/MapsApi";

const Footer = () => {
  
  // Lógica para rolar suavemente ao topo
  const scrollToTop = () => {
    const header = document.getElementById("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dados organizados para facilitar manutenção
  const developers = [
    "Ellen Caroline",
    "Moisés Silva",
    "Murillo Henrique",
    "Nathan Piazentino",
    "Ronielle Andrade",
    "Ruth Fernandes",
  ];

  const socialIcons = [
    { src: Facebook, alt: "Facebook" },
    { src: Instagram, alt: "Instagram" },
    { src: Mail, alt: "E-mail" },
    { src: WhatsApp, alt: "WhatsApp" },
  ];

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* --- GRID SYSTEM PRINCIPAL --- 
            Mobile: 1 coluna | Tablet: 2 colunas | Desktop: 4 colunas
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* 1. LOGO E MARCA */}
          <div className="flex flex-col items-start">
            <img 
              src={Logo} 
              alt="Logo Clube" 
              className="h-16 object-contain mb-4 opacity-90 hover:opacity-100 transition-opacity" 
            />
        
          </div>

          {/* 2. DESENVOLVEDORES */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-bold mb-5 uppercase tracking-wider text-sm">
              Desenvolvido por
            </h4>
            {/* Grid interno para economizar espaço vertical */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
              {developers.map((dev, index) => (
                <span 
                  key={index} 
                  className="hover:text-white transition-colors cursor-default whitespace-nowrap"
                >
                  {dev}
                </span>
              ))}
            </div>
          </div>

          {/* 3. REDES SOCIAIS */}
          <div>
            <h4 className="text-[#FCAE2D] text-lg font-bold mb-5 uppercase tracking-wider text-sm">
              Conecte-se
            </h4>
            <div className="flex gap-3 flex-wrap">
              {socialIcons.map((item, index) => (
                <div
                  key={index}
                  className="bg-white hover:bg-[#FCAE2D] transition-all duration-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer group"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-5 h-5 object-contain filter group-hover:brightness-0" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 4. ENDEREÇO E MAPA */}
          <div className="flex flex-col w-full">
            <h4 className="text-[#FCAE2D] text-lg font-bold mb-5 uppercase tracking-wider text-sm">
              Localização
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              Rua Professor Felício Cintra do Prado, 219
            </p>
            <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-700 hover:border-[#FCAE2D] transition-colors">
              <GoogleMaps />
            </div>
          </div>
        </div>

        {/* --- BARRA INFERIOR (COPYRIGHT + SCROLL) --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Clube de Desbravadores. Todos os direitos reservados.
          </p>

          <div
            onClick={scrollToTop}
            className="group flex items-center gap-3 cursor-pointer bg-gray-900 hover:bg-[#FCAE2D] px-4 py-2 rounded-full transition-all duration-300"
          >
            <span className="text-xs font-bold text-gray-300 group-hover:text-black uppercase">
              Voltar ao topo
            </span>
            <div className="bg-gray-800 group-hover:bg-black/20 rounded-full w-6 h-6 flex items-center justify-center">
               <img src={setaScroll} alt="Seta" className="w-3 h-3 filter invert group-hover:invert-0" />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;