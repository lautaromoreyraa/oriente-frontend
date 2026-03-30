import { useState } from 'react';
import { FormField } from './FormField';
import type { Service, ServiceFormData } from '../../types/service';

interface Props {
  initial?:  Service;
  onSave:    (data: ServiceFormData) => Promise<void>;
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

const EMPTY: ServiceFormData = {
  slug:         '',
  title:        '',
  description:  '',
  category:     'KINE',
  displayOrder: 0,
  active:       true,
};

export function ServiceForm({ initial, onSave, onCancel, loading }: Props) {
  const [form, setForm] = useState<ServiceFormData>(
    initial ? {
      slug:         initial.slug,        // siempre presente en edición
      title:        initial.title,
      description:  initial.description,
      category:     initial.category,
      displayOrder: initial.displayOrder,
      active:       initial.active,
    } : EMPTY
  );

  function set<K extends keyof ServiceFormData>(field: K, value: ServiceFormData[K]) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(value: string) {
    set('title', value);
    // Solo auto-generar slug en modo crear (cuando no hay initial)
    set('slug', toSlug(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form);
  }

  return (
    <form className="admin-form admin-form--inline" onSubmit={handleSubmit}>
      <FormField
        label="Título"
        inputProps={{
          id: 'service-title',
          value: form.title,
          onChange: e => handleTitleChange(e.target.value),
          required: true,
          placeholder: 'ej: Kinesiología',
        }}
      />

      <FormField
        as="textarea"
        label="Descripción"
        inputProps={{
          id: 'service-description',
          value: form.description,
          rows: 3,
          onChange: e => set('description', e.target.value),
          required: true,
        }}
      />

      <div className="admin-form__row">
        <div className="form-field">
          <label className="form-field__label" htmlFor="service-category">
            Categoría
          </label>
          <select
            id="service-category"
            className="form-field__input"
            value={form.category}
            onChange={e => set('category', e.target.value as ServiceFormData['category'])}
          >
            <option value="KINE">Kinesiología</option>
            <option value="ESTETICA">Estética</option>
          </select>
        </div>

        <FormField
          label="Orden"
          hint="Número para ordenar en la lista"
          inputProps={{
            id: 'service-order',
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
          {loading ? 'Guardando…' : initial ? 'Guardar cambios' : 'Crear servicio'}
        </button>
      </div>
    </form>
  );
}