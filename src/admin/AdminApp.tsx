import { useState, useEffect } from 'react';
import { AdminLayout }  from './layout/AdminLayout';
import { LoginPage }    from './pages/LoginPage';
import { HomePage }     from './pages/HomePage';
import { AboutPage }    from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { CombosPage }   from './pages/CombosPage';
import { authService }  from '../services/AuthService';
import type { AdminPage } from '../types/admin';
import './AdminApp.css';

function getPageFromPath(): AdminPage {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const segment = parts[1] as AdminPage | undefined;
  const VALID: AdminPage[] = ['home', 'about', 'services', 'combos'];
  return VALID.includes(segment as AdminPage) ? segment! : 'home';
}

const PAGE_MAP: Record<AdminPage, React.ReactNode> = {
  home:     <HomePage />,
  about:    <AboutPage />,
  services: <ServicesPage />,
  combos:   <CombosPage />,
};

export function AdminApp() {
  const [currentPage,   setCurrentPage]   = useState<AdminPage>(getPageFromPath);
  const [authenticated, setAuthenticated] = useState(authService.isAuthenticated);

  useEffect(() => {
    const path = currentPage === 'home' ? '/admin' : `/admin/${currentPage}`;
    window.history.pushState({}, '', path);
  }, [currentPage]);

  useEffect(() => {
    function onPopState() { setCurrentPage(getPageFromPath()); }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  function handleLogout() {
    authService.logout();
    setAuthenticated(false);
  }

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout}>
      {PAGE_MAP[currentPage]}
    </AdminLayout>
  );
}