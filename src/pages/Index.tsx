import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <Footer />
    </Layout>
  );
};

export default Index;
