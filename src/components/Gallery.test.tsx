import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import { Gallery } from './Gallery';
import type { GalleryItem } from '../data/content';

const items: GalleryItem[] = [
  { id: 1, src: '/a.jpg', alt: 'foto A', caption: 'Legenda A' },
  { id: 2, src: '/b.jpg', alt: 'foto B', caption: 'Legenda B' },
  { id: 3, src: '/c.jpg', alt: 'foto C', caption: 'Legenda C' },
];

afterEach(() => {
  document.body.style.overflow = '';
});

describe('Gallery', () => {
  it('renders one thumbnail button per item', () => {
    render(<Gallery items={items} />);
    expect(screen.getByRole('button', { name: 'Abrir foto A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir foto B' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir foto C' })).toBeInTheDocument();
  });

  it('opens the lightbox on thumbnail click and locks body scroll', () => {
    render(<Gallery items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir foto B' }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Legenda B')).toBeInTheDocument();
    expect(within(dialog).getByText('2 / 3')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and restores body scroll', async () => {
    render(<Gallery items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir foto A' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.body.style.overflow).toBe('');
  });

  it('wraps to the last item when pressing ArrowLeft from the first', () => {
    render(<Gallery items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir foto A' }));

    fireEvent.keyDown(window, { key: 'ArrowLeft' });

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Legenda C')).toBeInTheDocument();
    expect(within(dialog).getByText('3 / 3')).toBeInTheDocument();
  });

  it('wraps to the first item when pressing ArrowRight from the last', () => {
    render(<Gallery items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Abrir foto C' }));

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('Legenda A')).toBeInTheDocument();
    expect(within(dialog).getByText('1 / 3')).toBeInTheDocument();
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<Gallery items={[]} />);
    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('button')).toBeNull();
  });
});
