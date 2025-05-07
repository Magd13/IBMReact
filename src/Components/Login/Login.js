import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                                href="../SignUp/Sign_Up.html"
                                style={{ color: "#2190FF" }}
                            >
                                Regístrate
                            </a>
                        </span>
                    </div>
                    <div className="signup-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="form-control"
                                    placeholder="Ingresa tu correo electrónico"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
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
