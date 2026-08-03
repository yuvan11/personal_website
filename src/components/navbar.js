import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = () => {
    setIsNavCollapsed(true);
  };

  return (
    <div className={`navigation fixed-top${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <span>YR</span>
          </Link>
          <button
            className="custom-toggler"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={!isNavCollapsed}
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`navbar-collapse${isNavCollapsed ? ' collapse' : ' show'}`} id="navbars">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" onClick={handleNavClick}>
                {isHome ? <a className="page-scroll" href="#home">Home</a> : <Link to="/">Home</Link>}
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                {isHome ? <a className="page-scroll" href="#work">Portfolio</a> : <Link to="/#work">Portfolio</Link>}
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                {isHome ? <a className="page-scroll" href="#oss">OSS</a> : <Link to="/#oss">OSS</Link>}
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                {isHome ? <a className="page-scroll" href="#swags">Swags</a> : <Link to="/#swags">Swags</Link>}
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                {isHome ? <a className="page-scroll" href="#blog">Blog</a> : <Link to="/#blog">Blog</Link>}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;