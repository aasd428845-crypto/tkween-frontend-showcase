import { useLanguage } from '@/context/LanguageContext';
import { Camera, Film, Palette, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Camera, title: t('service_conferences'), desc: t('service_conferences_desc') },
    { icon: Film, title: t('service_corporate'), desc: t('service_corporate_desc') },
    { icon: Palette, title: t('service_artistic'), desc: t('service_artistic_desc') },
    { icon: Sparkles, title: t('service_post'), desc: t('service_post_desc') },
  ];

  return (
    <>
      {/* Services */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-16">
            {t('services_title')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            {t('about_title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about_description')}
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
