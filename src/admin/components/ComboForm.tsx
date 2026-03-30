import { useState } from 'react';
import { FormField } from './FormField';
import type { Combo, ComboFormData } from '../../types/combo';

interface Props {
  initial?:  Combo;
  onSave:    (data: ComboFormData) => Promise<void>;
  onCancel:  () => void;
  loading:   boolean;
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const EMPTY: ComboFormData = {
  slug:         '',
  title:        '',
  tagline:      '',
  description:  '',
  badge:        '',
  displayOrder: 0,
  active:       true,
  items:        [{ description: '', displayOrder: 1 }],
};

export function ComboForm({ initial, onSave, onCancel, loading }: Props) {
  const [form, setForm] = useState<ComboFormData>(
    initial ? {
      slug:         initial.slug,
      title:        initial.title,
      tagline:      initial.tagline,
      description:  initial.description,
      badge:        initial.badge ?? '',
      displayOrder: initial.displayOrder,
      active:       initial.active,
      items:        [...initial.items]
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map(i => ({ description: i.description, displayOrder: i.displayOrder })),
    } : EMPTY
  );

  function set<K extends keyof Omit<ComboFormData, 'items'>>(
    field: K, value: ComboFormData[K],
  ) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(value: string) {
    set('title', value);
    // Solo regenerar slug al crear — en edición conservar el slug original
    if (!initial) set('slug', toSlug(value));
  }

  function setItem(index: number, value: string) {
    setForm(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], description: value };
      return { ...prev, items };
    });
  }

  function addItem() {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { description: '', displayOrder: prev.items.length + 1 }],
    }));
  }

  function removeItem(index: number) {
    setForm(prev => ({
      ...prev,
      items: prev.items
        .filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, displayOrder: i + 1 })),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: ComboFormData = {
      ...form,
      badge: form.badge?.trim() || undefined,
      items: form.items
        .filter(i => i.description.trim() !== '')
        .map((i, idx) => ({ description: i.description, displayOrder: idx + 1 })),
    };
    await onSave(data);
  }

  return (
    <form className="admin-form admin-form--inline" onSubmit={handleSubmit}>
      <FormField
        label="Título"
        inputProps={{
          id: 'combo-title',
          value: form.title,
          onChange: e => handleTitleChange(e.target.value),
          required: true,
          placeholder: 'ej: Restauración Profunda',
        }}
      />

      <FormField
        label="Tagline"
        hint="Frase corta — ej: Cuerpo y piel en una sola visita"
        inputProps={{
          id: 'combo-tagline',
          value: form.tagline,
          onChange: e => set('tagline', e.target.value),
          required: true,
        }}
      />

      <FormField
        as="textarea"
        label="Descripción"
        inputProps={{
          id: 'combo-description',
          value: form.description,
          rows: 3,
          onChange: e => set('description', e.target.value),
          required: true,
        }}
      />

      <fieldset className="admin-form__fieldset">
        <legend className="admin-form__legend">Incluye</legend>
        {form.items.map((item, i) => (
          <div key={i} className="admin-form__includes-row">
            <input
              className="form-field__input"
              value={item.description}
              onChange={e => setItem(i, e.target.value)}
              placeholder={`Item ${i + 1}`}
            />
            {form.items.length > 1 && (
              <button
                type="button"
                className="btn-admin btn-admin--icon"
                onClick={() => removeItem(i)}
                aria-label="Eliminar item"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn-admin btn-admin--ghost" onClick={addItem}>
          + Agregar item
        </button>
      </fieldset>

      <div className="admin-form__row">
        <FormField
          label="Badge (opcional)"
          hint="ej: Más elegido — dejá vacío para no mostrar"
          inputProps={{
            id: 'combo-badge',
            value: form.badge ?? '',
            onChange: e => set('badge', e.target.value),
          }}
        />
        <FormField
          label="Orden"
          inputProps={{
            id: 'combo-order',
            type: 'number',
            value: form.displayOrder,
            min: 0,
            onChange: e => set('displayOrder', Number(e.target.value)),
          }}
        />
      </div>

      <div className="admin-form__footer">
        <button type="button" className="btn-admin btn-admin--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-admin btn-admin--primary" disabled={loading}>
          {loading ? 'Guardando…' : initial ? 'Guardar cambios' : 'Crear combo'}
        </button>
      </div>
    </form>
  );
}