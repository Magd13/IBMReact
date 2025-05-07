import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sign_Up.css";
import { API_URL } from "../../config";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  // --- Estado del formulario y errores ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showErr, setShowErr] = useState("");


  // --- Validación local ---
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "El número de teléfono debe tener exactamente 10 dígitos.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "El correo electrónico debe ser válido.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Envío y llamada al API ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();

      if (json.authtoken) {
        // Éxito: guardar token y datos, redirigir y recargar
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("name", name);
        navigate("/");
        window.location.reload();
      } else {
        // Mostrar errores del servidor
        if (json.errors) {
          // Array de errores de express-validator
          setShowErr(json.errors.map((err) => err.msg).join(" "));
        } else {
          setShowErr(json.error || "Error desconocido");
        }
      }
    } catch (err) {
      setShowErr("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div>
      

      <div className="container" style={{ marginTop: "5%" }}>
        <div className="signup-grid">
          <div className="signup-text">
            <h1>Registrarse</h1>
          </div>
          <div className="signup-text1" style={{ textAlign: "left" }}>
            ¿Ya eres miembro?{" "}
            <span>
              <Link to="/login" style={{ color: "#2190FF" }}>
                Iniciar sesión
              </Link>
            </span>
          </div>
          <div className="signup-form">
            <form onSubmit={handleSubmit} onReset={() => { setErrors({}); setShowErr(""); }}>
              {showErr && <div className="err" style={{ color: "red", marginBottom: "1rem" }}>{showErr}</div>}

              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={e => setName(e.target.value)}
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                />
                {errors.name && <small className="error">{errors.name}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={e => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="Ingresa tu número de teléfono"
                />
                {errors.phone && <small className="error">{errors.phone}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Ingresa tu correo electrónico"
                />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                />
                {errors.password && <small className="error">{errors.password}</small>}
              </div>

              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1">
                  Enviar
                </button>
                <button type="reset" className="btn btn-danger mb-2">
                  Restablecer
                </button>
                <button
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
