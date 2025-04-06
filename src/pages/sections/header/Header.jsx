import ButtonPrimary from "../../../components/button-primary/ButtonPrimary";
import desbravadoresHome from "../../../assets/images/desbravador-home.jpg";
import Logo from "../../../assets/images/Logo.png";

const Header = () => {
  return (
    <section className="w-full h-screen relative overflow-hidden" id="header">
      <div className="absolute inset-0 z-0 clip-path-image">
  <img
    src={desbravadoresHome}
    alt="Desbravadores"
    className="w-full h-screen object-cover"
  />

<div className="absolute inset-0 bg-black/85 z-10" /> 
</div>


      <div className="relative z-20 flex justify-between items-center p-4">
        <figure>
          <img src={Logo} alt="Logo" className="h-16" />
        </figure>
        <nav className="space-x-20 text-base">
          <a href="/" className="text-white hover:text-gray-300">
            Início
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            Sobre nós
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">
            Unidades
          </a>
          <a href="/services" className="text-white hover:text-gray-300">
            Classes
          </a>
          <ButtonPrimary text="LOGIN" onClick={() => console.log("Login")} />
        </nav>
      </div>

      <article className="relative z-20 flex flex-col items-center justify-center h-[60%] w-full">
        <h1 className="text-5xl font-bold text-white mb-5 w-2/3 text-center leading-tight">
          Ser <span className="text-[#FCAE2D]">Desbravador Campestre</span>
          <br />é um chamado para servir,
          <br />amar e transformar!
        </h1>
      </article>

      <div className="absolute z-30 left-1/2 transform -translate-x-1/2 bottom-[22%]">

        <ButtonPrimary
          text="SAIBA MAIS"
          onClick={() => console.log("Saiba mais")}
        />
      </div>

      <style jsx>{`
  .clip-path-image {
    clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 96%, 0 70%);
  }
`}</style>

    </section>
  );
};

export default Header;
