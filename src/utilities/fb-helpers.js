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

export const createElemRef = (collection) => db.collection(collection).doc();

export const setElemToDB = (ref, data) =>
  ref
    .set(data)
    .then(() => {
      console.log('Element was successfully created!');
    })
    .catch((error) => {
      console.error('Error with creating document: ', error);
    });

export const deleteElemFromDB = (collection, selectedID) => {
  db.collection(collection)
    .doc(selectedID)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const editElemInDB = (collection, editedElem) => {
  db.collection(collection)
    .doc(editedElem.id)
    .set(editedElem)
    .then(() => {
      console.log('Document successfully edited!');
    })
    .catch((error) => {
      console.log('Error editing document: ', error);
    });
};

export const addTaskToUsers = (newTask) => {
  const assignedUsersIDs = newTask.selectedUsers;
  const newTaskID = newTask.id;
  assignedUsersIDs.forEach((id) => {
    db.collection(USERS)
      .doc(id)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(newTaskID),
      })
      .then(() => {
        console.log(`TASK id:${newTaskID} was succeffully added to USER id:${id}`);
      })
      .catch((error) => {
        console.log('Error with adding TASK to USERS: ', error);
      });
  });
};

export const deleteTaskFromUsers = (taskToDelete) => {
  const assignedUsers = taskToDelete.selectedUsers;
  const taskID = taskToDelete.id;
  assignedUsers.forEach((item) => {
    db.collection(USERS)
      .doc(item)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(taskID),
      })
      .then(() => {
        console.log(`TASK id:${taskID} was succeffully deleted from USER id:${item}`);
      })
      .catch((error) => {
        console.log('Error with deleting TASK from USERS: ', error);
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
  assignedTasks.forEach((id) => {
    db.collection(TASKS)
      .doc(id)
      .update({
        selectedUsers: firebase.firestore.FieldValue.arrayRemove(userID),
      })
      .then(() => {
        console.log(`USER id:${userID} was succeffully deleted from TASK id:${id}`);
      })
      .catch((error) => {
        console.log('Error with deleting USER from TASKS: ', error);
      });
  });
};
