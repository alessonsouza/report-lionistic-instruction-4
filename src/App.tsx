import { Hero } from './components/Hero';
import { SectionNav } from './components/SectionNav';
import { Footer } from './components/Footer';
import { MaisQueCargos } from './components/proposals/MaisQueCargos';
import { RelatosDeAfeto } from './components/proposals/RelatosDeAfeto';
import { proposals } from './data/content';

function App() {
  const remaining = proposals.filter((p) => p.id === 'bbb-instrucao');

  return (
    <>
      <span id="top" />
      <Hero />
      <SectionNav />
      <main>
        <MaisQueCargos />
        <RelatosDeAfeto />

        {/* Placeholder section — replaced by the BBB component in U7. */}
        {remaining.map((p) => (
          <section key={p.id} id={p.id} style={{ minHeight: '60vh', padding: '4rem 1rem', textAlign: 'center' }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--leo-red)', fontWeight: 600 }}>{p.eyebrow}</p>
            <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>{p.title}</h2>
            <p style={{ maxWidth: 600, margin: '1rem auto', color: 'var(--text-muted)' }}>{p.subtitle}</p>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default App;
