/**
 * test scenario for detailThreadReducer
 *
 * - detailThreadReducer function
 *  - should return thread when RECEIVE_DETAIL_THREAD is dispatched
 *  - should clear thread when CLEAR_DETAIL_THREAD is dispatched
 *  - should handle UPVOTE_COMMENT
 *  - should handle DOWNVOTE_COMMENT
 *  - should handle NEUTRALIZE_VOTE_COMMENT
 *  - should handle UPVOTE_THREAD
 *  - should handle DOWNVOTE_THREAD
 *  - should handle NEUTRALIZE_VOTE_THREAD
 *  - should return current state when action type is unknown
 */

import { describe, it, expect } from 'vitest';
import { detailThreadReducer } from './reducer';
import { ActionType as VoteCommentActionType } from '../voteComment/action';
import { ActionType as VoteThreadActionType } from '../voteThread/action';

describe('detailThreadReducer', () => {
  const initialThread = {
    id: 'thread-1',
    title: 'First thread',
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'First comment',
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return thread when RECEIVE_DETAIL_THREAD is dispatched', () => {
    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: { detailThread: initialThread },
    };
    const nextState = detailThreadReducer(null, action);

    expect(nextState).toEqual(initialThread);
  });

  it('should clear thread when CLEAR_DETAIL_THREAD is dispatched', () => {
    const action = { type: 'CLEAR_DETAIL_THREAD' };
    const nextState = detailThreadReducer(initialThread, action);

    expect(nextState).toBe(null);
  });

  it('should handle UPVOTE_COMMENT', () => {
    const action = {
      type: VoteCommentActionType.UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const state = detailThreadReducer(initialThread, action);
    expect(state.comments[0].upVotesBy).toContain('user-1');
    expect(state.comments[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle DOWNVOTE_COMMENT', () => {
    const action = {
      type: VoteCommentActionType.DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-2' },
    };

    const state = detailThreadReducer(initialThread, action);
    expect(state.comments[0].downVotesBy).toContain('user-2');
    expect(state.comments[0].upVotesBy).not.toContain('user-2');
  });

  it('should handle NEUTRALIZE_VOTE_COMMENT', () => {
    const preVotedState = {
      ...initialThread,
      comments: [
        {
          ...initialThread.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: ['user-2'],
        },
      ],
    };

    const action = {
      type: VoteCommentActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const state = detailThreadReducer(preVotedState, action);
    expect(state.comments[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle UPVOTE_THREAD', () => {
    const action = {
      type: VoteThreadActionType.UPVOTE_THREAD,
      payload: { userId: 'user-3' },
    };

    const state = detailThreadReducer(initialThread, action);
    expect(state.upVotesBy).toContain('user-3');
    expect(state.downVotesBy).not.toContain('user-3');
  });

  it('should handle DOWNVOTE_THREAD', () => {
    const action = {
      type: VoteThreadActionType.DOWNVOTE_THREAD,
      payload: { userId: 'user-4' },
    };

    const state = detailThreadReducer(initialThread, action);
    expect(state.downVotesBy).toContain('user-4');
    expect(state.upVotesBy).not.toContain('user-4');
  });

  it('should handle NEUTRALIZE_VOTE_THREAD', () => {
    const preVotedState = {
      ...initialThread,
      upVotesBy: ['user-3'],
      downVotesBy: ['user-4'],
    };

    const action = {
      type: VoteThreadActionType.NEUTRALIZE_VOTE_THREAD,
      payload: { userId: 'user-3' },
    };

    const state = detailThreadReducer(preVotedState, action);
    expect(state.upVotesBy).not.toContain('user-3');
  });

  it('should return current state when action type is unknown', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = detailThreadReducer(initialThread, action);
    expect(state).toBe(initialThread);
  });
});