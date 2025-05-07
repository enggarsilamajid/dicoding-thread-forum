/**
 * test scenario for RegisterInput component
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call register function when submit button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import { RegisterInput } from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>
    );
    const nameInput = await screen.getByPlaceholderText('Nama Pengguna');

    // action
    await userEvent.type(nameInput, 'akunTesting4');

    // assert
    expect(nameInput).toHaveValue('akunTesting4');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>
    );
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'akunTesting4@gmail.com');

    // assert
    expect(emailInput).toHaveValue('akunTesting4@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <RegisterInput register={() => {}} />
      </MemoryRouter>
    );
    const passwordInput = await screen.getByPlaceholderText('Kata Sandi');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function when submit button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(
      <MemoryRouter>
        <RegisterInput register={mockRegister} />
      </MemoryRouter>
    );
    const nameInput = await screen.getByPlaceholderText('Nama Pengguna');
    await userEvent.type(nameInput, 'akunTesting4');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'akunTesting4@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Kata Sandi');
    await userEvent.type(passwordInput, 'password123');
    const submitButton = await screen.getByRole('button', { name: 'Kirim' });

    // action
    await userEvent.click(submitButton);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'akunTesting4',
      email: 'akunTesting4@gmail.com',
      password: 'password123',
    });
  });
});