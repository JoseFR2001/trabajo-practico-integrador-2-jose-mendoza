import { useState, useEffect } from "react";
import { Link } from "react-router";
import Loading from "../components/Loading";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const homeData = async () => {
    try {
      const getProfile = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      if (getProfile.ok) {
        const profileData = await getProfile.json();
        setUserData(profileData.user);
      } else {
        console.error("Error al cargar el perfil");
      }

      const getTasks = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (getTasks.ok) {
        const tasksData = await getTasks.json();
        console.log(tasksData);
        setTasks(tasksData);
      } else {
        console.error("Error al cargar las tareas");
      }
    } catch (error) {
      console.error("Error en las peticiones de Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    homeData();
  }, []);

  // Calculos de estadisticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <main className="container mt-5">
        <Loading />
      </main>
    );
  }

  return (
    <main className="container mt-5">
      <h1 className="mb-4">
        Bienvenido,{" "}
        <span className="text-primary">{userData?.name || "Usuario"}</span>
      </h1>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">{totalTasks}</h3>
              <p className="card-text">Total de Tareas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title text-success">{completedTasks}</h3>
              <p className="card-text">Completadas</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title text-warning">{pendingTasks}</h3>
              <p className="card-text">Pendientes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link to="/tasks" className="btn btn-primary">
          Ir a mis Tareas
        </Link>
      </div>
    </main>
  );
};

export default Home;
