import { motion } from 'framer-motion';
import styles from './Instruction.module.css';

interface InstructionItem {
  theme: string;
  paragraphs: string[];
  author: { name: string; club: string };
}

interface InstructionProps {
  content: {
    title: string;
    subtitle: string;
    items: InstructionItem[];
  };
}

function avatarLetter(name: string) {
  return name.replace(/^C\.LEO\s*/i, '').charAt(0);
}

export function Instruction({ content }: InstructionProps) {
  return (
    <section className={styles.instruction}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>Resultado</span>
          <h3 className={styles.title}>{content.title}</h3>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </motion.div>

        <div className={styles.cards}>
          {content.items.map((item, index) => (
            <motion.article
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
            >
              <div className={styles.themeHeader}>
                <div className={styles.quoteIcon}>
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="currentColor">
                    <path d="M10.5 20c-3.5 0-6.5-2.8-6.5-6.5S7 7 10.5 7C14 7 17 10 17 14c0 6-4 13-13 18l2-4c4-3 6-6 6-8H10.5zm19 0c-3.5 0-6.5-2.8-6.5-6.5S26 7 29.5 7C33 7 36 10 36 14c0 6-4 13-13 18l2-4c4-3 6-6 6-8H29.5z" />
                  </svg>
                </div>
                <h4 className={styles.theme}>{item.theme}</h4>
              </div>

              <div className={styles.textContent}>
                {item.paragraphs.map((paragraph, i) => (
                  // Static, author-authored HTML from content.ts - no user input.
                  <p key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>

              <div className={styles.closing}>
                <span className={styles.leoistically}>Leoisticamente,</span>
              </div>

              <div className={styles.author}>
                <div className={styles.authorAvatar}>{avatarLetter(item.author.name)}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{item.author.name}</span>
                  <span className={styles.authorClub}>{item.author.club}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
    </section>
  );
}
