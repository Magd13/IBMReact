import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handleClick = () => setClick(!click);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('reviewFormData_')) {
        localStorage.removeItem(key);
      }
    });
    setIsLoggedIn(false);
    setEmail("");
    setUsername("");
    window.location.reload();
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      const namePart = storedEmail.split('@')[0];
      setUsername(namePart);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{ color: '#2190FF' }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
      </div>

      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Inicio</Link>
        </li>
        <li className="link">
          <Link to="/citas">Citas</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        <li className="link">
          <Link to="/booking">Book App</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li className="link user-menu" ref={ref}>
              <span className="nav__user"  onClick={() => setOpen(!open)}>
                Hola, {username}<span className="arrow">{open ? '▲' : '▼'}</span>
              </span>
              {open && (
                <ul className="menu-dropdown">
                  <li onClick={() => { setOpen(false) }}>
                    <Link to='/profile'>Tu Perfil</Link>
                  </li>
                  <li onClick={() => { setOpen(false) }}>
                    <Link to='/reports'>Tus Reportes</Link>
                  </li>
                  <li onClick={() => { setOpen(false); handleLogout(); }}>Cerrar Sesión</li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <>
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
            <li className="link">
              <Link to="/instant-consultation">
                <button className="btn1">Consulta Instantanea</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
