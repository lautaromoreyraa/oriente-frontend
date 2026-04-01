import type { AdminPage, NavItem } from '../../types/admin';
import './AdminLayout.css';

const NAV_ITEMS: NavItem[] = [
  { page: 'home',     label: 'Inicio',    icon: '🏠' },
  { page: 'services', label: 'Servicios', icon: '✦'  },
  { page: 'combos',   label: 'Combos',    icon: '🎁'  },
  { page: 'about',    label: 'Nosotros',  icon: '👥' },
];

interface Props {
  currentPage: AdminPage;
  onNavigate:  (page: AdminPage) => void;
  onLogout:    () => void;
  children:    React.ReactNode;
}

export function AdminLayout({ currentPage, onNavigate, onLogout, children }: Props) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">Oriente</span>
          <span className="admin-sidebar__tag">Admin</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Navegación del panel">
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.page}>
                <button
                  className={`admin-sidebar__link${currentPage === item.page ? ' admin-sidebar__link--active' : ''}`}
                  onClick={() => onNavigate(item.page)}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                >
                  <span className="admin-sidebar__icon" aria-hidden="true">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" className="admin-sidebar__back" target="_blank" rel="noopener noreferrer">
            ↗ Ver landing
          </a>
          <button className="admin-sidebar__logout" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}