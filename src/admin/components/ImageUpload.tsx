import { useRef, useState } from 'react';

const CLOUD_NAME   = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME   as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;

interface Props {
  label:    string;
  hint?:    string;
  value:    string;
  onChange: (url: string) => void;
}

export function ImageUpload({ label, hint, value, onChange }: Props) {
  const inputRef              = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState('');

  async function handleFile(file: File) {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setError('Cloudinary no configurado. Agregá VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env.local');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData },
      );

      if (!res.ok) throw new Error(`Cloudinary error ${res.status}`);

      const data = await res.json() as { secure_url: string };
      onChange(data.secure_url);
    } catch {
      setError('Error al subir la imagen. Revisá la conexión e intentá de nuevo.');
    } finally {
      setUploading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';   // permite seleccionar el mismo archivo dos veces
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && !uploading) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function openPicker() {
    if (!uploading) inputRef.current?.click();
  }

  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {hint && <small className="form-field__hint">{hint}</small>}

      {/* Zona de drop / preview */}
      <div
        className={`img-upload${uploading ? ' img-upload--loading' : ''}`}
        onClick={openPicker}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openPicker()}
        aria-label="Seleccionar imagen"
      >
        {value ? (
          <img
            src={value}
            alt="Preview"
            className="img-upload__thumb"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div className="img-upload__placeholder">
            <svg className="img-upload__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 16l4-4 4 4 4-6 4 6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            <span>Arrastrá o hacé clic para subir</span>
            <small>JPG, PNG, WEBP · máx. 10 MB</small>
          </div>
        )}

        {uploading && (
          <div className="img-upload__overlay">
            <div className="img-upload__spinner" />
            <span>Subiendo…</span>
          </div>
        )}
      </div>

      {/* Botón cambiar (solo cuando ya hay imagen) */}
      {value && !uploading && (
        <button
          type="button"
          className="btn-admin btn-admin--ghost img-upload__change-btn"
          onClick={openPicker}
        >
          Cambiar imagen
        </button>
      )}

      {error && <small className="form-field__error">{error}</small>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleInputChange}
      />
    </div>
  );
}
