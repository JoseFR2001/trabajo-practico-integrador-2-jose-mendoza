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
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          José Tareas
        </Link>
        <div className="navbar-nav ms-auto">
          {authStatus === "authenticated" ? (
            <>
              <Link className="nav-link" to="/home">
                Inicio
              </Link>
              <Link className="nav-link" to="/tasks">
                Tareas
              </Link>
              <Link className="nav-link" to="/profile">
                Perfil
              </Link>
              <button
                className="btn btn-outline-light btn-sm ms-2"
                onClick={handleLogoutClick}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Iniciar sesión
              </Link>
              <Link className="nav-link" to="/register">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
