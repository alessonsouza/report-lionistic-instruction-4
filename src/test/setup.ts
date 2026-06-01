import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom lacks IntersectionObserver; framer-motion's whileInView uses it.
// A no-op stub keeps components mounting (elements stay at their initial
// variant but remain in the DOM, which is all the tests query). Tests that
// need to drive the observer (e.g. SectionNav) override this per-test.
if (!('IntersectionObserver' in globalThis)) {
  class NoopIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', NoopIntersectionObserver)
}

// jsdom lacks matchMedia; framer-motion queries it for reduced-motion.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}
