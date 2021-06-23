export const createUserFullName = (user) => `${user.username} ${user.surname}`;

export const getTaskDataById = (state, taskId) => state.tasks.tasksList.find((task) => task.id === taskId);

export const getUserDataById = (state, userId) => state.users.usersList.find((user) => user.id === userId);

export const getTaskTracksById = (state, userId, taskId) => {
  const { tracks } = state.users.usersList.find((user) => user.id === userId).tasks.find((task) => task.id === taskId);

  return tracks;
};

export const getAllTracksWithTaskTitle = (state, user) => {
  return user.tasks.reduce((result, taskWithTrack) => {
    const { title } = state.tasks.tasksList.find((task) => task.id === taskWithTrack.id);
    const extendedTracks = taskWithTrack.tracks.map((track) => ({ ...track, title }));

    return result.concat(extendedTracks);
  }, []);
};

export const getUserTasks = (state, user) =>
  user.tasks.map((taskWithStatus) => state.tasks.tasksList.find((task) => task.id === taskWithStatus.id));
