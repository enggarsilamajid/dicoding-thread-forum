import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThreadsList } from '../components/ThreadsList';
import { AddThreadInput } from '../components/AddThreadInput';
import { Navigation } from '../components/Navigation';
import { asyncPopulateUsersAndThreadsAndComments } from '../states/shared/action';
import { asyncAddNewThread } from '../states/threads/action';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreadsAndComments());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddNewThread({ title, body, category }));
  };

  return (
    <section className='home-page'>
      <ThreadsList threads={threadsList} comments={comments} />
      <div className='split-to-right'>
        <AddThreadInput addThread={onAddThread} />
        <Navigation />
      </div>
    </section>
  );
}

export { HomePage };