import { writeFile } from 'fs';
import { envConfigFile } from './write-angular-env';

const targetEnvironmentPath = './dist/quotes/env.js';

writeFile(targetEnvironmentPath, envConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err);
  }
});
