import { Navigate, Route, Routes } from "react-router";
import Footer from "../components/Footer";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";

const AppRouter = ({ authStatus, onLogin, onLogout }) => {
  return (
    <Routes>
      {/* Rutas Publicas */}
      <Route element={<PublicRoute authStatus={authStatus} />}>
        <Route path="/login" element={<Login onLoginSuccess={onLogin} />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rutas Privadas */}
      <Route element={<PrivateRoute authStatus={authStatus} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile onLogout={onLogout} />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      {/* Redireccion por defecto */}
      <Route
        path="*"
        element={
          <Navigate to={authStatus === "authenticated" ? "/home" : "/login"} />
        }
      />
    </Routes>
  );
};

export default AppRouter;
