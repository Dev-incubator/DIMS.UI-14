import firebase from 'firebase';
import firebaseConfig from './fb-config';

// collection names
export const USERS = 'users';
export const TASKS = 'tasks';

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
      userRef.update({
        tasks: newTasks,
      });
    })
    .then(() => {
      console.log(`TASK id:${taskID} was succesfully deleted from USER:${assUserID}`);
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
export const deleteUserFromTasks = (userToDelete) => {
  const assignedTasks = userToDelete.tasks;
  const userID = userToDelete.id;
  assignedTasks.forEach((taskObj) => {
    db.collection(TASKS)
      .doc(taskObj.id)
      .update({
        selectedUsers: firebase.firestore.FieldValue.arrayRemove(userID),
      })
      .then(() => {
        console.log(`USER id:${userID} was succeffully deleted from TASK id:${taskObj.id}`);
      })
      .catch((error) => {
        console.log('Error with deleting USER from TASKS: ', error);
      });
  });
};
