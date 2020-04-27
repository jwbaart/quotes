import { writeFile } from 'fs';

// import { name, version } from '../package.json';
require('dotenv').config();

const targetEnvironmentPath = './src/environments/environment.ts';
const targetFirebasePath = './firebase.config.js';

const firebaseEnvConfigFile = `module.exports = {
   apiKey: '${process.env.FIREBASE_API_KEY}',
   authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
   databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
   projectId: '${process.env.FIREBASE_PROJECT_ID}',
   storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
   messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
   appId: '${process.env.FIREBASE_APP_ID}',
   measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
}`;

const envConfigFile = `import * as firebase from './../../firebase.config.js';

export const environment = {
  production: ${process.env.ANGULAR_PRODUCTION},
  firebase
};
`;

// firebase config
writeFile(targetFirebasePath, firebaseEnvConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err);
  }
});

// angular environment config
writeFile(targetEnvironmentPath, envConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err);
  }
});
