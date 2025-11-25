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
      console.log("Datos a enviar:", form);
      console.log("Tipo de is_completed:", typeof form.is_completed);
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
    <main className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {idToEdit ? "Editar" : "Crear"} Tarea
              </h4>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    className="form-check-input"
                    checked={form.is_completed}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_completed" className="form-check-label">
                    Marcar como completada
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-2">
                  {idToEdit ? "Actualizar Tarea" : "Guardar Tarea"}
                </button>

                {idToEdit && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={handleCancelEdit}
                  >
                    Cancelar Edición
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <h4>Mis Tareas</h4>

          {loading && <Loading />}

          {!loading && (
            <>
              {tasks.length === 0 ? (
                <p className="text-muted">Aún no tienes tareas. ¡Añade una!</p>
              ) : (
                <div className="list-group">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h5
                          className={
                            task.is_completed
                              ? "text-muted text-decoration-line-through mb-1"
                              : "mb-1"
                          }
                        >
                          {task.title}
                        </h5>
                        <p
                          className={
                            task.is_completed
                              ? "text-muted text-decoration-line-through mb-0 small"
                              : "mb-0 small"
                          }
                        >
                          {task.description}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-warning me-1"
                          onClick={() => handleSelectEdit(task)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(task.id)}
                        >
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
      </div>
    </main>
  );
};

export default Tasks;
