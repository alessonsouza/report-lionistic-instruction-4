import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { NumberItem } from '../../../data/content';
import styles from './Numbers.module.css';

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ value, label, description, delay = 0 }: NumberItem & { delay?: number }) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <div className={styles.valueWrapper}>
        <span className={styles.value}>{count}</span>
      </div>
      <h4 className={styles.label}>{label}</h4>
      <p className={styles.description}>{description}</p>
      <div className={styles.cornerAccent} />
    </motion.div>
  );
}

interface NumbersProps {
  content: { title: string; items: NumberItem[] };
}

export function Numbers({ content }: NumbersProps) {
  return (
    <section className={styles.numbers}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>Resultados</span>
          <h3 className={styles.title}>{content.title}</h3>
        </motion.div>

        <div className={styles.cards}>
          {content.items.map((item, index) => (
            <StatCard key={index} value={item.value} label={item.label} description={item.description} delay={index * 0.1} />
          ))}
        </div>
      </div>

      <div className={styles.bgPattern} />
    </section>
  );
}
