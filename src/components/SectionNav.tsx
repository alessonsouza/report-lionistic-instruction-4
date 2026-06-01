import { useEffect, useState } from 'react';
import { proposals } from '../data/content';
import styles from './SectionNav.module.css';

export type NavItem = { id: string; navLabel: string };

interface SectionNavProps {
  /** Defaults to the report's proposals; injectable for testing. */
  items?: NavItem[];
}

export function SectionNav({ items = proposals }: SectionNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    if (items.length === 0) return;

    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A section is "active" when its midpoint crosses the viewport center.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={styles.nav} aria-label="Navegação entre as propostas">
      <div className={styles.inner}>
        <a href="#top" className={styles.brand}>
          <img src="/logo-leo.png" alt="" aria-hidden="true" className={styles.brandLogo} />
          <span className={styles.brandText}>Instrução Leoística</span>
        </a>
        <ul className={styles.links}>
          {items.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className={styles.linkNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.linkLabel}>{item.navLabel}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
