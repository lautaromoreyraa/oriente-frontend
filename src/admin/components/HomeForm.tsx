import { useState } from 'react';
import { FormField } from './FormField';
import type { HomeContent, HomeFormData } from '../../types/home';

interface Props {
  initial:  HomeContent;
  onSave:   (data: HomeFormData) => Promise<void>;
  loading:  boolean;
}

export function HomeForm({ initial, onSave, loading }: Props) {
  const [imageUrl, setImageUrl] = useState(initial.backgroundImageUrl ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({
      title:              initial.title,
      subtitle:           initial.subtitle,
      ctaText:            initial.ctaText,
      ctaUrl:             initial.ctaUrl,
      backgroundImageUrl: imageUrl.trim() || undefined,
      active:             initial.active,
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      <div className="admin-form__image-preview">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Preview"
            className="admin-form__image-thumb"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <div className="admin-form__image-empty">
            Sin imagen — se muestra el placeholder
          </div>
        )}
      </div>

      <FormField
        label="URL de la foto (derecha del hero)"
        hint="Medida ideal: 600×700px · Podés usar /nombre-foto.jpg si la subís a public/"
        inputProps={{
          id: 'home-image',
          value: imageUrl,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value),
          placeholder: '/foto-consultorio.jpg  o  https://...',
        }}
      />

      <div className="admin-form__footer">
        <button className="btn-admin btn-admin--primary" type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar imagen'}
        </button>
      </div>
    </form>
  );
}