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
};

window.fbInstance = firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
