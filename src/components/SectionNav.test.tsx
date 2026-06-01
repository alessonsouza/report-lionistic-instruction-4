import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within, act } from '@testing-library/react';
import { SectionNav, type NavItem } from './SectionNav';

type IOEntry = { isIntersecting: boolean; target: Element };
type IOCallback = (entries: IOEntry[]) => void;

let ioCallback: IOCallback | null = null;
const observed: Element[] = [];

class MockIntersectionObserver {
  constructor(cb: IOCallback) {
    ioCallback = cb;
  }
  observe(el: Element) {
    observed.push(el);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

const items: NavItem[] = [
  { id: 'a', navLabel: 'Alpha' },
  { id: 'b', navLabel: 'Beta' },
];

function renderWithSections(navItems: NavItem[] = items) {
  return render(
    <>
      <SectionNav items={navItems} />
      {navItems.map((i) => (
        <section key={i.id} id={i.id}>
          {i.navLabel}
        </section>
      ))}
    </>,
  );
}

beforeEach(() => {
  ioCallback = null;
  observed.length = 0;
  document.body.innerHTML = '';
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

describe('SectionNav', () => {
  it('renders one link per item with the matching anchor href', () => {
    renderWithSections();
    const list = screen.getByRole('list');
    const links = within(list).getAllByRole('link');
    expect(links).toHaveLength(items.length);
    expect(links[0]).toHaveAttribute('href', '#a');
    expect(links[1]).toHaveAttribute('href', '#b');
  });

  it('marks the first item active initially and moves the highlight when a section intersects', () => {
    renderWithSections();

    expect(screen.getByRole('link', { name: /Alpha/i })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: /Beta/i })).not.toHaveAttribute('aria-current');

    act(() => {
      ioCallback?.([{ isIntersecting: true, target: document.getElementById('b')! }]);
    });

    expect(screen.getByRole('link', { name: /Beta/i })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('link', { name: /Alpha/i })).not.toHaveAttribute('aria-current');
  });

  it('observes every section once mounted', () => {
    renderWithSections();
    expect(observed.map((el) => el.id).sort()).toEqual(['a', 'b']);
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<SectionNav items={[]} />);
    expect(container.querySelector('nav')).toBeNull();
  });
});
