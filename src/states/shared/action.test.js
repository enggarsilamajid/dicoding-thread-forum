/**
 * test scenario for asyncPopulateUsersAndThreadsAndComments thunk
 *
 * - asyncPopulateUsersAndThreadsAndComments thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPopulateUsersAndThreadsAndComments } from './action';
import { api } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveAllThreadsActionCreator } from '../threads/action';
import { receiveAllUsersActionCreator } from '../users/action';
import { receiveCommentsActionCreator } from '../comment/action';

const fakeUsers = [
  { id: 'user-1', name: 'Alice', avatar: 'https://avatar1.com' },
  { id: 'user-2', name: 'Bob', avatar: 'https://avatar2.com' },
  { id: 'user-3', name: 'Charlie', avatar: 'https://avatar3.com' },
];

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    totalComments: 2,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'Tech',
    createdAt: '2021-06-22T07:00:00.000Z',
    ownerId: 'user-2',
    upVotesBy: [],
    downVotesBy: ['user-1'],
    totalComments: 1,
  },
];

const fakeComments = [
  {
    id: 'comment-1',
    content: 'Nice thread!',
    upVotesBy: ['user-2'],
    downVotesBy: [],
    createdAt: '2021-06-21T08:00:00.000Z',
  },
  {
    id: 'comment-2',
    content: 'Interesting!',
    upVotesBy: ['user-1'],
    downVotesBy: [],
    createdAt: '2021-06-22T08:00:00.000Z',
  },
];

const fakeDetailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: ['user-2'],
  downVotesBy: [],
  comments: fakeComments,
};

const fakeErrorResponse = new Error('Ups! Something went wrong');

describe('asyncPopulateUsersAndThreadsAndComments thunk', () => {
  beforeEach(() => {
    api._seeAllUsers = api.seeAllUsers;
    api._seeAllThreads = api.seeAllThreads;
    api._seeDetailThread = api.seeDetailThread;
  });

  afterEach(() => {
    api.seeAllUsers = api._seeAllUsers;
    api.seeAllThreads = api._seeAllThreads;
    api.seeDetailThread = api._seeDetailThread;

    // delete backup data
    delete api._seeAllUsers;
    delete api._seeAllThreads;
    delete api._seeDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.seeAllUsers = () => Promise.resolve(fakeUsers);
    api.seeAllThreads = () => Promise.resolve(fakeThreads);
    api.seeDetailThread = () => Promise.resolve(fakeDetailThread);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreadsAndComments()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveAllUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveAllThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(
      receiveCommentsActionCreator(
        expect.arrayContaining([
          expect.objectContaining({ ...fakeComments[0], threadId: 'thread-1' }),
          expect.objectContaining({ ...fakeComments[1], threadId: 'thread-1' }),
        ])
      )
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // mock an error in the api call
    api.seeAllUsers = () => Promise.reject(fakeErrorResponse);
    api.seeAllThreads = () => Promise.reject(fakeErrorResponse);
    api.seeDetailThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock allert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreadsAndComments()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
