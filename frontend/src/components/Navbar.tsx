import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <a href="#home" className="logo" aria-label="MediCor — strona główna">
          <img
            src="/medicor-logo.png"
            alt="MediCor — lek. Krzysztof Wronisz"
            className="logo-img"
          />
        </a>
        <ul className="nav-links">
          <li><a href="#home">Strona Główna</a></li>
          <li><a href="#services">Usługi</a></li>
          <li><a href="#doctors">Twój Kardiolog</a></li>
          {/* <li><a href="#appointments">Rezerwacja Wizyt</a></li> */}
          <li><a href="#contact">Kontakt</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
