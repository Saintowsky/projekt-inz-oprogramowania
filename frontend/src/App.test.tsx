import { vi, beforeEach, describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ message: 'Hello from mock backend!' }),
    })
  ) as unknown as typeof fetch)
})

describe('App', () => {
  it('shows loading state', () => {
    render(<App />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders fetched message', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/hello from mock backend/i)).toBeInTheDocument()
    })
  })
})
