import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { authUserReducer } from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import { detailThreadReducer } from './detailThread/reducer';
import { commentsReducer } from './comment/reducer';
import { threadsReducer } from './threads/reducer';
import { usersReducer } from './users/reducer';
import { voteCommentReducer } from './voteComment/reducer';
import { voteThreadReducer } from './voteThread/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    comments: commentsReducer,
    loadingBar: loadingBarReducer,
    voteThread: voteThreadReducer,
    voteComment: voteCommentReducer,
  },
});

export { store };