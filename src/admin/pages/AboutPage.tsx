import { useState, useEffect } from 'react';
import { AboutForm }    from '../components/AboutForm';
import { aboutService } from '../../services/aboutService';
import type { AboutContent, AboutFormData } from '../../types/about';
import './AboutPage.css';

export function AboutPage() {
  const [content, setContent]  = useState<AboutContent | null>(null);
  const [loading, setLoading]  = useState(true);
  const [saving,  setSaving]   = useState(false);
  const [error,   setError]    = useState<string | null>(null);
  const [success, setSuccess]  = useState(false);

  useEffect(() => {
    aboutService.get()
      .then(data => setContent(data))
      .catch(() => setError('No se pudo cargar el contenido de Nosotros.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(data: AboutFormData) {
    if (!content?.id) return;
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const updated = await aboutService.update(content.id, data);
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
        <h1 className="admin-page__title">Nosotros</h1>
        <p className="admin-page__subtitle">
          Editá el texto de la sección "Sobre nosotros".
        </p>
      </header>

      {loading && <p className="admin-page__loading">Cargando…</p>}

      {!loading && !content && (
        <div className="admin-alert admin-alert--error" role="alert">
          No hay datos de Nosotros cargados todavía. Creá el primer registro desde Postman
          usando <code>POST /api/v1/about-sections</code>.
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
          <AboutForm initial={content} onSave={handleSave} loading={saving} />
        </>
      )}
    </div>
  );
}