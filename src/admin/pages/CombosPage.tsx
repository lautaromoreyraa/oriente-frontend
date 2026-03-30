import { useState, useEffect } from 'react';
import { ComboForm }     from '../components/ComboForm';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { combosService } from '../../services/combosService';
import type { Combo, ComboFormData } from '../../types/combo';
import './CombosPage.css';

type Mode = 'list' | 'create' | 'edit';

export function CombosPage() {
  const [combos,   setCombos]   = useState<Combo[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState<string | null>(null);
  const [mode,     setMode]     = useState<Mode>('list');
  const [editing,  setEditing]  = useState<Combo | null>(null);
  const [deleting, setDeleting] = useState<Combo | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await combosService.getAll();
      setCombos(data);
    } catch {
      setError('No se pudieron cargar los combos.');
    } finally {
      setLoading(false);
    }
  }

  function notify(msg: string) {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  }

  async function handleSave(data: ComboFormData) {
    setSaving(true);
    setError(null);
    try {
      if (editing) {
        const updated = await combosService.update(editing.id, data);
        setCombos(prev => prev.map(c => c.id === updated.id ? updated : c));
        notify('Combo actualizado correctamente');
      } else {
        const created = await combosService.create(data);
        setCombos(prev => [...prev, created]);
        notify('Combo creado correctamente');
      }
      setMode('list');
      setEditing(null);
    } catch {
      setError('No se pudo guardar. Verificá la conexión con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(combo: Combo) {
    try {
      await combosService.remove(combo.id);
      setCombos(prev => prev.filter(c => c.id !== combo.id));
      notify('Combo eliminado');
    } catch {
      setError('No se pudo eliminar el combo.');
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
          <h1 className="admin-page__title">Combos</h1>
          <p className="admin-page__subtitle">
            Gestioná los combos de servicios que se muestran en la landing.
          </p>
        </div>
        {mode === 'list' && (
          <button className="btn-admin btn-admin--primary" onClick={() => setMode('create')}>
            + Nuevo combo
          </button>
        )}
      </header>

      {success && <div className="admin-alert admin-alert--success" role="status">✓ {success}</div>}
      {error   && <div className="admin-alert admin-alert--error"   role="alert">{error}</div>}

      {(mode === 'create' || mode === 'edit') && (
        <section className="admin-page__section">
          <h2 className="admin-page__section-title">
            {mode === 'create' ? 'Nuevo combo' : `Editando: ${editing?.title}`}
          </h2>
          <ComboForm
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
          {!loading && combos.length === 0 && (
            <p className="admin-page__empty">No hay combos cargados todavía.</p>
          )}
          {!loading && combos.length > 0 && (
            <ul className="combos-list">
              {[...combos]
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map(combo => (
                  <li key={combo.id} className="combos-list__item">
                    <div className="combos-list__info">
                      {combo.badge && (
                        <span className="combos-list__badge">{combo.badge}</span>
                      )}
                      <strong className="combos-list__title">{combo.title}</strong>
                      <p className="combos-list__tagline">{combo.tagline}</p>

                      {/* items viene del backend como objetos con description */}
                      {combo.items?.length > 0 && (
                        <ul className="combos-list__includes">
                          {[...combo.items]
                            .sort((a, b) => a.displayOrder - b.displayOrder)
                            .map(item => (
                              <li key={item.id}>· {item.description}</li>
                            ))}
                        </ul>
                      )}
                    </div>

                    <div className="combos-list__actions">
                      <button
                        className="btn-admin btn-admin--ghost"
                        onClick={() => { setEditing(combo); setMode('edit'); }}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-admin btn-admin--danger-ghost"
                        onClick={() => setDeleting(combo)}
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