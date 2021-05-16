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

export const getElementFromCollection = (collection, id) => db.collection(collection).doc(id).get();

export const getElementRefFromCollection = (collection, id) => db.collection(collection).doc(id);

export const getAllElementsFromCollection = (collection) => {
  return getCollection(collection)
    .then((elements) => {
      const elementsList = [];
      elements.forEach((element) => {
        elementsList.push(element.data());
      });

      return elementsList;
    })
    .catch((error) => {
      console.log(`Error reading collection:${collection} from DB`, error);
    });
};

export const createElemRef = (collection) => db.collection(collection).doc();

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

export const deleteElemFromDB = (collection, selectedID, callback) => {
  db.collection(collection)
    .doc(selectedID)
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
export const addTaskToUser = (newTaskID, assUserID) => {
  const newTaskObj = {
    status: 'Active',
    id: newTaskID,
    tracks: [],
  };
  getElementRefFromCollection(USERS, assUserID)
    .update({
      tasks: firebase.firestore.FieldValue.arrayUnion(newTaskObj),
    })
    .then(() => {
      console.log(`TASK id:${newTaskID} was succeffully added to USER id:${assUserID}`);
    })
    .catch((error) => {
      console.log('Error with adding TASK to USERS: ', error);
    });
};

export const deleteTaskFromUser = (taskID, assUserID) => {
  const userRef = getElementRefFromCollection(USERS, assUserID);
  userRef
    .get()
    .then((user) => {
      const newTasks = user.data().tasks.filter((task) => task.id !== taskID);
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          console.log(`TASK id:${taskID} was succesfully deleted from USER:${assUserID}`);
        });
    })
    .catch((error) => {
      console.log(`Error with deleting TASK id:${taskID} from USER id:${assUserID}`, error);
    });
};

export const editTaskInUsers = (usersToAssign, usersToUnassign, taskID) => {
  usersToUnassign.forEach((assUserID) => {
    deleteTaskFromUser(taskID, assUserID);
  });
  usersToAssign.forEach((assUserID) => {
    addTaskToUser(taskID, assUserID);
  });
};

// only for users
export const deleteUserFromTask = (userID, assTaskID) => {
  getElementRefFromCollection(TASKS, assTaskID)
    .update({
      selectedUsers: firebase.firestore.FieldValue.arrayRemove(userID),
    })
    .then(() => {
      console.log(`USER id:${userID} was succeffully deleted from TASK id:${assTaskID}`);
    })
    .catch((error) => {
      console.log(`Error with deleting USER id:${userID} from TASK id:${assTaskID} `, error);
    });
};

export const updateStatus = (userID, taskID, newStatus, callback) => {
  const userRef = getElementRefFromCollection(USERS, userID);
  userRef
    .get()
    .then((user) => {
      const newTasks = user.data().tasks.map((task) => {
        return task.id === taskID ? { ...task, status: newStatus } : task;
      });
      userRef
        .update({
          tasks: newTasks,
        })
        .then(() => {
          callback();
          console.log(`TASK id:${taskID} status:${newStatus} was succeffully updated in USER id:${userID}`);
        });
    })
    .catch((error) => {
      console.log(`Error with updating status:${newStatus} in TASK id:${taskID} in USER id:${userID} `, error);
    });
};

export const createTrack = (userID, taskID, newTrack, callback) => {
  const userRef = getElementRefFromCollection(USERS, userID);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const { tracks } = tasks.find((item) => item.id === taskID);
      tracks.push(newTrack);
      const newTasks = tasks.map((task) => {
        return task.id === taskID ? { ...task, tracks } : task;
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
          console.log(`TRACK id:${newTrack.id} from task id:${taskID} was succeffully added to USER id:${userID}`);
        });
    })
    .catch((error) => {
      console.log(`Error with adding TRACK id:${newTrack.id} from task id:${taskID} to USER id:${userID}`, error);
    });
};

export const editTrack = (userID, taskID, editedTrack, callback) => {
  const userRef = getElementRefFromCollection(USERS, userID);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const { tracks } = tasks.find((item) => item.id === taskID);
      const newTracks = tracks.map((track) => {
        return track.id === editedTrack.id ? editedTrack : track;
      });
      const newTasks = tasks.map((task) => {
        return task.id === taskID ? { ...task, tracks: newTracks } : task;
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
          console.log(`TRACK id:${editedTrack.id} from task id:${taskID} was succeffully updated in USER id:${userID}`);
        });
    })
    .catch((error) => {
      console.log(`Error with updating TRACK id:${editedTrack.id} from task id:${taskID} in USER id:${userID}`, error);
    });
};

export const deleteTrack = (userID, taskID, trackID, callback) => {
  const userRef = getElementRefFromCollection(USERS, userID);
  userRef
    .get()
    .then((user) => {
      const { tasks } = user.data();
      const { tracks } = tasks.find((item) => item.id === taskID);
      const newTracks = tracks.filter((track) => track.id !== trackID);
      const newTasks = tasks.map((task) => {
        return task.id === taskID ? { ...task, tracks: newTracks } : task;
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
          console.log(`TRACK id:${trackID} from task id:${taskID} was succeffully deleted from USER id:${userID}`);
        });
    })
    .catch((error) => {
      console.log(`Error with deleting TRACK id:${trackID} from task id:${taskID} in USER id:${userID}`, error);
    });
};
