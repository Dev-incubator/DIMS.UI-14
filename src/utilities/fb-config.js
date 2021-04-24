const projectId = process.env.REACT_APP_FIREBASE_PROJECTID;
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  projectId,
  authDomain: `${projectId}.firebaseapp.com`,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: 'G-2WLX00Z8TW',
};
