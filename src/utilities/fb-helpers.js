import firebase from 'firebase';
import firebaseConfig from './fb-config';

// collection names
export const USERS = 'users';
export const TASKS = 'tasks';
export const TRACKS = 'tracks';

// init
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// common
export const getCollection = (collection) => db.collection(collection).get();

export const getElementFromCollection = (collection, id) => getElementRefFromCollection(collection, id).get();

export const getElementRefFromCollection = (collection, id) => db.collection(collection).doc(id);

export async function getAllElementsFromCollection(collection) {
  const elements = await getCollection(collection);
  const elementsList = [];
  elements.forEach((element) => {
    elementsList.push(element.data());
  });

  return elementsList;
}

export async function getLoggedUserByEmail(email) {
  const usersList = await getAllElementsFromCollection(USERS);

  return usersList.find((user) => user.email === email);
}

export const createElemRefOnDB = (collection) => db.collection(collection).doc();

export const setElemToDB = (ref, data, callback) =>
  ref
    .set(data)
    .then(() => {
      callback();
      console.log('Element was successfully created!');
    })
    .catch((error) => {
      console.error('Error with creating document: ', error);
    });

export const deleteElemFromDB = (collection, selectedId, callback) => {
  db.collection(collection)
    .doc(selectedId)
    .delete()
    .then(() => {
      callback();
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const editElemInDB = (collection, editedElem, callback) => {
  db.collection(collection)
    .doc(editedElem.id)
    .set(editedElem)
    .then(() => {
      callback();
      console.log('Document successfully edited!');
    })
    .catch((error) => {
      console.log('Error editing document: ', error);
    });
};

// only for tasks
export const addTaskToUser = (newTaskId, assignedUserId) => {
  const newTaskObj = {
    status: 'Active',
    id: newTaskId,
    tracks: [],
  };
  getElementRefFromCollection(USERS, assignedUserId)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion(newTaskObj),
    })
    .then(() => {
      console.log(`TASK id:${newTaskId} was succeffully added to USER id:${assignedUserId}`);
    })
    .catch((error) => {
      console.log('Error with adding TASK to USERS: ', error);
    });
};

export const deleteTaskFromUser = (taskId, assignedUserId) => {
  const userRef = getElementRefFromCollection(USERS, assignedUserId);
  userRef
    .get()
    .then((user) => {
      const newTasks = user.data().tasks.filter((task) => task.id !== taskId);
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          console.log(`TASK id:${taskId} was succesfully deleted from USER:${assignedUserId}`);
        });
    })
    .catch((error) => {
      console.log(`Error with deleting TASK id:${taskId} from USER id:${assignedUserId}`, error);
    });
};

export const editTaskInUsers = (usersToAssign, usersToUnassign, taskId) => {
  usersToUnassign.forEach((assignedUserId) => {
    deleteTaskFromUser(taskId, assignedUserId);
  });
  usersToAssign.forEach((assignedUserId) => {
    addTaskToUser(taskId, assignedUserId);
  });
};

export async function getTasks(array) {
  const tasksList = [];
  await Promise.all(
    array.map(async (item) => {
      const task = await getElementFromCollection(TASKS, item.id);
      tasksList.push(task.data());
    }),
  );

  return tasksList;
}

// only for users
export const deleteUserFromTask = (userId, assignedTaskId) => {
  getElementRefFromCollection(TASKS, assignedTaskId)
    .update({
      selectedUsers: firebase.firestore.FieldValue.arrayRemove(userId),
    })
    .then(() => {
      console.log(`USER id:${userId} was succeffully deleted from TASK id:${assignedTaskId}`);
    })
    .catch((error) => {
      console.log(`Error with deleting USER id:${userId} from TASK id:${assignedTaskId} `, error);
    });
};

export const updateStatus = (userId, taskId, newStatus, callback) => {
  const userRef = getElementRefFromCollection(USERS, userId);
  userRef
    .get()
    .then((user) => {
      const newTasks = user.data().tasks.map((task) => {
        return task.id === taskId ? { ...task, status: newStatus } : task;
      });
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          callback();
          console.log(`TASK id:${taskId} status:${newStatus} was succeffully updated in USER id:${userId}`);
        });
    })
    .catch((error) => {
      console.log(`Error with updating status:${newStatus} in TASK id:${taskId} in USER id:${userId} `, error);
    });
};

// only for tracks
export const createTrack = (userId, taskId, newTrack, callback) => {
  const userRef = getElementRefFromCollection(USERS, userId);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const tracks = getTracksWithoutRequest(tasks, taskId);
      tracks.push(newTrack);
      const newTasks = tasks.map((task) => {
        return task.id === taskId ? { ...task, tracks } : task;
      });

      return newTasks;
    })
    .then((newTasks) => {
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          callback();
          console.log(`TRACK id:${newTrack.id} from task id:${taskId} was succeffully added to USER id:${userId}`);
        });
    })
    .catch((error) => {
      console.log(`Error with adding TRACK id:${newTrack.id} from task id:${taskId} to USER id:${userId}`, error);
    });
};

export const editTrack = (userId, taskId, editedTrack, callback) => {
  const userRef = getElementRefFromCollection(USERS, userId);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const tracks = getTracksWithoutRequest(tasks, taskId);
      const newTracks = tracks.map((track) => {
        return track.id === editedTrack.id ? editedTrack : track;
      });
      const newTasks = tasks.map((task) => {
        return task.id === taskId ? { ...task, tracks: newTracks } : task;
      });

      return newTasks;
    })
    .then((newTasks) => {
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          callback();
          console.log(`TRACK id:${editedTrack.id} from task id:${taskId} was succeffully updated in USER id:${userId}`);
        });
    })
    .catch((error) => {
      console.log(`Error with updating TRACK id:${editedTrack.id} from task id:${taskId} in USER id:${userId}`, error);
    });
};

export const deleteTrack = (userId, taskId, trackId, callback) => {
  const userRef = getElementRefFromCollection(USERS, userId);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const tracks = getTracksWithoutRequest(tasks, taskId);
      const newTracks = tracks.filter((track) => track.id !== trackId);
      const newTasks = tasks.map((task) => {
        return task.id === taskId ? { ...task, tracks: newTracks } : task;
      });

      return newTasks;
    })
    .then((newTasks) => {
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          callback();
          console.log(`TRACK id:${trackId} from task id:${taskId} was succeffully deleted from USER id:${userId}`);
        });
    })
    .catch((error) => {
      console.log(`Error with deleting TRACK id:${trackId} from task id:${taskId} in USER id:${userId}`, error);
    });
};

export async function getTracks(userId, taskId) {
  const user = await getElementFromCollection(USERS, userId);
  const { tracks } = await user.data().tasks.find((item) => item.id === taskId);

  return tracks;
}

async function getTracksWithoutRequest(tasks, taskId) {
  const { tracks } = tasks.find((item) => item.id === taskId);

  return tracks;
}

export async function getAllTracksFromAllTasks(tasks) {
  const allTracks = tasks.reduce(async (result, task) => {
    const taskData = await getElementFromCollection(TASKS, task.id);
    const { title } = taskData.data();
    const extendedTracks = await Promise.all(task.tracks.map((track) => ({ ...track, title })));

    return (await result).concat(extendedTracks);
  }, []);

  return allTracks;
}

export const createAuthForNewUser = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(`USER with email:${email} was succesfully added to auth`);
    const { user } = userCredential;
    await user.sendEmailVerification();
    console.log(`Verification email was sent to USER with email: ${email}`);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const { user } = userCredential;

    return user;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);

    return error;
  }
};
