import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Login from './pages/Login/Login';

import Section1 from './components/Section/Section1';

function NavBar() {
  const location = useLocation();
  const hideNav = ['/login', '/cadastro'].includes(location.pathname);

  if (hideNav) return null;


}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Section1 />} />
      </Routes>
    </Router>
  );
}

export default App;
