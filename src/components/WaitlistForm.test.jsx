import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { AppStateProvider } from '../state/AppState.jsx';
import { WaitlistForm } from './Waitlist.jsx';

function renderForm() {
  return render(
    <AppStateProvider>
      <WaitlistForm />
    </AppStateProvider>,
  );
}

async function fillValid(user) {
  await user.type(screen.getByLabelText('Name'), 'Maya Chen');
  await user.type(screen.getByLabelText('Email'), 'maya@example.com');
  await user.type(screen.getByLabelText('Skill you can teach'), 'Lab demos');
  await user.type(screen.getByLabelText('Skill you want to learn'), 'Wheel throwing');
  await user.click(screen.getByRole('radio', { name: 'Online' }));
}

describe('waitlist form validation', () => {
  it('shows a summary and field errors when the form is empty', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: 'Join the waitlist' }));

    expect(screen.getByRole('alert')).toHaveTextContent('4 fields need attention before you join.');
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Name')).toHaveFocus();
    expect(screen.getByText('Enter the name your match should see.')).toBeInTheDocument();
    expect(
      screen.getByText('Enter an email so we can tell you when a match opens.'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('rejects a short name and an incomplete email, then accepts a valid signup', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText('Name'), 'A');
    await user.type(screen.getByLabelText('Email'), 'maya-at-example');
    await user.type(screen.getByLabelText('Skill you can teach'), 'Lab demos');
    await user.type(screen.getByLabelText('Skill you want to learn'), 'Wheel throwing');
    await user.click(screen.getByRole('button', { name: 'Join the waitlist' }));

    expect(screen.getByRole('alert')).toHaveTextContent('2 fields need attention before you join.');
    expect(screen.getByText('Use at least 2 characters.')).toBeInTheDocument();
    expect(
      screen.getByText('That email looks incomplete. Use a format like name@example.com.'),
    ).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Name'));
    await user.type(screen.getByLabelText('Name'), 'Maya Chen');
    await user.clear(screen.getByLabelText('Email'));
    await user.type(screen.getByLabelText('Email'), 'maya@example.com');
    await user.click(screen.getByRole('radio', { name: 'Online' }));
    await user.click(screen.getByRole('button', { name: 'Join the waitlist' }));

    const status = await screen.findByRole('status');
    expect(status).toHaveTextContent('You are on the list, Maya Chen.');
    expect(status).toHaveTextContent('maya@example.com');
    expect(status).toHaveTextContent('Wheel throwing');
    expect(status).toHaveTextContent('Lab demos');
    expect(status).toHaveTextContent('online');
    expect(status).toHaveFocus();
  });

  it('returns to the saved answers when the person edits them', async () => {
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Join the waitlist' }));
    await user.click(await screen.findByRole('button', { name: 'Edit my answers' }));

    expect(screen.getByLabelText('Email')).toHaveValue('maya@example.com');
    expect(screen.getByLabelText('Skill you can teach')).toHaveValue('Lab demos');
    expect(screen.getByRole('radio', { name: 'Online' })).toBeChecked();
    expect(screen.getByLabelText('Name')).toHaveFocus();
  });
});
