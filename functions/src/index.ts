import * as admin from 'firebase-admin';

admin.initializeApp();

export { createUserRecord } from './auth';
export { onQuoteUpdate } from './quotes';
