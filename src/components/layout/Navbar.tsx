import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../constants/data';
import './Navbar.css';

export function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
        <div className="container navbar__inner">

          <a href="#inicio" className="navbar__logo" aria-label="Oriente – inicio" onClick={closeMenu}>
            <img src="/oriente_titulo.png" alt="Oriente" className="navbar__logo-img" />
            <span className="navbar__logo-sub">El camino del bienestar</span>
          </a>

          <nav className="navbar__nav" aria-label="Navegación principal">
            <div className="navbar__logo-divider" aria-hidden="true" />
            <ul className="navbar__links">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="navbar__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__actions">
            <button
              className={`navbar__hamburger${isOpen ? ' is-open' : ''}`}
              onClick={() => setIsOpen(prev => !prev)}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay que bloquea el contenido detrás */}
      {isOpen && (
        <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* Menú móvil */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile${isOpen ? ' is-open' : ''}`}
        aria-label="Menú móvil"
        aria-hidden={!isOpen}
      >
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} style={{ '--i': i } as React.CSSProperties}>
              <a href={link.href} className="navbar__mobile-link" onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="navbar__mobile-ornament">El camino del bienestar</p>
      </nav>
    </>
  );
}