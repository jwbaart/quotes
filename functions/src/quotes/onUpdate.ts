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

export default async (
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  context: functions.EventContext
) => {
  const quote: any | undefined = change.after.data();
  const previousQuote: any = change.before.data();

  // TODO: refactor to make use of interface so it breaks on quote changes
  if (
    quote.title !== previousQuote.title ||
    quote.text !== previousQuote.text ||
    quote.children.ben !== previousQuote.children.ben ||
    quote.children.tom !== previousQuote.children.tom ||
    quote.datestamp.seconds !== previousQuote.datestamp.seconds ||
    quote.datestamp.nanoseconds !== previousQuote.datestamp.nanoseconds
  ) {
    return change.after.ref.set(
      {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  } else {
    return false;
  }
};
