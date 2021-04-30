import firebase from 'firebase';
import firebaseConfig from './fb-config';

// collection names
export const USERS = 'users';
export const TASKS = 'tasks';

// init
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

// helpers
export const createUserRef = () => db.collection(USERS).doc();
export const setDataToDB = (ref, data) => ref.set(data);
