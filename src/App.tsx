import { Hero } from './components/Hero';
import { SectionNav } from './components/SectionNav';
import { Footer } from './components/Footer';
import { MaisQueCargos } from './components/proposals/MaisQueCargos';
import { RelatosDeAfeto } from './components/proposals/RelatosDeAfeto';
import { BBBInstrucao } from './components/proposals/BBBInstrucao';

function App() {
  return (
    <>
      <span id="top" />
      <Hero />
      <SectionNav />
      <main>
        <MaisQueCargos />
        <RelatosDeAfeto />
        <BBBInstrucao />
      </main>
      <Footer />
    </>
  );
}

export default App;
