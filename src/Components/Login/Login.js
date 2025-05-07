import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
      const [errors, setErrors] = useState({});
    
      const handleChange = e => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
      };
    
      const validate = () => {
        const newErrors = {};
        if (!formData.email.includes("@")) {
          newErrors.email = "Correo inválido.";
        }
        if (formData.password.length < 6) {
          newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
          alert("Inicio de sesión exitoso");
          // llamar tu API o redirigir...
        }
      };
    return (
        <div>
            
            <div className="container">
                <div className="signup-grid">
                    <div className="signup-text">
                        <h1>Inicio de Sesión</h1>
                    </div>
                    <div
                        className="signup-text1"
                        style={{ textAlign: "left" }}
                    >
                        ¿No tienes una cuenta?{" "}
                        <span>
                            <a
                                href="/signup"
                                style={{ color: "#2190FF" }}
                            >
                                Regístrate
                            </a>
                        </span>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} onReset={() => setErrors({})}>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ingresa tu contraseña"
                                />
                                <span
                                    className="password-visibility"
                                    onClick={() => togglePasswordVisibility()}
                                    style={{ cursor: "pointer" }}
                                >
                                    👁️
                                </span>
                                {errors.password && <small className="error">{errors.password}</small>}
                            </div>
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">
                                    Iniciar Sesión
                                </button>
                                <button type="reset" className="btn btn-danger">
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

export default Login;
