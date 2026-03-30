import { useState, useEffect } from 'react';
import { ServiceForm }   from '../components/ServiceForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { servicesService } from '../../services/servicesService';
import type { Service, ServiceFormData } from '../../types/service';
import './ServicesPage.css';

type Mode = 'list' | 'create' | 'edit';

const CATEGORY_LABEL: Record<string, string> = {
  KINE:     'Kinesiología',
  ESTETICA: 'Estética',
};

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState<string | null>(null);
  const [mode,     setMode]     = useState<Mode>('list');
  const [editing,  setEditing]  = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await servicesService.getAll();
      setServices(data);
    } catch {
      setError('No se pudieron cargar los servicios.');
    } finally {
      setLoading(false);
    }
  }

  function notify(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  }

  async function handleSave(data: ServiceFormData) {
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        const updated = await servicesService.update(editing.id, data);
        setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
        notify('Servicio actualizado correctamente');
      } else {
        const created = await servicesService.create(data);
        setServices(prev => [...prev, created]);
        notify('Servicio creado correctamente');
      }
      setMode('list');
      setEditing(null);
    } catch {
      setError('No se pudo guardar. Verificá la conexión con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: Service) {
    try {
      await servicesService.remove(service.id);
      setServices(prev => prev.filter(s => s.id !== service.id));
      notify('Servicio eliminado');
    } catch {
      setError('No se pudo eliminar el servicio.');
    } finally {
      setDeleting(null);
    }
  }

  function cancelForm() {
    setEditing(null);
    setMode('list');
  }

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Servicios</h1>
          <p className="admin-page__subtitle">
            Gestioná los servicios que se muestran en la landing.
          </p>
        </div>
        {mode === 'list' && (
          <button className="btn-admin btn-admin--primary" onClick={() => setMode('create')}>
            + Nuevo servicio
          </button>
        )}
      </header>

      {success && <div className="admin-alert admin-alert--success" role="status">✓ {success}</div>}
      {error   && <div className="admin-alert admin-alert--error"   role="alert">{error}</div>}

      {(mode === 'create' || mode === 'edit') && (
        <section className="admin-page__section">
          <h2 className="admin-page__section-title">
            {mode === 'create' ? 'Nuevo servicio' : `Editando: ${editing?.title}`}
          </h2>
          <ServiceForm
            initial={editing ?? undefined}
            onSave={handleSave}
            onCancel={cancelForm}
            loading={saving}
          />
        </section>
      )}

      {mode === 'list' && (
        <>
          {loading && <p className="admin-page__loading">Cargando…</p>}
          {!loading && services.length === 0 && (
            <p className="admin-page__empty">No hay servicios cargados todavía.</p>
          )}
          {!loading && services.length > 0 && (
            <ul className="services-list">
              {[...services]
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map(service => (
                  <li key={service.id} className="services-list__item">
                    <div className="services-list__info">
                      <span className={`services-list__badge services-list__badge--${service.category.toLowerCase()}`}>
                        {CATEGORY_LABEL[service.category]}
                      </span>
                      <strong className="services-list__title">{service.title}</strong>
                      <p className="services-list__desc">{service.description}</p>
                    </div>
                    <div className="services-list__actions">
                      <button
                        className="btn-admin btn-admin--ghost"
                        onClick={() => { setEditing(service); setMode('edit'); }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-admin btn-admin--danger-ghost"
                        onClick={() => setDeleting(service)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}

      {deleting && (
        <ConfirmDialog
          message={`¿Eliminar "${deleting.title}"? Esta acción no se puede deshacer.`}
          onConfirm={() => handleDelete(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}