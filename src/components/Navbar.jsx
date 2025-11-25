import { Link } from "react-router";

const Navbar = ({ authStatus, onLogout }) => {
  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <nav>
      <div>
        {/* Logo */}
        <h1>José Tareas</h1>

        {/* Links */}
        <div>
          {authStatus === "authenticated" ? (
            <>
              <Link to="/home">Inicio</Link>
              <Link to="/tasks">Tareas</Link>
              <Link to="/profile">Perfil</Link>
              <button onClick={handleLogoutClick}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar sesión</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
