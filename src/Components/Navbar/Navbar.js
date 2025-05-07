import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const handleClick = () => {
        console.log("Navigation icon clicked!");
      };
    return (
        <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            StayHealthy
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: "#3685fb" }}>
              <title>Icono SVG de Doctor Con Estetoscopio</title>
              <g>
                <g>
                  <path d="..."></path>
                </g>
              </g>
            </svg>
          </Link>
          <span>.</span>
        </div>
        <div className="nav__icon" onClick={handleClick}>
          <i className="fa fa-times fa fa-bars"></i>
        </div>

        <ul className="nav__links active">
          <li className="link">
            <Link to="/">Inicio</Link>
          </li>
          <li className="link">
            <Link to="/citas">Citas</Link>
          </li>
          <li className="link">
            <Link to="/signup">
              <button className="btn1">Registrarse</button>
            </Link>
          </li>
          <li className="link">
            <Link to="/login">
              <button className="btn1">Iniciar Sesión</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    )
}

export default Navbar