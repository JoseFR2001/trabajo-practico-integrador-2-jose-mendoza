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
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main>
      <div>
        <h1>
          Bienvenido, <span>{userData?.name || "Usuario"}</span>
        </h1>

        <div>
          <div>
            <h3>{totalTasks}</h3>
            <p>Total de Tareas</p>
          </div>

          <div>
            <h3>{completedTasks}</h3>
            <p>Completadas</p>
          </div>

          <div>
            <h3>{pendingTasks}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div>
          <Link to="/tasks">Ir a mis Tareas</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
