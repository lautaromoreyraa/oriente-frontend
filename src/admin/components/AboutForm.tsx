import { useState } from 'react';
import { FormField } from './FormField';
import { DIFFERENTIALS } from '../../constants/data';
import type { AboutContent, AboutFormData } from '../../types/about';

interface Props {
  initial:  AboutContent;
  onSave:   (data: AboutFormData) => Promise<void>;
  loading:  boolean;
}

export function AboutForm({ initial, onSave, loading }: Props) {
  const [form, setForm] = useState({
    heading:    initial.heading,
    body:       initial.body,
    imageUrl:   initial.imageUrl ?? '',
    stat1Value: initial.stat1Value ?? '7',
    stat1Label: initial.stat1Label ?? 'Especialidades',
    stat2Value: initial.stat2Value ?? '+500',
    stat2Label: initial.stat2Label ?? 'Pacientes atendidos',
    stat3Value: initial.stat3Value ?? '100%',
    stat3Label: initial.stat3Label ?? 'Atención personalizada',
    diff1Title: initial.diff1Title ?? DIFFERENTIALS[0]?.title ?? '',
    diff1Desc:  initial.diff1Desc  ?? DIFFERENTIALS[0]?.description ?? '',
    diff2Title: initial.diff2Title ?? DIFFERENTIALS[1]?.title ?? '',
    diff2Desc:  initial.diff2Desc  ?? DIFFERENTIALS[1]?.description ?? '',
    diff3Title: initial.diff3Title ?? DIFFERENTIALS[2]?.title ?? '',
    diff3Desc:  initial.diff3Desc  ?? DIFFERENTIALS[2]?.description ?? '',
    diff4Title: initial.diff4Title ?? DIFFERENTIALS[3]?.title ?? '',
    diff4Desc:  initial.diff4Desc  ?? DIFFERENTIALS[3]?.description ?? '',
  });

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({ ...form, imageUrl: form.imageUrl.trim() || undefined, active: initial.active });
  }

  const diffFields = [
    { n: 1, titleKey: 'diff1Title', descKey: 'diff1Desc' },
    { n: 2, titleKey: 'diff2Title', descKey: 'diff2Desc' },
    { n: 3, titleKey: 'diff3Title', descKey: 'diff3Desc' },
    { n: 4, titleKey: 'diff4Title', descKey: 'diff4Desc' },
  ] as const;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      <div className="admin-form__image-preview">
        {form.imageUrl ? (
          <img src={form.imageUrl} alt="Preview" className="admin-form__image-thumb"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.currentTarget.style.display = 'none')} />
        ) : (
          <div className="admin-form__image-empty">Sin imagen — se muestra el placeholder</div>
        )}
      </div>

      <FormField
        label="URL de la foto (izquierda de Nosotros)"
        hint="Medida ideal: 560×640px"
        inputProps={{
          id: 'about-image', value: form.imageUrl,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('imageUrl', e.target.value),
          placeholder: '/foto-equipo.jpg  o  https://...',
        }}
      />

      <FormField
        label="Título de sección"
        inputProps={{
          id: 'about-heading', value: form.heading,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('heading', e.target.value),
          required: true,
        }}
      />

      <FormField
        as="textarea"
        label="Texto principal"
        inputProps={{
          id: 'about-body', value: form.body, rows: 5,
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => set('body', e.target.value),
          required: true,
        }}
      />

      <fieldset className="admin-form__fieldset">
        <legend className="admin-form__legend">Estadísticas</legend>

        <div className="admin-form__stat-row">
          <FormField label="Valor 1" hint="ej: 7"
            inputProps={{ id: 's1v', value: form.stat1Value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat1Value', e.target.value) }} />
          <FormField label="Etiqueta 1" hint="ej: Especialidades"
            inputProps={{ id: 's1l', value: form.stat1Label, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat1Label', e.target.value) }} />
        </div>

        <div className="admin-form__stat-row">
          <FormField label="Valor 2" hint="ej: +500"
            inputProps={{ id: 's2v', value: form.stat2Value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat2Value', e.target.value) }} />
          <FormField label="Etiqueta 2" hint="ej: Pacientes atendidos"
            inputProps={{ id: 's2l', value: form.stat2Label, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat2Label', e.target.value) }} />
        </div>

        <div className="admin-form__stat-row">
          <FormField label="Valor 3" hint="ej: 100%"
            inputProps={{ id: 's3v', value: form.stat3Value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat3Value', e.target.value) }} />
          <FormField label="Etiqueta 3" hint="ej: Atención personalizada"
            inputProps={{ id: 's3l', value: form.stat3Label, onChange: (e: React.ChangeEvent<HTMLInputElement>) => set('stat3Label', e.target.value) }} />
        </div>
      </fieldset>

      <fieldset className="admin-form__fieldset">
        <legend className="admin-form__legend">Diferenciales</legend>

        {diffFields.map(({ n, titleKey, descKey }) => (
          <div key={n} className="admin-form__diff-group">
            <p className="admin-form__diff-label">Diferencial {n}</p>
            <FormField
              label="Título"
              inputProps={{
                id: `${titleKey}`, value: form[titleKey],
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(titleKey, e.target.value),
                placeholder: `Título del diferencial ${n}`,
              }}
            />
            <FormField
              as="textarea"
              label="Descripción"
              inputProps={{
                id: `${descKey}`, value: form[descKey], rows: 2,
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => set(descKey, e.target.value),
                placeholder: `Descripción del diferencial ${n}`,
              }}
            />
          </div>
        ))}
      </fieldset>

      <div className="admin-form__footer">
        <button className="btn-admin btn-admin--primary" type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar cambios'}
        </button>
      </div>
    </form>
  );
}
