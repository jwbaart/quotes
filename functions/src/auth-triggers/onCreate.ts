/*
 * Copyright 2020, Doug Stevenson
 *
 * Copying and distribution of this file, with or without modification, are
 * permitted in any medium without royalty, provided the copyright notice and
 * this notice are preserved. This file is offered as-is, without any warranty.
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.firestore();

export enum ROLE {
  UNKNOWN = 'unknown',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}

export default async (event: functions.auth.UserRecord, context: functions.EventContext) => {
  const userRef = db.doc(`users/${event.uid}`);
  const role = ROLE.UNKNOWN;
  const uid = event.uid;
  const forceRefreshToken = false;

  return userRef
    .set({
      name: event.displayName,
      createdAt: context.timestamp,
      photoURL: event.photoURL,
      role,
      uid,
      forceRefreshToken
    })
    .then(() => admin.auth().setCustomUserClaims(uid, { role }))
    .then(() => admin.auth().getUser(uid))
    .then(() => null);
};
