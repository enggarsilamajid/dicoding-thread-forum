import { api } from '../../utils/api';
import { receiveAllThreadsActionCreator } from '../threads/action';
import { receiveAllUsersActionCreator } from '../users/action';
import { receiveCommentsActionCreator } from '../comment/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function asyncPopulateUsersAndThreadsAndComments() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.seeAllUsers();
      const threads = await api.seeAllThreads();

      const allComments = [];
      for (const thread of threads) {
        const detail = await api.seeDetailThread(thread.id);

        const commentsWithThreadId = detail.comments.map((comment) => ({
          ...comment,
          threadId: thread.id,
        }));

        allComments.push(...commentsWithThreadId);
      }

      dispatch(receiveAllUsersActionCreator(users));
      dispatch(receiveAllThreadsActionCreator(threads));
      dispatch(receiveCommentsActionCreator(allComments));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreadsAndComments };