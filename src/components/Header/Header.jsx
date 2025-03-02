import React from 'react' 
import '../Header/Header.css'
import logo from './Logo.png'
const Header = () => {
return (

<header>

    <div className="separation-img">
    <img src={logo} alt="" />
    <ul>


    <li>Unidades</li>
    <li>Classes</li>
    <button className='login-header'>LOGIN</button>

    </ul></div>

</header>

)
}

export default Header
