import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { app as generateQuoteImage } from './api/generate-quote-image';
// import { app as setCustomClaims } from './api/set-custom-claims';

admin.initializeApp();

export { createUserRecord } from './auth';
export { onQuoteUpdate, onQuoteCreate } from './quotes';

const app = express();

app.use(cors({ origin: true }));
app.use('/generate', generateQuoteImage);
// app.use('/setCustomClaims', setCustomClaims);

exports.api = functions.region('europe-west1').https.onRequest(app);
