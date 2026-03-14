import { ReactNode, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from './TkweenLogo';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: ReactNode }) => {
  const { lang, setLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav_home', href: '#home' },
    { key: 'nav_portfolio', href: '#portfolio' },
    { key: 'nav_services', href: '#services' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <TkweenLogo size={36} showText={true} />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {t(item.key)}
                </a>
              ))}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(item.key)}
              </a>
            ))}
            <button
              onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setMenuOpen(false); }}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-secondary text-secondary-foreground"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
