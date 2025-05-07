import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import './Login.css'
import { API_URL } from "../../config";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
      if (sessionStorage.getItem('auth-token')) {
        navigate('/');
      }
    }, [navigate]);

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
        if (!email.includes("@")) {
          newErrors.email = "Correo inválido.";
        }
        if (password.length < 6) {
          newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const loginUser = async (e) => {
        e.preventDefault();
        if (!validate()) return
            try {
                const res = await fetch(`${API_URL}/api/auth/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password }),
                });
                const json = await res.json();
                if (json.authtoken) {
                  alert("Inicio de sesión exitoso");
                  sessionStorage.setItem('auth-token', json.authtoken);
                  sessionStorage.setItem('email', email);
                  navigate('/');
                  window.location.reload();
                } else {
                  if (json.errors) {
                    json.errors.forEach(err => alert(err.msg));
                  } else {
                    alert(json.error);
                  }
                }
              } catch (err) {
                alert('No se pudo conectar con el servidor.');
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
                        <form onSubmit={loginUser} onReset={() => setErrors({})}>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={email}
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
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
