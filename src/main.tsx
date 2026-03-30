import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const isAdmin = window.location.pathname.startsWith('/admin');

async function mount() {
  const root = createRoot(document.getElementById('root')!);

  if (isAdmin) {
    // Importación dinámica — el bundle del admin NO se carga en la landing
    const { AdminApp } = await import('./admin/AdminApp');
    root.render(
      <StrictMode>
        <AdminApp />
      </StrictMode>
    );
  } else {
    const { default: App } = await import('./App');
    import('./index.css');
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

mount();