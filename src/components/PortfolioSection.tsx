import { useLanguage } from '@/context/LanguageContext';
import { Play } from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    titleEn: 'Tech Summit 2024',
    titleAr: 'قمة التكنولوجيا 2024',
    categoryEn: 'Conference',
    categoryAr: 'مؤتمرات',
    gradient: 'from-primary/30 to-primary/5',
  },
  {
    id: 2,
    titleEn: 'AlRajhi Bank Campaign',
    titleAr: 'حملة بنك الراجحي',
    categoryEn: 'Corporate',
    categoryAr: 'مؤسسي',
    gradient: 'from-muted to-secondary',
  },
  {
    id: 3,
    titleEn: 'Desert Echoes Documentary',
    titleAr: 'وثائقي أصداء الصحراء',
    categoryEn: 'Artistic',
    categoryAr: 'فني',
    gradient: 'from-primary/20 to-muted',
  },
  {
    id: 4,
    titleEn: 'Vision 2030 Forum',
    titleAr: 'منتدى رؤية 2030',
    categoryEn: 'Conference',
    categoryAr: 'مؤتمرات',
    gradient: 'from-secondary to-primary/10',
  },
  {
    id: 5,
    titleEn: 'NEOM Brand Film',
    titleAr: 'فيلم نيوم الترويجي',
    categoryEn: 'Corporate',
    categoryAr: 'مؤسسي',
    gradient: 'from-muted to-primary/20',
  },
  {
    id: 6,
    titleEn: 'Riyadh Season Highlights',
    titleAr: 'أبرز لحظات موسم الرياض',
    categoryEn: 'Artistic',
    categoryAr: 'فني',
    gradient: 'from-primary/25 to-secondary',
  },
];

const PortfolioSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="portfolio" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('portfolio_title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden border border-border bg-secondary cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Thumbnail placeholder */}
              <div className={`aspect-video bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {lang === 'en' ? item.categoryEn : item.categoryAr}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1">
                  {lang === 'en' ? item.titleEn : item.titleAr}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
