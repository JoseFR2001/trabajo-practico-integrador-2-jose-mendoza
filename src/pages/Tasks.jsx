import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import useForm from "../hooks/useForm";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { form, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idToEdit, setIdToEdit] = useState(null);

  const fetchTasks = async () => {
    if (tasks.length === 0) {
      setLoading(true);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error al obtener las tareas");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdToEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCancelEdit = () => {
    setIdToEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!form.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("¡Tarea creada exitosamente!");
        handleReset();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al crear la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear la tarea");
    }
  };

  const handleUpdateTask = async () => {
    if (!form.title) {
      alert("El título es obligatorio");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("¡Tarea actualizada exitosamente!");
        handleCancelEdit();
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al actualizar la tarea");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        alert("Tarea eliminada exitosamente");
        fetchTasks();
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar la tarea");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al eliminar la tarea");
    }
  };

  return (
    <main>
      <div>
        <section>
          <h2>{idToEdit ? "Editar" : "Crear"} Tarea</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            <div>
              <input
                type="checkbox"
                id="is_completed"
                name="is_completed"
                checked={form.is_completed}
                onChange={handleChange}
              />
              <label htmlFor="is_completed">Marcar como completada</label>
            </div>

            <button type="submit">
              {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
            </button>

            {idToEdit && (
              <button type="button" onClick={handleCancelEdit}>
                Cancelar Edición
              </button>
            )}
          </form>
        </section>

        <section>
          <h2>Mis Tareas</h2>

          <div>
            {loading && <Loading />}

            {!loading && (
              <>
                {tasks.length === 0 ? (
                  <p>Aún no tienes tareas. ¡Añade una!</p>
                ) : (
                  <div>
                    {tasks.map((task) => (
                      <div key={task.id}>
                        <div>
                          <h3
                            style={{
                              textDecoration: task.is_completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.title}
                          </h3>
                          <p
                            style={{
                              textDecoration: task.is_completed
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {task.description}
                          </p>
                        </div>
                        <div>
                          <button onClick={() => handleSelectEdit(task)}>
                            Editar
                          </button>
                          <button onClick={() => handleDelete(task.id)}>
                            Borrar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Tasks;
