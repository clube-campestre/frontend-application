import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';

import Section1 from './components/Section/Section1';

function NavBar() {
  const location = useLocation();
  const hideNav = ['/login', '/cadastro'].includes(location.pathname);

  if (hideNav) return null;


}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Section1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
