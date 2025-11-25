import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";

const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error al obtener perfil, cerrando sesión");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <main>
      <section>
        {loading && <Loading />}

        <div>
          <div>{userData?.name}</div>
          <h1>
            {userData?.name
              ? `${userData.name} ${userData.lastname}`
              : "Mi Perfil"}
          </h1>
          <p>Información personal</p>
        </div>

        <hr />

        {!loading && userData && (
          <div>
            <div>
              <span>ID de Usuario</span>
              <p>{userData.id}</p>
            </div>
            <div>
              <span>Nombre</span>
              <p>{userData.name}</p>
            </div>
            <div>
              <span>Apellido</span>
              <p>{userData.lastname}</p>
            </div>

            {/* Botón Logout */}
            <button onClick={handleLogoutClick}>Cerrar Sesión</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
