import { motion } from 'framer-motion';
import styles from './Acknowledgments.module.css';

interface AcknowledgmentsProps {
  content: {
    title: string;
    subtitle: string;
    text: string;
    collaborators: { name: string; role: string }[];
  };
  author: { name: string; role: string };
}

export function Acknowledgments({ content, author }: AcknowledgmentsProps) {
  const paragraphs = content.text.split('\n\n');

  return (
    <section className={styles.acknowledgments}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>Gratidão</span>
          <h3 className={styles.title}>{content.title}</h3>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className={styles.quoteWrapper}>
            <div className={styles.quoteIcon}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                <path d="M10.5 20c-3.5 0-6.5-2.8-6.5-6.5S7 7 10.5 7C14 7 17 10 17 14c0 6-4 13-13 18l2-4c4-3 6-6 6-8H10.5zm19 0c-3.5 0-6.5-2.8-6.5-6.5S26 7 29.5 7C33 7 36 10 36 14c0 6-4 13-13 18l2-4c4-3 6-6 6-8H29.5z" />
              </svg>
            </div>

            <div className={styles.textContent}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.author}>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{author.name}</span>
                <span className={styles.authorRole}>{author.role}</span>
              </div>
            </div>
          </div>

          <motion.div
            className={styles.collaborators}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <h4 className={styles.collaboratorsTitle}>Agradecimento Especial</h4>
            <div className={styles.collaboratorsList}>
              {content.collaborators.map((collaborator, index) => (
                <div key={index} className={styles.collaborator}>
                  <div className={styles.collaboratorAvatar}>{collaborator.name.charAt(0)}</div>
                  <div className={styles.collaboratorInfo}>
                    <span className={styles.collaboratorName}>{collaborator.name}</span>
                    <span className={styles.collaboratorRole}>{collaborator.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
    </section>
  );
}
