import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Login from "./Pages/Login/Login";
import Home from "./Pages/home/Home";
import MainLayout from "./components/main-layout/MainLayout";
import Admin from "./pages/internal-system/admin/Admin"
import ProtectedRoute from "./utils/ProtectedRoute";
import InternalHome from "./Pages/internal-system/internal-home/InternalHome";
import AddMembro from "./pages/internal-system/admin/AddMember"
import AddEvento from "./pages/internal-system/admin/AddEvent"
import AddTransport from "./Pages/internal-system/admin/AddTransport"
import AddPlace from "./Pages/internal-system/admin/AddPlace"
import Statement from "./Pages/internal-system/statement/Statement";
import Classes from "./Pages/internal-system/classe/Classes";
import Configurations from "./Pages/internal-system/configurations/Configurations";
import UserManagement from "./pages/internal-system/configurations/UserManagement";
import Calendar from "./pages/internal-system/admin/Calendar";
import Unities from "./Pages/internal-system/unities/Unities";
import SecretaryPage from "./Pages/internal-system/secretary/SecretaryPage";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/internal-home" element={<InternalHome />} />
          <Route path="/add-member" element={<AddMembro />} />
          <Route path="/add-event" element={<AddEvento />} />
          <Route path="/add-transport" element={<AddTransport />} />
          <Route path="/add-place" element={<AddPlace />} />
          <Route path="/unities" element={<Unities />} />
          <Route path="/secretaria" element={<SecretaryPage />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/statement" element={<Statement />} />
          <Route path='/configurations' element={<Configurations/>} />
          <Route path="/user-management" element={<UserManagement/>} />
          <Route path="/events" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
