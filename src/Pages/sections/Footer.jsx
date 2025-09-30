import Logo from "../../assets/images/Logo.png";
import WhatsApp from "../../assets/images/whatsapp.png";
import Facebook from "../../assets/images/facebook.png";
import Mail from "../../assets/images/email.png";
import setaScroll from "../../assets/images/setaScroll.png";
import Instagram from "../../assets/images/instagram.png";
import GoogleMaps from "../../components/google-maps/MapsApi";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-between md:items-start">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <img src={Logo} alt="Logo" className="h-12 sm:h-14 md:h-16" />
        </div>

        {/* Desenvolvedores */}
        <div className="flex-shrink-0 text-center md:text-left">
          <h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">Desenvolvido por:</h4>
          <p>Ellen Caroline</p>
          <p>Moisés Silva</p>
          <p>Murillo Henrique</p>
          <p>Nathan Piazentino</p>
          <p>Ronielle Andrade</p>
          <p>Ruth Fernandes</p>
        </div>

        {/* Páginas */}
        <div className="flex-shrink-0 text-center md:text-left">
          <h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">Páginas:</h4>
          <div className="flex flex-col gap-1">
            <a href="#header" className="hover:text-[#FCAE2D] transition-colors">Início</a>
            <a href="#about-us" className="hover:text-[#FCAE2D] transition-colors">Sobre nós</a>
            <a href="#unities" className="hover:text-[#FCAE2D] transition-colors">Unidades</a>
            <a href="#classes" className="hover:text-[#FCAE2D] transition-colors">Classes</a>
          </div>
        </div>

        {/* Redes sociais */}
        <div className="flex-shrink-0 text-center md:text-left">
          <h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">Redes sociais:</h4>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-3 justify-center md:justify-start">
            {[Facebook, Instagram, Mail, WhatsApp].map((icon, index) => (
              <div
                key={index}
                className="bg-white rounded-full p-2 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10"
              >
                <img src={icon} alt="Social" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Endereço e mapa */}
        <div className="flex-shrink-0 w-full md:w-auto text-center md:text-left">
          <h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">Endereço:</h4>
          <p className="mb-2">Rua Professor Felício Cintra do Prado, 219</p>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-xs h-40 sm:h-48 md:h-40 mx-auto md:mx-0">
            <GoogleMaps />
          </div>
        </div>

        {/* Scroll topo */}
        <div className="flex-shrink-0 flex justify-center md:justify-start mt-4 md:mt-0">
          <div
            className="bg-[#FCAE2D] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
              const header = document.getElementById("header");
              if (header) header.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img src={setaScroll} alt="Voltar ao topo" className="w-4 h-4" />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
