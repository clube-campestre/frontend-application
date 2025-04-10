import './index.css'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './Pages/home/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
