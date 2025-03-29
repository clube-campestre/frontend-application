import './index.css'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';


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
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
