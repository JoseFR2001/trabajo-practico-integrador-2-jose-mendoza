import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const Login = ({ onLoginSuccess }) => {
  const { form, handleChange } = useForm({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        alert(data.message || "Credenciales inválidas");
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
      {/* Loading */}
      {loading && <Loading />}

      <div>
        {/* Encabezado */}
        <h2>Bienvenido</h2>
        <p>Inicia sesión para continuar</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>

        {/* Registro */}
        <p>
          ¿No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
