import React, { useState } from 'react'
import './Login.css';
import { FaEye, FaEyeSlash, FaEnvelope} from 'react-icons/fa';
import anelImagem1 from '../../images/anel1-login-cadastro.png'
import Logo from '../../images/Logo.png'
import anelImagem2 from '../../images/anel2-login-cadastro.png'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='login-container'>


    <div className="login-image">
      <div className="img1">
    <img src={anelImagem1} alt="" /></div>
    <div className="info-login">
      <h1>Desbravadores Campestre</h1>

      <h5>Coragem para explorar, fé para seguir e serviço para transformar!</h5>

      <img src={Logo} alt="" />
    </div>
    <div className="img2">
      <img src={anelImagem2} alt="" />
    </div>
    </div>

      <form className='login-form' action="submit">
        <h1 className='login-title'>Bem-Vindo!</h1>
        <div className='input-container'>
          <input type="email" placeholder='Insira seu e-mail' className='login-input' />
          <FaEnvelope className='input-icon' />
        </div>
        <div className='input-container'> 
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder='Insira sua senha' 
            className='login-input'
          />
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            style={{cursor: 'pointer'}}
            className='input-icon'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type='submit' className='login-button'>Entrar</button>

{/* 
        <div className="recall-forget">
          <label className='remember-label'>
            <input type="checkbox" className='remember-checkbox' />
            Lembrar-me
          </label>
          <a href="/recuperar-senha" className='forgot-password'>Esqueceu sua senha?</a>
        </div> */}
        
        <p className='signup-text'>
          Não tem uma conta? <a href="/cadastro" className='signup-link'>Cadastre-se</a>
        </p>
      </form>
    </div>
  )
}

export default Login

