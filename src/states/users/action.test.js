/**
 * test scenario for asyncRegisterNewUser thunk
 *
 * - asyncRegisterNewUser thunk
 *   - should successfully register a new user when data is valid
 *   - should throw an error when name, email, or password is missing
 *   - should throw an error when email format is invalid
 *   - should throw an error when password is too short
 *   - should throw an error when API request fails
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncRegisterNewUser } from './action';
import { api } from '../../utils/api';

const fakeErrorMessage = 'Failed to register user';

describe('asyncRegisterNewUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;
  });

  it('should successfully register a new user when data is valid', async () => {
    // arrange
    const validUserData = { name: 'akunTesting4', email: 'akunTesting4@gmail.com', password: 'akunTesting4' };
    api.register = vi.fn().mockResolvedValueOnce('User registered');

    const dispatch = vi.fn();

    // action
    await asyncRegisterNewUser(validUserData)(dispatch);

    // assert
    expect(api.register).toHaveBeenCalledWith(validUserData);
  });

  it('should throw an error when name, email, or password is missing', async () => {
    // arrange
    const invalidUserData = { name: '', email: 'akunTesting4@gmail.com', password: 'akunTesting4' };

    const dispatch = vi.fn();

    // action & assert
    await expect(asyncRegisterNewUser(invalidUserData)(dispatch)).rejects.toThrow('Semua field harus diisi!');
  });

  it('should throw an error when email format is invalid', async () => {
    // arrange
    const invalidEmailData = { name: 'akunTesting4', email: 'invalid-email', password: 'akunTesting4' };

    const dispatch = vi.fn();

    // action & assert
    await expect(asyncRegisterNewUser(invalidEmailData)(dispatch)).rejects.toThrow('Format email tidak valid!');
  });

  it('should throw an error when password is too short', async () => {
    // arrange
    const shortPasswordData = { name: 'akunTesting4', email: 'akunTesting4@gmail.com', password: 'short' };

    const dispatch = vi.fn();

    // action & assert
    await expect(asyncRegisterNewUser(shortPasswordData)(dispatch)).rejects.toThrow('Password minimal 8 karakter!');
  });

  it('should throw an error when API request fails', async () => {
    // arrange
    const validUserData = { name: 'akunTesting4', email: 'akunTesting4@gmail.com', password: 'akunTesting4' };

    api.register = vi.fn().mockRejectedValueOnce(new Error(fakeErrorMessage)); // Mock rejection

    const dispatch = vi.fn();

    // action & assert
    await expect(asyncRegisterNewUser(validUserData)(dispatch)).rejects.toThrow(fakeErrorMessage);
  });
});