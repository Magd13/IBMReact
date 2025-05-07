import { useNavigate } from "react-router-dom";
import './Sign_Up.css'

const SignUp = () => {
    const navigate = useNavigate();
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
                                href="../Login/Login.html"
                                style={{ color: "#2190FF" }}
                            >
                                Iniciar sesión
                            </a>
                        </span>
                    </div>
                    <div className="signup-form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="form-control"
                                    placeholder="Ingresa tu nombre"
                                    aria-describedby="helpId"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="form-control"
                                    placeholder="Ingresa tu número de teléfono"
                                    aria-describedby="helpId"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="form-control"
                                    placeholder="Ingresa tu correo electrónico"
                                    aria-describedby="helpId"
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
                                    aria-describedby="helpId"
                                />
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
