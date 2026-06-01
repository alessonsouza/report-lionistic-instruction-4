import { defineConfig } from 'vitest/config'

// Test-only config kept separate from vite.config.ts because Vite 8 (rolldown)
// and Vitest's bundled Vite have incompatible plugin types. Tests use esbuild's
// automatic JSX transform, so the React plugin isn't needed here.
export default defineConfig({
  esbuild: { jsx: 'automatic', jsxImportSource: 'react' },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
})
