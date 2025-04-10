import "./index.css";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./Pages/home/Home";
import MainLayout from "./components/main-layout/MainLayout";
import Teste from "./pages/admin/Admin";
import ProtectedRoute from "./utils/ProtectedRoute";

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
          <Route path="/testes" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
