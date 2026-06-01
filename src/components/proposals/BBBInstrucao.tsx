import { motion } from 'framer-motion';
import { proposals, reportMeta } from '../../data/content';
import { ProposalSection } from '../ProposalSection';
import { Gallery } from '../Gallery';
import { Timeline } from './bbb/Timeline';
import { Numbers } from './bbb/Numbers';
import { Instruction } from './bbb/Instruction';
import { Acknowledgments } from './bbb/Acknowledgments';
import styles from './BBBInstrucao.module.css';

const proposal = proposals.find((p) => p.id === 'bbb-instrucao')!;

export function BBBInstrucao() {
  const bbb = proposal.bbb!;

  return (
    <>
      <ProposalSection proposal={proposal} tone="light">
        <motion.div
          className={styles.extras}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.partnership}>
            <span className={styles.partnershipLabel}>{bbb.partnership.title}</span>
            <div className={styles.partnershipItems}>
              {bbb.partnership.items.map((item) => (
                <span key={item} className={styles.partnershipItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <a href={bbb.votingUrl} target="_blank" rel="noopener noreferrer" className={styles.votingCta}>
            Acessar a página de votação
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </motion.div>

        {proposal.gallery && (
          <div className={styles.galleryBlock}>
            <Gallery
              items={proposal.gallery}
              eyebrow="Galeria"
              title={proposal.galleryTitle}
              subtitle={proposal.gallerySubtitle}
              columns={3}
            />
          </div>
        )}
      </ProposalSection>

      <Timeline content={bbb.timeline} />
      <Numbers content={bbb.numbers} />
      <Instruction content={bbb.instruction} />
      <Acknowledgments content={bbb.acknowledgments} author={reportMeta.author} />
    </>
  );
}
