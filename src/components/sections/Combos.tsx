import { useState, useEffect, useRef } from 'react';
import { combosService }   from '../../services/combosService';
import { CONTACT }         from '../../constants/data';
import type { Combo }      from '../../types/combo';
import './Combos.css';

const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, '')}`;

export function Combos() {
  const sectionRef = useRef<HTMLElement>(null);
  const [combos,  setCombos]  = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch de datos
  useEffect(() => {
    combosService.getAll()
      .then(data => setCombos(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Re-ejecutar IntersectionObserver cuando llegan los datos
  // (igual que Services.tsx — el observer ya corrió antes del fetch)
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || combos.length === 0) return;

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
  }, [combos]);

  const sorted = [...combos].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="combos" className="section section--alt combos" ref={sectionRef}>
      <div className="container">

        <header className="section-header reveal">
          <p className="section-label">Experiencias completas</p>
          <h2 className="section-title">Nuestros <span>combos</span></h2>
          <div className="section-divider" />
          <p className="combos__intro">
            Tratamientos combinados para una experiencia integral. Cada combo está
            pensado para maximizar resultados y hacerte sentir bien en todos los sentidos.
          </p>
        </header>

        {loading && (
          <p style={{ textAlign: 'center', padding: '2rem 0', opacity: .5 }}>
            Cargando combos…
          </p>
        )}

        {!loading && combos.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem 0', opacity: .5 }}>
            No hay combos disponibles todavía.
          </p>
        )}

        <ul className="combos__grid" role="list">
          {sorted.map((combo, i) => (
            <li key={combo.id} className={`combos__card reveal reveal-delay-${Math.min(i + 1, 4)}`}>

              <div className="combos__card-stripe" aria-hidden="true" />

              {combo.badge && (
                <span className="combos__badge" aria-label={`Destacado: ${combo.badge}`}>
                  {combo.badge}
                </span>
              )}

              <div className="combos__card-body">
                <p className="combos__tagline">{combo.tagline}</p>
                <h3 className="combos__card-title">{combo.title}</h3>
                <p className="combos__card-desc">{combo.description}</p>

                {combo.items?.length > 0 && (
                  <ul className="combos__includes" aria-label={`${combo.title} incluye`}>
                    {[...combo.items]
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map(item => (
                        <li key={item.id} className="combos__include-item">
                          <span className="combos__include-dot" aria-hidden="true" />
                          {item.description}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div className="combos__card-footer">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="combos__cta"
                  aria-label={`Consultar por WhatsApp sobre ${combo.title}`}
                >
                  Consultar por WhatsApp
                  <em className="combos__cta-arrow" aria-hidden="true">→</em>
                </a>
              </div>

            </li>
          ))}
        </ul>

        <p className="combos__note reveal">
          Todos los combos se coordinan con turno previo.
          Escribinos y te asesoramos sin compromiso.
        </p>

      </div>
    </section>
  );
}