import './ContactPage.css';

export function ContactPage() {
  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Contacto</h1>
          <p className="admin-page__subtitle">Editar información de contacto</p>
        </div>
      </header>
      <section className="admin-page__section">
        <p>Formulario de ejemplo para los datos de contacto.</p>
      </section>
    </div>
  );
}
