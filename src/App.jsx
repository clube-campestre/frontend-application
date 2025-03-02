import './App.css';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import './App.css';
import Header  from './components/Header/Header';

function NavBar() {
  const location = useLocation();
  const hideNav = ['/login', '/cadastro', '/header'].includes(location.pathname);
  
  if (hideNav) return null;
  
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/cadastro">Cadastro</Link>
      <Link to="/header">Header</Link>
    </nav>
  );
}

function App() {
  return (
   <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
   </Router>
 )
}

export default App;
