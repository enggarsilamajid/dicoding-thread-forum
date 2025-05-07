/**
 * test scenario for asyncReceiveDetailThread thunk
 *
 * - asyncReceiveDetailThread thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncReceiveDetailThread } from './action';
import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ActionType } from './action';

const fakeDetailThread = {
  id: 'thread-1',
  title: 'Thread 1',
  body: 'This is a thread',
  userId: 'user-1',
  upVotesBy: ['user-2'],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Nice!',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      createdAt: '2021-06-22T07:00:00.000Z',
    },
  ],
};

const expectedThreadWithVotes = {
  ...fakeDetailThread,
  upVotesBy: ['user-2'],
  downVotesBy: [],
  comments: [
    {
      ...fakeDetailThread.comments[0],
      hasUpVoted: true,
      hasDownVoted: false,
    },
  ],
};

const fakeError = new Error('Failed to fetch');

describe('asyncReceiveDetailThread thunk', () => {
  beforeEach(() => {
    api._seeDetailThread = api.seeDetailThread;
  });

  afterEach(() => {
    api.seeDetailThread = api._seeDetailThread;
    delete api._seeDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.seeDetailThread = () => Promise.resolve(fakeDetailThread);
    const dispatch = vi.fn();

    // action
    await asyncReceiveDetailThread('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.CLEAR_DETAIL_THREAD,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: expectedThreadWithVotes,
      },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching failed', async () => {
    // arrange
    api.seeDetailThread = () => Promise.reject(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncReceiveDetailThread('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.CLEAR_DETAIL_THREAD,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
  });
});