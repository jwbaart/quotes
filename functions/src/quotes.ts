import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export const onQuoteUpdate = functions
  .region('europe-west1')
  .firestore.document('quotes/{quotesId}')
  .onUpdate((change, context) => {
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
  });

export const onQuoteCreate = functions
  .region('europe-west1')
  .firestore.document('quotes/{quotesId}')
  .onCreate((snap: DocumentSnapshot) => {
    const quote: any | undefined = snap.data();

    if (quote) {
      return snap.ref.set(
        {
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } else {
      return false;
    }
  });
