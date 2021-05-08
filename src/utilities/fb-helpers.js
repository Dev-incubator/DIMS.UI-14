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

export const setElemToDB = (ref, data) => ref.set(data);

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
      console.log('Document successfully written!');
    })
    .catch((error) => {
      console.log('Error writting document: ', error);
    });
};
