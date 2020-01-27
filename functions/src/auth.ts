import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions
  .region('europe-west1')
  .auth.user()
  .onCreate((user, context) => {
    const userRef = db.doc(`users/${user.uid}`);
    return userRef.set({
      name: user.displayName,
      createdAt: context.timestamp,
      photoURL: user.photoURL,
      role: 'unknown',
      uid: user.uid
    });
  });
