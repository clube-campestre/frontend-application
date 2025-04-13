import Header from "../sections/header/header.jsx";
import Footer from "../sections/Footer.jsx"
import AboutUs from "../sections/about-us/AboutUs.jsx"
import Unities from "../sections/unities/Unities.jsx"
import OurClassesA from "../sections/our-classses/OurClasses.jsx"
import Sidebar from "../../components/side-bar/SideBar.jsx";

const Home = () => {
    return (
        <>
        <Header/>
        <AboutUs/>
        <Unities/>
        <OurClassesA></OurClassesA>
        <Footer/>
        </>
    );
}

export default Home;