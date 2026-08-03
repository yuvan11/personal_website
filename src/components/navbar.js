import React, { useState, useEffect, useCallback } from 'react';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);

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
          <a className="navbar-brand" href="#home">
            <span>YR</span>
          </a>
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
                <a className="page-scroll" href="#home">Home</a>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <a className="page-scroll" href="#about">About</a>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <a className="page-scroll" href="#work">Portfolio</a>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <a className="page-scroll" href="#oss">OSS</a>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <a className="page-scroll" href="#swags">Swags</a>
              </li>
              <li className="nav-item" onClick={handleNavClick}>
                <a className="page-scroll" href="#blog">Blog</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;