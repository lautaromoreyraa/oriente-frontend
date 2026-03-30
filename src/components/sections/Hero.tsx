import { useState, useEffect } from 'react';
import { SocialButtons } from '../ui/SocialButtons';
import { homeService }   from '../../services/homeService';
import type { HomeContent } from '../../types/home';
import '../ui/SocialButtons.css';
import './Hero.css';

const FALLBACK: HomeContent = {
  id:       0,
  title:    'Oriente',
  subtitle: 'El camino del bienestar',
  ctaText:  'Conocé nuestros servicios',
  ctaUrl:   '#servicios',
  active:   true,
};

export function Hero() {
  const [content, setContent] = useState<HomeContent>(FALLBACK);

  useEffect(() => {
    homeService.get()
      .then(data => { if (data) setContent(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="inicio" className="hero" aria-label="Inicio">

      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-glow" />
        <div className="hero__bg-glow-2" />
        <div className="hero__bg-grid" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">

          <p className="hero__eyebrow animate-item">
            Consultorio integral · Resistencia, Chaco
          </p>

          <h1 className="hero__title animate-item animate-item--delay-1">
            <img src="/oriente_logo.png" alt="Oriente" className="hero__logo-img" />
          </h1>

          <p className="hero__slogan animate-item animate-item--delay-2">
            {content.subtitle}
          </p>

          <div className="hero__actions animate-item animate-item--delay-4">
            <a href={content.ctaUrl ?? '#servicios'} className="btn btn--primary">
              {content.ctaText}
            </a>
            <SocialButtons />
          </div>

        </div>

        {/* Imagen derecha — 600×700px ideal */}
        <div className="hero__visual animate-item animate-item--delay-3" aria-hidden="true">
          <div className="hero__image-frame">
            {content.backgroundImageUrl ? (
              <img
                src={content.backgroundImageUrl}
                alt="Oriente consultorio"
                className="hero__image-photo"
              />
            ) : (
              <div className="hero__image-placeholder">
                <p className="hero__placeholder-text">Oriente</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <a href="#nosotros" className="hero__scroll-cue" aria-label="Ir a Sobre nosotros">
        <span />
      </a>

    </section>
  );
}