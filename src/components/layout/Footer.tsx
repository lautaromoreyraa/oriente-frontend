import { NAV_LINKS, CONTACT } from '../../constants/data';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#inicio" className="footer__logo" aria-label="Oriente – volver al inicio">
            <img src="/oriente_titulo.png" alt="Oriente" className="footer__logo-img" />
          </a>
          <p className="footer__tagline">El camino del bienestar</p>
          <div className="ornament footer__ornament">✦</div>
        </div>

        {/* Nav */}
        <nav className="footer__nav" aria-label="Navegación del pie de página">
          <p className="footer__nav-title">Secciones</p>
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a href={link.href} className="footer__nav-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer__contact">
          <p className="footer__nav-title">Contacto</p>
          <ul>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__nav-link">
                @{CONTACT.instagram}
              </a>
            </li>
            <li>
              <span className="footer__nav-link footer__address">{CONTACT.address}</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            &copy; {year} Oriente · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}