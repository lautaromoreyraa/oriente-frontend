import { useEffect, useRef, type RefObject } from 'react';

/**
 * Scroll-reveal con stagger automático por posición en el grupo.
 * - threshold 0.14 → el elemento entra un poco antes de estar completamente visible
 * - rootMargin "-40px" → no dispara en el borde exacto
 * - stagger: agrega --reveal-i CSS var para que cada hijo tenga delay incremental
 */
export function useReveal(): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!els.length) return;

    // Inyectar índice como custom property para stagger CSS puro
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}