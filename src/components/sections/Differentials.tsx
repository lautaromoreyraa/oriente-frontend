import { DIFFERENTIALS } from '../../constants/data';
import { useReveal } from '../../hooks/useReveal';
import './Differentials.css';

export function Differentials() {
  const ref = useReveal();

  return (
    <section className="section differentials" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">

        <header className="section-header reveal">
          <p className="section-label">Por qué elegirnos</p>
          <h2 className="section-title">Nuestros <span>diferenciales</span></h2>
          <div className="section-divider" />
        </header>

        <ul className="differentials__list" role="list">
          {DIFFERENTIALS.map((item, i) => (
            <li key={item.id} className={`differentials__item reveal reveal-delay-${i + 1}`}>
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
    </section>
  );
}
