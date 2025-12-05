import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HashiraShowcase from './components/HashiraShowcase';
import Gallery from './components/Gallery';
import Schedule from './components/Schedule';
import Registration from './components/Registration';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import NoiseOverlay from './components/ui/NoiseOverlay';

import Marquee from './components/ui/Marquee';
import CustomCursor from './components/ui/CustomCursor';

function App() {
  return (
    <div className="bg-prakida-bg min-h-screen text-white overflow-x-hidden selection:bg-prakida-flame selection:text-white cursor-none">
      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Marquee
          items={[
            "Registration Open Now",
            "Demon Slayer Corps Recruitment",
            "Win Prizes Worth ₹50k",
            "Prove Your Strength",
            "Blood Sweat & Glory",
            "Jan 13-15 2026",
            "Become a Hashira"
          ]}
          speed={30}
        />
        <About />
        <HashiraShowcase />
        <Gallery />
        <Schedule />
        <Registration />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}

export default App;
