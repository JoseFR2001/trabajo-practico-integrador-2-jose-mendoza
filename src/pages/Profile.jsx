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
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {loading && <Loading />}

              <div className="text-center mb-3">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center"
                  style={{ width: "60px", height: "60px", fontSize: "24px" }}
                >
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
                </div>
                <h4 className="mt-2">
                  {userData?.name
                    ? `${userData.name} ${userData.lastname}`
                    : "Mi Perfil"}
                </h4>
                <p className="text-muted">Información personal</p>
              </div>

              <hr />

              {!loading && userData && (
                <div>
                  <div className="mb-2">
                    <strong>ID de Usuario:</strong> {userData.id}
                  </div>
                  <div className="mb-2">
                    <strong>Nombre:</strong> {userData.name}
                  </div>
                  <div className="mb-3">
                    <strong>Apellido:</strong> {userData.lastname}
                  </div>

                  <button
                    className="btn btn-danger w-100"
                    onClick={handleLogoutClick}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
