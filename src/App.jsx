import './index.css'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Main from './pages/main/Main';


function NavBar() {
  const location = useLocation();
  const hideNav = ['/login', '/cadastro', '/header'].includes(location.pathname);

  if (hideNav) return null;
}

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
