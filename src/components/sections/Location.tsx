import { useReveal }     from '../../hooks/useReveal';
import { SocialButtons } from '../ui/SocialButtons';
import { CONTACT }       from '../../constants/data';
import '../ui/SocialButtons.css';
import './Location.css';

// Datos de contacto fijos — no vienen del backend
const whatsappUrl  = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`;
const instagramUrl = `https://instagram.com/${CONTACT.instagram}`;
const mapsUrl      = `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address)}`;

export function Location() {
  const ref = useReveal();

  return (
    <section id="contacto" className="section section--alt location" ref={ref}>
      <div className="container">

        <header className="section-header reveal">
          <p className="section-label">Encontranos</p>
          <h2 className="section-title">Ubicación <span>&amp; contacto</span></h2>
          <div className="section-divider" />
        </header>

        <div className="location__grid">

          <div className="location__info">

            <div className="location__block reveal">
              <p className="location__block-label">Dirección</p>
              <address className="location__address">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver en Google Maps">
                  {CONTACT.address}
                </a>
              </address>
            </div>

            <div className="location__block reveal reveal-delay-1">
              <p className="location__block-label">WhatsApp</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="location__contact-link">
                {CONTACT.whatsappDisplay}
              </a>
            </div>

            <div className="location__block reveal reveal-delay-2">
              <p className="location__block-label">Instagram</p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="location__contact-link">
                @{CONTACT.instagram}
              </a>
            </div>

            <div className="location__ctas reveal reveal-delay-3">
              <SocialButtons
                whatsappUrl={whatsappUrl}
                instagramUrl={instagramUrl}
              />
            </div>

          </div>

          <div className="location__map reveal reveal-delay-2">
            <iframe
              src={CONTACT.mapsEmbed}
              title="Mapa de ubicación de Oriente"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>
      </div>
    </section>
  );
}