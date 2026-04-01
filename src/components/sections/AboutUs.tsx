import { useState, useEffect } from 'react';
import { useReveal }    from '../../hooks/useReveal';
import { aboutService } from '../../services/aboutService';
import { DIFFERENTIALS } from '../../constants/data';
import type { AboutContent } from '../../types/about';
import './AboutUs.css';
import './Differentials.css';

const FALLBACK: AboutContent = {
  id:         0,
  heading:    'Un espacio para tu bienestar',
  body:       'En Oriente creemos que el bienestar es un camino, no un destino. Por eso reunimos bajo un mismo techo especialidades que se complementan: kinesiología para el cuerpo en movimiento, y estética para el cuidado de la piel y la imagen personal.',
  active:     true,
  stat1Value: '7',    stat1Label: 'Especialidades',
  stat2Value: '+500', stat2Label: 'Pacientes atendidos',
  stat3Value: '100%', stat3Label: 'Atención personalizada',
};

export function AboutUs() {
  const ref = useReveal();
  const [content, setContent] = useState<AboutContent>(FALLBACK);

  useEffect(() => {
    aboutService.get()
      .then(data => { if (data) setContent(data); })
      .catch(() => {});
  }, []);

  const s1v = content.stat1Value || '7';
  const s1l = content.stat1Label || 'Especialidades';
  const s2v = content.stat2Value || '+500';
  const s2l = content.stat2Label || 'Pacientes atendidos';
  const s3v = content.stat3Value || '100%';
  const s3l = content.stat3Label || 'Atención personalizada';

  const diffs = [
    { title: content.diff1Title || DIFFERENTIALS[0]?.title, description: content.diff1Desc || DIFFERENTIALS[0]?.description },
    { title: content.diff2Title || DIFFERENTIALS[1]?.title, description: content.diff2Desc || DIFFERENTIALS[1]?.description },
    { title: content.diff3Title || DIFFERENTIALS[2]?.title, description: content.diff3Desc || DIFFERENTIALS[2]?.description },
    { title: content.diff4Title || DIFFERENTIALS[3]?.title, description: content.diff4Desc || DIFFERENTIALS[3]?.description },
  ].filter(d => d.title);

  return (
    <section id="nosotros" className="section section--alt about" ref={ref}>
      <div className="container">
        <div className="about__grid">

          <div className="about__visual reveal" aria-hidden="true">
            <div className="about__image-main">
              {content.imageUrl ? (
                <img src={content.imageUrl} alt="Equipo Oriente" className="about__image-photo" />
              ) : (
                <div className="about__image-placeholder"><span>Oriente</span></div>
              )}
            </div>
            <div className="about__image-accent" />
          </div>

          <div className="about__text">
            <div className="reveal">
              <p className="section-label">Sobre nosotros</p>
              <h2 className="section-title">{content.heading}</h2>
              <div className="section-divider" />
            </div>

            <p className="about__body reveal reveal-delay-1">{content.body}</p>

            <div className="about__stats reveal reveal-delay-3">
              <div className="about__stat">
                <span className="about__stat-number">{s1v}</span>
                <span className="about__stat-label">{s1l}</span>
              </div>
              <div className="about__stat-divider" aria-hidden="true" />
              <div className="about__stat">
                <span className="about__stat-number">{s2v}</span>
                <span className="about__stat-label">{s2l}</span>
              </div>
              <div className="about__stat-divider" aria-hidden="true" />
              <div className="about__stat">
                <span className="about__stat-number">{s3v}</span>
                <span className="about__stat-label">{s3l}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {diffs.length > 0 && (
        <div className="about__differentials">
          <div className="container">
            <header className="section-header reveal about__diff-header">
              <p className="section-label">Por qué elegirnos</p>
              <h2 className="section-title">Nuestros <span>diferenciales</span></h2>
              <div className="section-divider" />
            </header>

            <ul className="differentials__list" role="list">
              {diffs.map((item, i) => (
                <li key={i} className={`differentials__item reveal reveal-delay-${i + 1}`}>
                  <div className="differentials__number" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="differentials__content">
                    <h3 className="differentials__title">{item.title}</h3>
                    <p className="differentials__desc">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
