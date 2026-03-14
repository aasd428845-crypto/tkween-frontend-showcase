import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from './TkweenLogo';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="py-16 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <TkweenLogo size={40} showText={true} />
            <p className="text-sm text-muted-foreground">{t('footer_tagline')}</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href={`mailto:${t('contact_email')}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              {t('contact_email')}
            </a>
            <a
              href={`tel:${t('contact_phone')}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t('contact_phone')}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
