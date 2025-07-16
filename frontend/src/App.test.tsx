import { vi, beforeEach, describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ message: 'Hello from mock backend!' }),
      })
    ) as unknown as typeof fetch
  );

  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App', () => {
  it('shows loading state', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders fetched message from backend', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/hello from mock backend/i)).toBeInTheDocument();
    });
  });

  it('adds a valid message and updates counters', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/wpisz wiadomość/i);
    fireEvent.change(input, { target: { value: 'Wiadomość 1' } });
    fireEvent.click(screen.getByText(/dodaj/i));

    expect(await screen.findByText('Wiadomość 1')).toBeInTheDocument();
    expect(screen.getByText(/łącznie: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/unikalnych: 1/i)).toBeInTheDocument();
  });

  it('does not add short message', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/wpisz wiadomość/i), {
      target: { value: 'hi' },
    });
    fireEvent.click(screen.getByText(/dodaj/i));

    expect(screen.getByText(/musi mieć co najmniej/i)).toBeInTheDocument();
    expect(screen.queryByText('hi')).not.toBeInTheDocument();
  });

  it('adds message on Enter key', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/wpisz wiadomość/i);
    fireEvent.change(input, { target: { value: 'Enterowa wiadomość' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Enterowa wiadomość')).toBeInTheDocument();
  });

  it('deletes a message', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/wpisz wiadomość/i), {
      target: { value: 'Do usunięcia' },
    });
    fireEvent.click(screen.getByText(/dodaj/i));
    fireEvent.click(screen.getByText(/usuń/i));

    expect(screen.queryByText('Do usunięcia')).not.toBeInTheDocument();
  });

  it('filters messages correctly', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/wpisz wiadomość/i);
    fireEvent.change(input, { target: { value: 'aaa' } });
    fireEvent.click(screen.getByText(/dodaj/i));
    fireEvent.change(input, { target: { value: 'bbb' } });
    fireEvent.click(screen.getByText(/dodaj/i));

    const filterInput = screen.getByPlaceholderText(/szukaj wiadomości/i);
    fireEvent.change(filterInput, { target: { value: 'bbb' } });

    expect(screen.getByText('bbb')).toBeInTheDocument();
    expect(screen.queryByText('aaa')).not.toBeInTheDocument();
  });

  it('clears all messages', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/wpisz wiadomość/i), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByText(/dodaj/i));
    fireEvent.click(screen.getByText(/wyczyść wszystkie/i));

    expect(screen.queryByText('abc')).not.toBeInTheDocument();
    expect(screen.getByText(/wszystkie wiadomości usunięte/i)).toBeInTheDocument();
  });

  it('loads persisted messages from localStorage', () => {
    localStorage.setItem('messages', JSON.stringify(['Trwała']));
    localStorage.setItem('totalAdded', '1');
    render(<App />);

    expect(screen.getByText('Trwała')).toBeInTheDocument();
    expect(screen.getByText(/łącznie: 1/i)).toBeInTheDocument();
  });

  it('edits a message and shows success', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/wpisz wiadomość/i), {
      target: { value: 'Do edycji' },
    });
    fireEvent.click(screen.getByText(/dodaj/i));

    fireEvent.click(screen.getByText(/edytuj/i));

    const editInput = screen.getByDisplayValue('Do edycji');
    fireEvent.change(editInput, { target: { value: 'Zmieniona wiadomość' } });
    fireEvent.click(screen.getByText(/zapisz/i));

    expect(screen.queryByText('Do edycji')).not.toBeInTheDocument();
    expect(screen.getByText('Zmieniona wiadomość')).toBeInTheDocument();
    expect(screen.getByText(/zaktualizowana/i)).toBeInTheDocument();
  });

  it('rejects too short edited message', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/wpisz wiadomość/i), {
      target: { value: 'Edycja' },
    });
    fireEvent.click(screen.getByText(/dodaj/i));
    fireEvent.click(screen.getByText(/edytuj/i));

    const editInput = screen.getByDisplayValue('Edycja');
    fireEvent.change(editInput, { target: { value: 'a' } });
    fireEvent.click(screen.getByText(/zapisz/i));

    expect(screen.getByText(/musi mieć min/i)).toBeInTheDocument();
  });
});
