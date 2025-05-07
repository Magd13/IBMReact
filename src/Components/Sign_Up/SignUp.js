import { useNavigate } from "react-router-dom";
import './Sign_Up.css'
import React, { useState } from 'react';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            alert("Formulario enviado exitosamente.");
        }
    };
    return (
        <div>
            
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="signup-grid">
                    <div className="signup-text">
                        <h1>Registrarse</h1>
                    </div>
                    <div
                        className="signup-text1"
                        style={{ textAlign: "left" }}
                    >
                        ¿Ya eres miembro?{" "}
                        <span>
                            <a
                                href="/login"
                                style={{ color: "#2190FF" }}
                            >
                                Iniciar sesión
                            </a>
                        </span>
                    </div>
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} onReset={() => { setErrors({}); }}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ingresa tu nombre"
                                    aria-describedby="helpId"
                                />
                                {errors.name && <small className="error">{errors.name}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Ingresa tu número de teléfono"
                                    aria-describedby="helpId"
                                />
                                {errors.phone && <small className="error">{errors.phone}</small>}
                            </div>
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
                                    aria-describedby="helpId"
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
                                    aria-describedby="helpId"
                                />
                                {errors.password && <small className="error">{errors.password}</small>}
                            </div>
                            <div className="btn-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                                >
                                    Enviar
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-danger mb-2 waves-effect waves-light"
                                >
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
