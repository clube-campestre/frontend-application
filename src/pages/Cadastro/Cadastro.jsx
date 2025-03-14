import React, { useState } from 'react'
import './Cadastro.css';
import { FaEye, FaEyeSlash, FaEnvelope, FaUser} from 'react-icons/fa';
import anelImagem1 from '../../images/anel1-login-cadastro.png'
import Logo from '../../images/Logo.png'
import anelImagem2 from '../../images/anel2-login-cadastro.png'
import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validations/cadastroValidation';
import { registerService } from '../../services/userService';
import Swal from 'sweetalert2'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const register = await registerService(name, email, password, confirmPassword);
    
    if (register) {
      let timerInterval;
      Swal.fire({
        title: `Cadastro efetuado com sucesso!`,
        html: "Você será redirecionado para tela de login em <b></b> millisegundos.",
        timer: 2500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/login';
        }
      });
    }
  };

  return (
    <div className='cadastro-container'>

      <div className="cadastro-image">
        <div className="img1">
          <img src={anelImagem1} alt="" />
        </div>
        <div className="info-cadastro">
          <h1>Desbravadores Campestre</h1>
          <h5>Junta-se a essa grande aventura!</h5>
          <img src={Logo} alt="" />
        </div>
        <div className="img2">
          <img src={anelImagem2} alt="" />
        </div>
      </div>

      <form className='cadastro-form' onSubmit={handleRegister}>
        <h1 className='cadastro-title'>Criar Conta</h1>
        <div className='input-container'>
          <input 
            type="text" 
            placeholder='Insira seu nome' 
            className='cadastro-input'
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
          <FaUser className='input-icon' />
        </div>
        <div className='input-container'>
          <input 
            type="email" 
            placeholder='Insira seu e-mail' 
            className='cadastro-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <FaEnvelope className='input-icon' />
        </div>
        <div className='input-container'> 
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder='Insira sua senha' 
            className='cadastro-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            style={{cursor: 'pointer'}}
            className='input-icon'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className='input-container'> 
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder='Confirme sua senha' 
            className='cadastro-input'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            style={{cursor: 'pointer'}}
            className='input-icon'
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type='submit' className='cadastro-button'>Cadastrar</button>
        
        <p className='signin-text'>
          Já tem uma conta? <a href="/login" className='signin-link'>Faça login</a>
        </p>
      </form>
    </div>
  )
}

export default Register

