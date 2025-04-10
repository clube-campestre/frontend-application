import Logo from "../../assets/images/Logo.png";
import Maps from "../../assets/images/maps.jpg";
import WhatsApp from "../../assets/images/whatsapp.png";
import Facebook from "../../assets/images/facebook.png";
import Mail from "../../assets/images/email.png";
import setaScroll from "../../assets/images/setaScroll.png";
import Instagram from "../../assets/images/instagram.png";

const Footer = () => {
	return (
		<footer className="bg-black text-white py-10 px-8">
			<div className="flex flex-wrap gap-[5vw] justify-between items-start">
				<div>
					<img src={Logo} alt="Logo" className="h-16 mb-4" />
				</div>

				<div>
					<h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">
						Desenvolvido por:
					</h4>
					<p>Ellen Caroline</p>
					<p>Moisés Silva</p>
					<p>Murillo Henrique</p>
					<p>Nathan Piazentino</p>
					<p>Ronielle Andrade</p>
					<p>Ruth Fernandes</p>
				</div>

				<div className="flex flex-col">
					<h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">
						Páginas:
					</h4>
					<a href="#header">Início</a>
					<a href="#about-us">Sobre nós</a>
					<a href="#unities">Unidades</a>
					<a href="#classes">Classes</a>
				</div>

				<div>
					<h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">
						Redes sociais:
					</h4>
					<div className="grid grid-cols-2 gap-3">
						{[Facebook, Instagram, Mail, WhatsApp].map((icon, index) => (
							<div
								key={index}
								className="bg-white rounded-full p-2 flex items-center justify-center w-10 h-10"
							>
								<img
									src={icon}
									alt="Social"
									className="w-5 h-5"
								/>
							</div>
						))}
					</div>
				</div>

				<div>
					<h4 className="text-[#FCAE2D] text-lg font-semibold mb-2">
						Endereço:
					</h4>
					<p className="mb-2">
						Rua Desbravadores Campestres Unidos, 342
					</p>
					<img
						src={Maps}
						alt="Mapa"
						className="w-full max-w-xs h-32 object-cover rounded-md"
					/>
				</div>

				<div>
					<div
						className="bg-[#FCAE2D] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
						onClick={() => {
							const header = document.getElementById("header");

							if (header) {
								header.scrollIntoView({ behavior: "smooth" });
							}
						}}
					>
						<img
							src={setaScroll}
							alt="Voltar ao topo"
							className="w-4 h-4"
						/>
					</div>
				</div>
			</div>
		</footer>
	);

export default Footer;
