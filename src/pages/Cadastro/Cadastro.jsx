import React, { useState } from 'react'
import './Cadastro.css';
import { FaEye, FaEyeSlash, FaEnvelope} from 'react-icons/fa';
import anelImagem1 from '../../images/anel1-login-cadastro.png'
import Logo from '../../images/Logo.png'
import anelImagem2 from '../../images/anel2-login-cadastro.png'
import AlertaFlutuante from '../../utils/alerts/AlertaFlutuante.jsx';
import { validateEmail, validatePassword, validateConfirmPassword } from '../../utils/validations/cadastroValidation';
import { showTemporaryAlert } from '../../utils/alerts/alertaUtils';

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessages, setAlertMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = [];
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    
    if (emailError) errors.push(emailError);
    if (passwordError) errors.push(passwordError);
    if (confirmPasswordError) errors.push(confirmPasswordError);
    
    if (errors.length > 0) {
      setAlertMessages(errors);
      showTemporaryAlert(setShowAlert);
    }
  };

  return (
    <div className='cadastro-container'>
      {showAlert && (
        <AlertaFlutuante 
          messages={alertMessages}
          onClose={() => setShowAlert(false)}
          type="error"
        />
      )}

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

      <form className='cadastro-form' onSubmit={handleSubmit}>
        <h1 className='cadastro-title'>Criar Conta</h1>
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

export default Cadastro

