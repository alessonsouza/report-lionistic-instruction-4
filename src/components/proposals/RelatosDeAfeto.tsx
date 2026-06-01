import { motion } from 'framer-motion';
import { proposals } from '../../data/content';
import { ProposalSection } from '../ProposalSection';
import { Gallery } from '../Gallery';
import styles from './RelatosDeAfeto.module.css';

const proposal = proposals.find((p) => p.id === 'relatos-de-afeto')!;

export function RelatosDeAfeto() {
  const mural = proposal.mural!;
  const hasLiveUrl = mural.liveUrl && mural.liveUrl !== '#';

  return (
    <ProposalSection proposal={proposal} tone="cream">
      {/* Featured: the official mural site */}
      <motion.div
        className={styles.feature}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.featureImage}>
          <img src={mural.official.src} alt={mural.official.alt} loading="lazy" />
        </div>
        <div className={styles.featureBody}>
          <span className={styles.featureEyebrow}>O Mural Digital</span>
          <h3 className={styles.featureTitle}>Um site feito para guardar memórias</h3>
          <p className={styles.featureText}>
            Construímos um mural digital próprio onde cada companheiro publicou suas fotos como memória e
            interagiu com as memórias dos outros através de curtidas e comentários.
          </p>
          {hasLiveUrl ? (
            <a href={mural.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.featureCta}>
              Acessar o mural ao vivo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ) : (
            <span className={styles.featureNote}>Link do mural ao vivo em breve.</span>
          )}
        </div>
      </motion.div>

      {/* Mural memories */}
      {proposal.gallery && (
        <div className={styles.block}>
          <Gallery
            items={proposal.gallery}
            eyebrow="Galeria"
            title={proposal.galleryTitle}
            subtitle={proposal.gallerySubtitle}
          />
        </div>
      )}

      {/* Interactions: likes & comments */}
      {mural.comments.length > 0 && (
        <div className={styles.block}>
          <Gallery
            items={mural.comments}
            eyebrow="Interação"
            title="Curtidas e Comentários"
            subtitle="Os companheiros interagindo com as memórias uns dos outros"
          />
        </div>
      )}

      {/* Shared Instagram stories */}
      {mural.stories.length > 0 && (
        <div className={styles.block}>
          <motion.div
            className={styles.storiesHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.storiesEyebrow}>Repercussão</span>
            <h3 className={styles.storiesTitle}>Compartilhado nos stories</h3>
          </motion.div>
          <div className={styles.storiesStrip}>
            {mural.stories.map((story) => (
              <figure key={story.id} className={styles.story}>
                <img src={story.src} alt={story.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      )}
    </ProposalSection>
  );
}
