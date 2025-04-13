import "./index.css";
import { BrowserRouter, Routes, Rout, Link } from "react-router";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./Pages/home/Home";
import MainLayout from "./components/main-layout/MainLayout";
import Teste from "./Pages/internal-system/admin/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";
import InternalHome from "./Pages/internal-system/internal-home/InternalHome";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
