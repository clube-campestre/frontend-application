import { useState } from "react"
import "./Login.css"
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa"
import anelImagem1 from "../../images/anel1-login-cadastro.png"
import Logo from "../../images/Logo.png"
import anelImagem2 from "../../images/anel2-login-cadastro.png"
import { loginService } from "../../services/authService"
import Swal from 'sweetalert2'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await loginService(email, password)
      if(user) {
        Swal.fire({
          title: "Login efetuado com sucesso!",
          text: `Seja bem-vindo de volta ${user.name}!`,
          icon: "success",
        });
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-image">
        <div className="img1">
          <img src={anelImagem1 || "/placeholder.svg"} alt="" />
        </div>
        <div className="info-login">
          <h1>Desbravadores Campestre</h1>
          <h5>Coragem para explorar, fé para seguir e serviço para transformar!</h5>
          <img src={Logo || "/placeholder.svg"} alt="" />
        </div>
        <div className="img2">
          <img src={anelImagem2 || "/placeholder.svg"} alt="" />
        </div>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Bem-Vindo!</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-container">
          <input
            type="email"
            placeholder="Insira seu e-mail"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="input-icon" />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Insira sua senha"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }} className="input-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="signup-text">
          Não tem uma conta?{" "}
          <a href="/cadastro" className="signup-link">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login

