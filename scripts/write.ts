import { writeFile as fsWriteFile } from 'fs';

export const writeFile = (path, file) => {
  fsWriteFile(path, file, 'utf8', err => {
    if (err) {
      return console.log(err);
    }
  });
};
