import { Navbar }        from './components/layout/Navbar';
import { Footer }        from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { OrientalDecor }  from './components/ui/OrientalDecor';
import { Hero }          from './components/sections/Hero';
import { AboutUs }       from './components/sections/AboutUs';
import { Services }      from './components/sections/Services';
import { Combos }        from './components/sections/Combos';
import { Location }      from './components/sections/Location';

function App() {
  return (
    <>
      <OrientalDecor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Combos />
        <AboutUs />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;