import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryItem } from '../data/content';
import styles from './Gallery.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

interface GalleryProps {
  items: GalleryItem[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Grid columns at desktop width. Default 2. */
  columns?: 2 | 3;
}

export function Gallery({ items, eyebrow, title, subtitle, columns = 2 }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const selectedItem = isOpen ? items[selectedIndex] : null;

  const openModal = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null || prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal, goToPrevious, goToNext]);

  // Clean up the scroll-lock if the component unmounts while open.
  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  if (items.length === 0) return null;

  const hasHeader = Boolean(eyebrow || title || subtitle);

  return (
    <div className={styles.gallery}>
      <div className={styles.container}>
        {hasHeader && (
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </motion.div>
        )}

        <motion.div
          className={columns === 3 ? `${styles.grid} ${styles.gridThree}` : styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              className={styles.item}
              variants={itemVariants}
              onClick={() => openModal(index)}
              aria-label={`Abrir ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" className={styles.media} />
              <div className={styles.itemOverlay}>
                <span className={styles.itemCaption}>{item.caption}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && selectedItem && (
          <motion.div
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.caption}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalMedia}>
                <img src={selectedItem.src} alt={selectedItem.alt} className={styles.modalImage} />
              </div>

              <div className={styles.modalDetails}>
                <p className={styles.modalCaption}>{selectedItem.caption}</p>
                <span className={styles.modalCounter}>
                  {selectedIndex! + 1} / {items.length}
                </span>
              </div>

              {items.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.navPrev}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    aria-label="Anterior"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    className={`${styles.navButton} ${styles.navNext}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Próximo"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}

              <button className={styles.closeButton} onClick={closeModal} aria-label="Fechar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
