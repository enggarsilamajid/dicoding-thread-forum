function receiveLeaderboard(state) {
  const { users, threads, comments } = state;

  const scores = {};

  Object.values(users).forEach((user) => {
    scores[user.id] = {
      userId: user.id,
      name: user.name,
      avatar: user.avatar,
      threadScore: 0,
      commentScore: 0,
      totalScore: 0
    };
  });

  threads.forEach((thread) => {
    const { ownerId, upVotesBy = [], downVotesBy = [] } = thread;
    const score = upVotesBy.length - downVotesBy.length;

    if (scores[ownerId]) {
      scores[ownerId].threadScore += score;
      scores[ownerId].totalScore += score;
    }
  });

  Object.values(comments).forEach((comment) => {
    const { ownerId, upVotesBy = [], downVotesBy = [] } = comment;
    const score = upVotesBy.length - downVotesBy.length;

    if (scores[ownerId]) {
      scores[ownerId].commentScore += score;
      scores[ownerId].totalScore += score;
    }
  });

  return Object.values(scores)
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 15);
}

export { receiveLeaderboard };