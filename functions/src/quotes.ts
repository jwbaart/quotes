import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onQuoteUpdate = functions
  .region('europe-west1')
  .firestore.document('quotes/{quotesId}')
  .onUpdate((change, context) => {
    const quote: any = change.after.data();
    const previousQuote: any = change.before.data();

    // TODO: refactor to make use of interface so it doesn't break on quote changes
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
