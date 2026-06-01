import { motion } from 'framer-motion';
import { footerContent, proposals } from '../data/content';
import styles from './Footer.module.css';

export function Footer() {
  const mural = proposals.find((p) => p.id === 'relatos-de-afeto')?.mural;
  const muralUrl = mural?.liveUrl && mural.liveUrl !== '#' ? mural.liveUrl : footerContent.muralUrl;
  const hasMural = muralUrl && muralUrl !== '#';

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.mainInfo}>
            <div className={styles.logo}>
              <img src="/logo-leo.png" alt="Logo LEO" className={styles.logoImage} />
              <div className={styles.logoText}>
                <span className={styles.clubName}>{footerContent.club}</span>
                <span className={styles.district}>{footerContent.district}</span>
                <span className={styles.motto}>Faça Acontecer!</span>
              </div>
            </div>

            <div className={styles.activity}>
              <span className={styles.activityLabel}>Propostas do Trimestre</span>
              <ul className={styles.proposalList}>
                {proposals.map((p, i) => (
                  <li key={p.id}>
                    <a href={`#${p.id}`} className={styles.proposalLink}>
                      <span className={styles.proposalNumber}>{String(i + 1).padStart(2, '0')}</span>
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
              <span className={styles.activityPartnership}>Proposta: {footerContent.proposal}</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.bottom}>
            <p className={styles.copyright}>
              &copy; {footerContent.year} {footerContent.club}
            </p>
            {hasMural && (
              <a href={muralUrl} target="_blank" rel="noopener noreferrer" className={styles.muralLink}>
                Acessar o mural ao vivo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
            <p className={styles.tagline}>AL 2025/2026 • {footerContent.district}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
