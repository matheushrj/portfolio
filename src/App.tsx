import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CreativesSection } from './components/CreativesSection';
import { VideosSection } from './components/VideosSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <div className="dark">
      <Navigation />
      <HeroSection />
      <CreativesSection />
      <VideosSection />
      <ContactSection />
    </div>
  );
}