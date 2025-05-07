import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div>
      <LoadingBar progressIncrease={1} showFastActions updateTime={100} />
    </div>
  );
}

export { Loading };