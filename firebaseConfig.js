
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBwdDdW4rclS90sC8igGOZT5dl0aI5HCyM",
  authDomain: "todo-list-aea66.firebaseapp.com",
  databaseURL: "https://todo-list-aea66-default-rtdb.firebaseio.com",
  projectId: "todo-list-aea66",
  storageBucket: "todo-list-aea66.appspot.com",
  messagingSenderId: "330040594572",
  appId: "1:330040594572:web:65c2433d9773135435aba9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
