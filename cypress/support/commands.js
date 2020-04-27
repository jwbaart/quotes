import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';
import * as firebaseConfig from './../../firebase.config.js';

window.fbInstance = firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
