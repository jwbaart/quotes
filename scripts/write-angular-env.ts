import { firebaseConfig } from './write-firebase-env';
import { writeFile } from './write';

const targetEnvironmentPath = './src/env.js';
export const envConfigFile = `(function (window) {
    window.__env = window.__env || {};

    window.__env.production = ${process.env.ANGULAR_PRODUCTION};
    window.__env.firebase = ${JSON.stringify(firebaseConfig)}
  }(this));
  `;

writeFile(targetEnvironmentPath, envConfigFile);
