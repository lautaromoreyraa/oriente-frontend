import { useState, useEffect, useRef } from 'react';
import { servicesService } from '../../services/servicesService';
import type { Service }    from '../../types/service';
import './Services.css';

function CategoryIcon({ category }: { category: string }) {
  const path = category === 'KINE'
    ? 'M12 5v14M5 12h14'
    : 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z';
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <li className={`services__card reveal reveal-delay-${delay}`}>
      <div className="services__card-icon">
        <CategoryIcon category={service.category} />
      </div>
      <h3 className="services__card-title">{service.title}</h3>
      <p className="services__card-desc">{service.description}</p>
    </li>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  // Fetch de datos
  useEffect(() => {
    servicesService.getAll()
      .then(data => setServices(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Re-ejecutar el IntersectionObserver cada vez que cambia services
  // Así captura los nuevos .reveal que React renderizó después del fetch
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || services.length === 0) return;

    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;

    els.forEach((el, i) => {
      if (!el.style.getPropertyValue('--reveal-i')) {
        el.style.setProperty('--reveal-i', String(i));
      }
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    els.forEach(el => observer.observe(el));

    // Fallback: forzar visible si el observer no dispara
    const fallback = setTimeout(() => {
      root.querySelectorAll<HTMLElement>('.reveal:not(.visible)')
        .forEach(el => el.classList.add('visible'));
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [services]); // <- se re-ejecuta cuando llegan los datos

  const sorted   = [...services].sort((a, b) => a.displayOrder - b.displayOrder);
  const kine     = sorted.filter(s => s.category === 'KINE');
  const estetica = sorted.filter(s => s.category === 'ESTETICA');

  return (
    <section id="servicios" className="section section--alt services" ref={sectionRef}>
      <div className="container">

        <header className="section-header reveal">
          <p className="section-label">Lo que ofrecemos</p>
          <h2 className="section-title">Nuestros <span>servicios</span></h2>
          <div className="section-divider" />
        </header>

        {loading && (
          <p style={{ textAlign: 'center', padding: '2rem 0', opacity: .5 }}>
            Cargando servicios…
          </p>
        )}

        {!loading && error && (
          <p style={{ textAlign: 'center', padding: '2rem 0', opacity: .5 }}>
            No se pudieron cargar los servicios.
          </p>
        )}

        {!loading && !error && services.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem 0', opacity: .5 }}>
            No hay servicios disponibles todavía.
          </p>
        )}

        {kine.length > 0 && (
          <div className="services__block reveal">
            <div className="services__block-header">
              <span className="services__block-tag services__block-tag--kine">Kinesiología</span>
              <p className="services__block-desc">Movimiento, rehabilitación y bienestar físico</p>
            </div>
            <ul className="services__grid" role="list">
              {kine.map((s, i) => (
                <ServiceCard key={s.id} service={s} delay={i + 1} />
              ))}
            </ul>
          </div>
        )}

        {kine.length > 0 && estetica.length > 0 && (
          <div className="services__separator reveal" aria-hidden="true">
            <span />
            <span className="services__separator-text">&</span>
            <span />
          </div>
        )}

        {estetica.length > 0 && (
          <div className="services__block reveal">
            <div className="services__block-header">
              <span className="services__block-tag services__block-tag--estetica">Estética</span>
              <p className="services__block-desc">Imagen, cuidado de la piel y transformación personal</p>
            </div>
            <ul className="services__grid" role="list">
              {estetica.map((s, i) => (
                <ServiceCard key={s.id} service={s} delay={i + 1} />
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  );
}