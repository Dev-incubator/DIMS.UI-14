import firebase from 'firebase';
import firebaseConfig from './fb-config';

// collection names
export const USERS = 'users';
export const TASKS = 'tasks';

// init
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// helpers
export const getCollection = (collection) => db.collection(collection).get();

export const getElementFromCollection = (collection, id) => db.collection(collection).doc(id).get();
export const getElementRefFromCollection = (collection, id) => db.collection(collection).doc(id);

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

export const addTaskToUsers = (newTask) => {
  const assignedUsersIDs = newTask.selectedUsers;
  const newTaskObj = {
    status: 'Active',
    id: newTask.id,
    tracks: [],
  };
  assignedUsersIDs.forEach((userID) => {
    getElementRefFromCollection(USERS, userID)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(newTaskObj),
      })
      .then(() => {
        console.log(`TASK id:${newTaskObj.id} was succeffully added to USER id:${userID}`);
      })
      .catch((error) => {
        console.log('Error with adding TASK to USERS: ', error);
      });
  });
};

export const deleteTaskFromUsers = (taskToDelete) => {
  const assignedUsersIDs = taskToDelete.selectedUsers;
  const taskID = taskToDelete.id;
  assignedUsersIDs.forEach((userID) => {
    const userRef = getElementRefFromCollection(USERS, userID);
    userRef
      .get()
      .then((user) => {
        const newTasks = user.data().tasks.filter((task) => task.id !== taskID);
        userRef.update({
          tasks: newTasks,
        });
      })
      .then(() => {
        console.log(`TASK id:${taskID} was succesfully deleted from USER:${userID}`);
      })
      .catch((error) => {
        console.log(`Error with deleting TASK id:${taskID} from USER id:${userID}`, error);
      });
  });
};

export const editTaskInUsers = (prevTask, editedTask) => {
  deleteTaskFromUsers(prevTask);
  addTaskToUsers(editedTask);
  console.log(`TASK id:${prevTask.id} was sucessfully edited in assigned USERS`);
};

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
