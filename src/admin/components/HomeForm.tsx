import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
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
      backgroundImageUrl: imageUrl || undefined,
      active:             initial.active,
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      <ImageUpload
        label="Foto del hero (derecha)"
        hint="Medida ideal: 600×700 px"
        value={imageUrl}
        onChange={setImageUrl}
      />

      <div className="admin-form__footer">
        <button className="btn-admin btn-admin--primary" type="submit" disabled={loading}>
          {loading ? 'Guardando…' : 'Guardar imagen'}
        </button>
      </div>
    </form>
  );
}
