import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppStateProvider } from '../state/AppState.jsx';
import { Faq } from './Faq.jsx';

function triggers() {
  return screen.getAllByRole('button');
}

function renderFaq() {
  return render(
    <AppStateProvider>
      <Faq />
    </AppStateProvider>,
  );
}

describe('FAQ accordion keyboard behavior', () => {
  it('opens the first answer and toggles it with the mouse and Enter', async () => {
    const user = userEvent.setup();
    renderFaq();
    const [first] = triggers();
    expect(first).toBeDefined();
    if (!first) return;
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: /expert to teach/i })).toBeVisible();

    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('region', { name: /expert to teach/i })).not.toBeInTheDocument();

    first.focus();
    await user.keyboard('{Enter}');
    expect(first).toHaveAttribute('aria-expanded', 'true');
  });

  it('moves focus with ArrowDown, ArrowUp, Home, and End without toggling', async () => {
    const user = userEvent.setup();
    renderFaq();
    const buttons = triggers();
    const first = buttons[0];
    const second = buttons[1];
    const last = buttons[buttons.length - 1];
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(last).toBeDefined();
    if (!first || !second || !last) return;

    first.focus();
    await user.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(first).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard('{End}');
    expect(last).toHaveFocus();

    await user.keyboard('{Home}');
    expect(first).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(last).toHaveFocus();
  });
});
