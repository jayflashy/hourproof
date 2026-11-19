import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Projects } from './Projects.jsx';

const liveRepo = {
  full_name: 'getify/You-Dont-Know-JS',
  html_url: 'https://github.com/getify/You-Dont-Know-JS',
  description: 'A book series on JavaScript.',
  stargazers_count: 180000,
  language: null,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('open proofs', () => {
  it('shows a loading state, then live repositories', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [liveRepo] }),
      }),
    );
    render(<Projects />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading public learning repositories/i);
    const link = await screen.findByRole('link', { name: /You-Dont-Know-JS/i });
    expect(link).toHaveAttribute('href', 'https://github.com/getify/You-Dont-Know-JS');
    expect(screen.getByText(/live from github/i)).toBeInTheDocument();
    expect(screen.getByText(/180K stars/i)).toBeInTheDocument();
  });

  it('falls back to a saved shelf when GitHub fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        json: async () => ({}),
      }),
    );
    render(<Projects />);
    expect(await screen.findByRole('alert')).toHaveTextContent(/unavailable/i);
    expect(screen.getByRole('link', { name: /freeCodeCamp/i })).toHaveAttribute(
      'href',
      'https://github.com/freeCodeCamp/freeCodeCamp',
    );
    expect(screen.getByText('Saved shelf')).toBeInTheDocument();
  });

  it('explains an empty search and still shows the saved shelf', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [] }),
      }),
    );
    render(<Projects />);
    expect(await screen.findByText(/no public repositories/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /You-Dont-Know-JS/i })).toBeInTheDocument();
    expect(screen.getByText('Saved shelf')).toBeInTheDocument();
  });
});
