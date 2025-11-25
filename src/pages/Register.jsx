import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const Register = ({ onLoginSuccess }) => {
  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.firstname,
      lastname: form.lastname,
      username: form.username,
      email: form.email,
      password: form.password,
      dni: form.dni,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {loading && <Loading />}
      <div>
        <h2>Crear cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div>
            <div>
              <label htmlFor="firstname">Nombre</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
            <div>
              <label htmlFor="lastname">Apellido</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="dni">DNI</label>
            <input
              id="dni"
              name="dni"
              type="text"
              value={form.dni}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button type="submit">
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesion</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
