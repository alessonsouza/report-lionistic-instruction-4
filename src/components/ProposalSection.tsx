import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Proposal } from '../data/content';
import styles from './ProposalSection.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface ProposalSectionProps {
  proposal: Proposal;
  tone?: 'light' | 'cream';
  children?: ReactNode;
}

export function ProposalSection({ proposal, tone = 'light', children }: ProposalSectionProps) {
  return (
    <section id={proposal.id} className={`${styles.section} ${tone === 'cream' ? styles.cream : styles.light}`}>
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.span className={styles.eyebrow} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {proposal.eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {proposal.title}
          </motion.h2>
          <motion.p className={styles.subtitle} variants={fadeInUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {proposal.subtitle}
          </motion.p>
        </motion.header>

        <div className={styles.narrative}>
          {proposal.narrative.map((paragraph, index) => (
            <motion.p
              key={index}
              className={styles.paragraph}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              // Static, author-authored HTML from content.ts - no user input.
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}
