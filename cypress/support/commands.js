import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyChbq_QZWOqFmzIaxvavCOYSkkjHpIWfhk',
  authDomain: 'quotes-staging-d5139.firebaseapp.com',
  databaseURL: 'https://quotes-staging-d5139.firebaseio.com',
  projectId: 'quotes-staging-d5139',
  storageBucket: 'quotes-staging-d5139.appspot.com',
  messagingSenderId: '1046709377310',
  appId: '1:1046709377310:web:296271dd69215183cd110f'
  // apiKey: 'AIzaSyA0ylyVvI-yy2yh4t91bWV8gld-77ZocrM',
  // authDomain: 'quotes-dev-802a5.firebaseapp.com',
  // databaseURL: 'https://quotes-dev-802a5.firebaseio.com',
  // projectId: 'quotes-dev-802a5',
  // storageBucket: 'quotes-dev-802a5.appspot.com',
  // messagingSenderId: '814898657900',
  // appId: '1:814898657900:web:3c7c9d3a0e7fe771ad7649'
};

window.fbInstance = firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
