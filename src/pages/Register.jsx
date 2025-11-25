import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../hooks/useForm";
import Loading from "../components/Loading";

const Register = () => {
  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
        navigate("/login");
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
    <main className="container mt-5">
      {loading && <Loading />}

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Crear cuenta</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Usuario
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    value={form.username}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="firstname" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="form-control"
                      value={form.firstname}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="lastname" className="form-label">
                      Apellido
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="form-control"
                      value={form.lastname}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="dni" className="form-label">
                    DNI
                  </label>
                  <input
                    id="dni"
                    name="dni"
                    type="text"
                    className="form-control"
                    value={form.dni}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {loading ? "Registrando..." : "Registrarse"}
                </button>
              </form>

              <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesion</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
