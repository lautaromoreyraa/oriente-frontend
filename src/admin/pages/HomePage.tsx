import { useState, useEffect } from 'react';
import { HomeForm }    from '../components/HomeForm';
import { homeService } from '../../services/homeService';
import type { HomeContent, HomeFormData } from '../../types/home';
import './HomePage.css';

export function HomePage() {
  const [content, setContent]  = useState<HomeContent | null>(null);
  const [loading, setLoading]  = useState(true);
  const [saving,  setSaving]   = useState(false);
  const [error,   setError]    = useState<string | null>(null);
  const [success, setSuccess]  = useState(false);

  useEffect(() => {
    homeService.get()
      .then(data => setContent(data))
      .catch(() => setError('No se pudo cargar el contenido del inicio.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(data: HomeFormData) {
    if (!content?.id) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await homeService.update(content.id, data);
      setContent(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('No se pudo guardar. Verificá la conexión con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <h1 className="admin-page__title">Inicio</h1>
        <p className="admin-page__subtitle">
          Editá los textos que aparecen en el hero de la landing.
        </p>
      </header>

      {loading && <p className="admin-page__loading">Cargando…</p>}

      {!loading && !content && (
        <div className="admin-alert admin-alert--error" role="alert">
          No hay datos de inicio cargados todavía. Creá el primer registro desde Postman
          usando <code>POST /api/v1/hero-sections</code>.
        </div>
      )}

      {!loading && content && (
        <>
          {success && (
            <div className="admin-alert admin-alert--success" role="status">
              ✓ Cambios guardados correctamente
            </div>
          )}
          {error && (
            <div className="admin-alert admin-alert--error" role="alert">
              {error}
            </div>
          )}
          <HomeForm initial={content} onSave={handleSave} loading={saving} />
        </>
      )}
    </div>
  );
}