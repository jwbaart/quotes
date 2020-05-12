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

export default async (snapshot: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
  const quote: any | undefined = snapshot.data();

  if (quote) {
    return snapshot.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  } else {
    return false;
  }
};
