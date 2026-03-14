import { useLanguage } from '@/context/LanguageContext';
import TkweenLogo from './TkweenLogo';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(347_77%_50%/0.08),transparent_70%)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <TkweenLogo size={80} showText={false} />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight text-foreground">
          {t('hero_tagline')}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          {t('hero_subtitle')}
        </p>

        <a
          href="#portfolio"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 4L16 10L6 16V4Z" fill="currentColor" />
          </svg>
          {t('hero_cta')}
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
};

export default HeroSection;
