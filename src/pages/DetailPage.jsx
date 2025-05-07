import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThreadDetail } from '../components/ThreadDetail';
import { Navigation } from '../components/Navigation';
import { Comments } from '../components/Comments';
import { CommentThreadInput } from '../components/CommentThreadInput';
import { asyncReceiveDetailThread } from '../states/detailThread/action';
import { asyncAddNewComment } from '../states/comment/action';

function DetailPage() {
  const { id: threadId } = useParams();
  const dispatch = useDispatch();

  const detailThread = useSelector((state) => state.detailThread);
  const comments = detailThread?.comments || [];

  useEffect(() => {
    if (threadId) {
      dispatch(asyncReceiveDetailThread(threadId));
    }
  }, [dispatch, threadId]);

  if (!detailThread) {
    return null;
  }

  const addComment = ({ content }) => {
    dispatch(asyncAddNewComment({ threadId, content }));
  };

  return (
    <section className='detail-page'>
      <ThreadDetail
        threadId={threadId}
        title={detailThread.title}
        body={detailThread.body}
        createdAt={detailThread.createdAt}
        owner={detailThread.owner}
      />

      <div className='split-to-right'>
        <div className='comments-section'>
          <h3>Tanggapan:</h3>
          <CommentThreadInput addComment={addComment} threadId={threadId} />
          <div className='comment-list'>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comments key={comment.id} comment={comment} threadId={threadId} />
              ))
            ) : (
              <div className='no-comment-info'>
                <label>Belum ada tanggapan.</label>
              </div>
            )}
          </div>
        </div>
        <Navigation />
      </div>
    </section>
  );
}

export { DetailPage };