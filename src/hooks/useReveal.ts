import { useEffect, useRef, type RefObject } from 'react';

export function useReveal(): RefObject<HTMLElement> {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

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

    // Fallback: si después de 1.5s algún elemento sigue sin visible, forzarlo
    const fallback = setTimeout(() => {
      root.querySelectorAll<HTMLElement>('.reveal:not(.visible)')
        .forEach(el => el.classList.add('visible'));
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return ref;
}