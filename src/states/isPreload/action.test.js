/**
 * test scenario for asyncRegisterNewUser thunk
 *
 * - asyncPreloadProcess thunk
 *   - should dispatch actions correctly when user is authenticated
 *   - should dispatch actions correctly when token is not available
 *   - should handle error correctly and dispatch actions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPreloadProcess } from './action';
import { api } from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setIsPreloadActionCreator } from './action';

// data palsu untuk user
const fakeAuthUser = { id: 'user-1', name: 'akunTesting4' };
const fakeError = new Error('Failed to fetch user profile');

describe('asyncPreloadProcess thunk', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    // backup api
    api._getAccessToken = api.getAccessToken;
    api._seeOwnProfile = api.seeOwnProfile;
  });

  afterEach(() => {
    // restore api
    api.getAccessToken = api._getAccessToken;
    api.seeOwnProfile = api._seeOwnProfile;
    delete api._getAccessToken;
    delete api._seeOwnProfile;
  });

  it('should dispatch actions correctly when user is authenticated', async () => {
    // arrange
    api.getAccessToken = vi.fn().mockReturnValue('fake-token');
    api.seeOwnProfile = vi.fn().mockResolvedValue(fakeAuthUser);

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions correctly when token is not available', async () => {
    // arrange
    api.getAccessToken = vi.fn().mockReturnValue(null);
    api.seeOwnProfile = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle error correctly and dispatch actions', async () => {
    // arrange
    api.getAccessToken = vi.fn().mockReturnValue('fake-token');
    api.seeOwnProfile = vi.fn().mockRejectedValue(fakeError);

    window.alert = vi.fn(); // Mock alert

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});