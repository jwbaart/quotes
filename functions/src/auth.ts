import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export enum ROLE {
  UNKNOWN = 'unknown'
}

export const createUserRecord = functions
  .region('europe-west1')
  .auth.user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);
    const role = ROLE.UNKNOWN;
    const uid = user.uid;

    return userRef
      .set({
        name: user.displayName,
        createdAt: context.timestamp,
        photoURL: user.photoURL,
        role,
        uid
      })
      .then(() => admin.auth().setCustomUserClaims(uid, { role }))
      .then(() => admin.auth().getUser(uid))
      .then(() => null);
  });
