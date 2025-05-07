/**
 * test scenario for voteThreadReducer
 *
 * - voteThreadReducer function
 *  - should return initial state when given unknown action
 *  - should handle UPVOTE_THREAD correctly
 *  - should handle DOWNVOTE_THREAD correctly
 *  - should handle NEUTRALIZE_VOTE_THREAD correctly after upvote
 *  - should handle NEUTRALIZE_VOTE_THREAD correctly after downvote
 */

import { describe, it, expect } from 'vitest';
import { voteThreadReducer } from './reducer';
import { ActionType } from './action';

describe('voteThreadReducer function', () => {
  const threadId = 'thread-1';
  const userId = 'user-1';

  it('should return initial state when given unknown action', () => {
    // arrange
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = voteThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle UPVOTE_THREAD correctly', () => {
    // arrange
    const initialState = {
      [threadId]: {
        upVotesBy: [],
        downVotesBy: [],
      },
    };

    const action = {
      type: ActionType.UPVOTE_THREAD,
      payload: { threadId, userId },
    };

    // action
    const nextState = voteThreadReducer(initialState, action);

    // assert
    expect(nextState[threadId].upVotesBy).toContain(userId);
    expect(nextState[threadId].downVotesBy).not.toContain(userId);
  });

  it('should handle DOWNVOTE_THREAD correctly', () => {
    // arrange
    const initialState = {
      [threadId]: {
        upVotesBy: [],
        downVotesBy: [],
      },
    };

    const action = {
      type: ActionType.DOWNVOTE_THREAD,
      payload: { threadId, userId },
    };

    // action
    const nextState = voteThreadReducer(initialState, action);

    // assert
    expect(nextState[threadId].downVotesBy).toContain(userId);
    expect(nextState[threadId].upVotesBy).not.toContain(userId);
  });

  it('should handle NEUTRALIZE_VOTE_THREAD correctly after upvote', () => {
    // arrange
    const upvotedState = {
      [threadId]: {
        upVotesBy: [userId],
        downVotesBy: [],
      },
    };

    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: { threadId, userId },
    };

    // action
    const nextState = voteThreadReducer(upvotedState, action);

    // assert
    expect(nextState[threadId].upVotesBy).not.toContain(userId);
    expect(nextState[threadId].downVotesBy).not.toContain(userId);
  });

  it('should handle NEUTRALIZE_VOTE_THREAD correctly after downvote', () => {
    // arrange
    const downvotedState = {
      [threadId]: {
        upVotesBy: [],
        downVotesBy: [userId],
      },
    };

    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: { threadId, userId },
    };

    // action
    const nextState = voteThreadReducer(downvotedState, action);

    // assert
    expect(nextState[threadId].upVotesBy).not.toContain(userId);
    expect(nextState[threadId].downVotesBy).not.toContain(userId);
  });
});