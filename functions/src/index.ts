/*
 * Copyright 2020, Doug Stevenson
 *
 * Copying and distribution of this file, with or without modification, are
 * permitted in any medium without royalty, provided the copyright notice and
 * this notice are preserved. This file is offered as-is, without any warranty.
 */

// This should be the only import in index.ts, other than what you need to build
// these functions.
import * as functions from 'firebase-functions';

// HTTP trigger
// https://firebase.google.com/docs/functions/http-events

export const api = functions.region('europe-west1').https.onRequest(async (request, response) => {
  await (await import('./api/server')).default(request, response);
});

// Firestore triggers
// https://firebase.google.com/docs/functions/firestore-events

export const quoteOnCreateFn = functions
  .region('europe-west1')
  .firestore.document('quotes/{quotesId}')
  .onCreate(async (snapshot, context) => {
    await (await import('./quotes/on-create')).default(snapshot, context);
  });

export const quoteOnUpdateFn = functions
  .region('europe-west1')
  .firestore.document('quotes/{quotesId}')
  .onUpdate(async (change, context) => {
    await (await import('./quotes/onUpdate')).default(change, context);
  });

// Authentication trigger
// https://firebase.google.com/docs/functions/auth-events

export const authUserOnCreateFn = functions
  .region('europe-west1')
  .auth.user()
  .onCreate(async (user, context) => {
    await (await import('./auth-triggers/onCreate')).default(user, context);
  });
