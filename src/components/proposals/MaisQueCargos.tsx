import { motion } from 'framer-motion';
import { proposals } from '../../data/content';
import { ProposalSection } from '../ProposalSection';
import { Gallery } from '../Gallery';
import { VideoPlayer } from '../VideoPlayer';
import styles from './MaisQueCargos.module.css';

const proposal = proposals.find((p) => p.id === 'mais-que-cargos')!;

export function MaisQueCargos() {
  return (
    <ProposalSection proposal={proposal} tone="light">
      {proposal.gallery && (
        <Gallery
          items={proposal.gallery}
          eyebrow="Galeria"
          title={proposal.galleryTitle}
          subtitle={proposal.gallerySubtitle}
          columns={3}
        />
      )}
      {proposal.video && (
        <VideoPlayer
          src={proposal.video.src}
          poster={proposal.video.poster}
          caption={proposal.video.caption}
          pending={proposal.video.pending}
        />
      )}
      {proposal.credits && (
        <motion.div
          className={styles.credits}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.creditsTitle}>{proposal.credits.title}</span>
          <div className={styles.creditsList}>
            {proposal.credits.people.map((person) => (
              <div key={person.name} className={styles.person}>
                <div className={styles.avatar}>{person.name.charAt(0)}</div>
                <div className={styles.personInfo}>
                  <span className={styles.personName}>{person.name}</span>
                  {person.role && <span className={styles.personRole}>{person.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </ProposalSection>
  );
}
