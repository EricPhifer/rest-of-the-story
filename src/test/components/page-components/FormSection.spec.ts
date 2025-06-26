// src/components/page-components/__tests__/FormSection.spec.ts
/// <reference types="vitest" />

import { describe, it, expect, vi } from 'vitest'

// 1️⃣ Define your stub *and* mock the module before you import anything else*
vi.mock('@portabletext/vue', () => ({
  __esModule: true,
  default: {
    props: ['value'],
    template: `<div data-testid="desc">{{ value[0].children[0].text }}</div>`
  }
}))

// 2️⃣ Now do your normal imports
import { render, screen, fireEvent } from '@testing-library/vue'
import FormSection from '@/components/page-components/FormSection.vue'

describe('FormSection.vue', () => {
  const block = {
    formTitle: 'Contact Us',
    formDescription: [
      { _type: 'block', children: [{ _type: 'span', text: 'Hello Form' }] }
    ],
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'message', label: 'Message', type: 'textarea', required: false },
      {
        name: 'reason',
        label: 'Reason',
        type: 'select',
        required: true,
        options: ['Option A', 'Option B']
      }
    ]
  }

  it('renders title and description', () => {
    render(FormSection, { props: { block } })

    // The heading
    expect(
      screen.getByRole('heading', { name: 'Contact Us' })
    ).toBeInTheDocument()

    // Our mocked PortableText prints the first span.text as data-testid="desc"
    expect(screen.getByTestId('desc')).toHaveTextContent('Hello Form')
  })

  it('renders input, textarea, and select fields with labels and options', () => {
    render(FormSection, { props: { block } })

    // Email input
    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toBeRequired()

    // Message textarea
    const messageTextarea = screen.getByLabelText('Message')
    expect(messageTextarea.tagName).toBe('TEXTAREA')
    expect(messageTextarea).not.toBeRequired()

    // Reason select + options
    const reasonSelect = screen.getByLabelText('Reason')
    expect(reasonSelect.tagName).toBe('SELECT')
    expect(reasonSelect).toBeRequired()
    expect(screen.getByRole('option', { name: 'Please select' })).toBeDisabled()
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument()
  })

  it('updates formData and logs on submit', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    render(FormSection, { props: { block } })

    await fireEvent.update(screen.getByLabelText('Email'), 'user@example.com')
    await fireEvent.update(screen.getByLabelText('Message'), 'Test message')
    await fireEvent.update(screen.getByLabelText('Reason'), 'Option B')
    await fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(logSpy).toHaveBeenCalledWith(
      'Submitting form data:',
      { email: 'user@example.com', message: 'Test message', reason: 'Option B' }
    )
    logSpy.mockRestore()
  })
})
