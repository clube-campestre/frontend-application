import Header from "../sections/header/header.jsx";
import Footer from "../sections/Footer.jsx"
import AboutUs from "../sections/about-us/AboutUs.jsx"
import Unities from "../sections/unities/Unities.jsx"
import Sidebar from "../../components/side-bar/SideBar.jsx";

const Home = () => {
    return (
        <>
        <Header/>
        <AboutUs/>
        <Unities/>
        <Footer/>
        </>
    );
}

export default Home;