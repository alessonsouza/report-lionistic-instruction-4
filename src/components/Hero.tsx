import { motion } from 'framer-motion';
import { reportMeta, proposals } from '../data/content';
import styles from './Hero.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.backgroundImage} ${styles.bgLeft}`}>
        <img src="/mais-que-cargos/capa-todos-diretores-entrevistando.jpg" alt="" aria-hidden="true" />
      </div>
      <div className={`${styles.backgroundImage} ${styles.bgRight}`}>
        <img src="/relatos-de-afeto/mural-overview.png" alt="" aria-hidden="true" />
      </div>
      <div className={styles.overlay} />
      <div className={styles.fluidTexture} />
      <div className={styles.noiseTexture} />

      <motion.div className={styles.content} initial="hidden" animate="visible" variants={stagger}>
        <motion.span className={styles.badge} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          {reportMeta.badge}
        </motion.span>

        <motion.h1 className={styles.title} variants={fadeInUp} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <span className={styles.titleAccent}>{reportMeta.titleAccent}</span>
          <span className={styles.titleMain}>{reportMeta.titleMain}</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          dangerouslySetInnerHTML={{ __html: reportMeta.subtitle }}
        />

        <motion.div className={styles.clubInfo} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <img src="/logo-leo.png" alt="Logo LEO" className={styles.clubLogo} />
          <div className={styles.clubText}>
            <span>{reportMeta.club}</span>
            <span className={styles.divider}>|</span>
            <span>{reportMeta.district}</span>
          </div>
        </motion.div>

        <motion.nav className={styles.chips} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} aria-label="Propostas do trimestre">
          {proposals.map((p, i) => (
            <a key={p.id} href={`#${p.id}`} className={styles.chip}>
              <span className={styles.chipNumber}>{String(i + 1).padStart(2, '0')}</span>
              {p.navLabel}
            </a>
          ))}
        </motion.nav>

        <motion.div
          className={styles.scrollIndicator}
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          animate={{ y: [0, 8, 0] }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
