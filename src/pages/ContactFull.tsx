import { Link } from 'react-router-dom';
import TkweenLogo from '@/components/TkweenLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useCloudSettings } from '@/hooks/use-cloud-settings';

const ContactFull = () => {
  const { settings } = useCloudSettings();
  const { t } = useLanguage();

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 800, width: '100%', padding: '60px 24px', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'inline-block', marginBottom: 40 }}>
          <TkweenLogo size={48} showText={true} />
        </Link>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 200, marginBottom: 48 }}>Let's Connect</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ textAlign: 'left' }}>
          <div>
            <h3 style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em', marginBottom: 16 }}>GENERAL INQUIRIES</h3>
            <p style={{ color: '#999', fontSize: 15, lineHeight: 2 }}>{settings.email}</p>
            <p style={{ color: '#999', fontSize: 15, lineHeight: 2 }}>{settings.phone}</p>
            <p style={{ color: '#999', fontSize: 15, lineHeight: 2 }}>{settings.address}</p>
          </div>
          <div>
            <h3 style={{ color: '#FF4500', fontSize: 11, letterSpacing: '0.2em', marginBottom: 16 }}>FOLLOW US</h3>
            <div className="flex flex-col gap-2">
              <a href={settings.instagram} target="_blank" rel="noopener" style={{ color: '#999', fontSize: 15, textDecoration: 'none' }}>Instagram</a>
              <a href={settings.twitter} target="_blank" rel="noopener" style={{ color: '#999', fontSize: 15, textDecoration: 'none' }}>Twitter / X</a>
              <a href={settings.snapchat} target="_blank" rel="noopener" style={{ color: '#999', fontSize: 15, textDecoration: 'none' }}>Snapchat</a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener" style={{ color: '#25d366', fontSize: 15, textDecoration: 'none' }}>📱 WhatsApp</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingTop: 24, borderTop: '1px solid #1a1a1a' }}>
          <p style={{ color: '#555', fontSize: 12 }}>© {new Date().getFullYear()} TKWEEN Media Production. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <span style={{ color: '#555', fontSize: 11 }}>Privacy Policy</span>
            <span style={{ color: '#555', fontSize: 11 }}>Terms of Use</span>
            <span style={{ color: '#555', fontSize: 11 }}>Legal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFull;
