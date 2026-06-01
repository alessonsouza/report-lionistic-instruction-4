import { Hero } from './components/Hero';
import { SectionNav } from './components/SectionNav';
import { Footer } from './components/Footer';
import { MaisQueCargos } from './components/proposals/MaisQueCargos';
import { proposals } from './data/content';

function App() {
  const remaining = proposals.filter((p) => p.id !== 'mais-que-cargos');

  return (
    <>
      <span id="top" />
      <Hero />
      <SectionNav />
      <main>
        <MaisQueCargos />

        {/* Placeholder sections — replaced by proposal components in U6–U7. */}
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
