
interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="confirm-overlay" role="presentation">
      <div className="confirm-dialog" role="dialog" aria-modal="true">
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button className="btn-admin btn-admin--ghost" onClick={onCancel} type="button">
            Cancelar
          </button>
          <button className="btn-admin btn-admin--danger" onClick={onConfirm} type="button">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
