import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onQuoteUpdate = functions.firestore.document('quotes/{quotesId}').onUpdate((change, context) => {
  const quote = change.after.data() || {};
  const previousQuote = change.before.data() || {};

  if (!quote.hasOwnProperty('updatedAt') || quote.updatedAt !== previousQuote.updatedAt) {
    return change.after.ref.set(
      {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  } else {
    return false;
  }
});
