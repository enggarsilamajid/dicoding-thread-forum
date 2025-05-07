/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given an unknown action
 *  - should set authUser when given SET_AUTH_USER action
 *  - should unset authUser when given UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import { authUserReducer } from './reducer';
import { ActionType } from './action';

describe('authUserReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should set authUser when given SET_AUTH_USER action', () => {
    const initialState = null;
    const user = { id: 'user-1', name: 'Alice' };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: user },
    };
    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(user);
  });

  it('should unset authUser when given UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-1', name: 'Alice' };
    const action = { type: ActionType.UNSET_AUTH_USER };
    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(null);
  });
});