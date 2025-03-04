import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Header/Header.css';
import logo from './Logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header>
      <div className="separation-img">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Unidades</li>
          <li>Classes</li>
          <button className='login-header' onClick={handleLoginClick}>LOGIN</button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
