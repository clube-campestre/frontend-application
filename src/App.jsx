import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./Pages/home/Home";
import MainLayout from "./components/main-layout/MainLayout";
import Teste from "./Pages/internal-system/admin/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";
import InternalHome from "./Pages/internal-system/internal-home/InternalHome";
import AddMembro from "./pages/internal-system/admin/AddMember"
import AddEvento from "./pages/internal-system/admin/AddEvent"
import AddTransport from "./pages/internal-system/admin/AddTransport"
import AddLocate from "./pages/internal-system/admin/AddLocate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Teste />} />
          <Route path="/internal-home" element={<InternalHome />} />
          <Route path="/adicionar-membro" element={<AddMembro />} />
          <Route path="/adicionar-evento" element={<AddEvento />} />
          <Route path="/adicionar-transporte" element={<AddTransport />} />
          <Route path="/adicionar-localizacao" element={<AddLocate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
