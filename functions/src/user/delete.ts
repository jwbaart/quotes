import * as functions from 'firebase-functions';
import { ROLE } from '../auth-triggers/onCreate';
import { deleteUser } from '../api/helpers/firebase';
import { deleteAuthUser } from '../api/helpers/auth';

export enum STATUS {
  FAILED = 'failed',
  SUCCESS = 'success'
}

export default async (data: any, context: functions.https.CallableContext) => {
  const { uid } = data;

  const isUidInvalid = !(uid && uid.length);
  const isNonAdmin = context.auth?.token.role !== ROLE.ADMIN;

  if (isUidInvalid) {
    console.error('user - delete - missing uid: ', uid);
    throw new functions.https.HttpsError('invalid-argument', 'missing uid');
  }

  if (isNonAdmin) {
    console.error('user - delete -  non admin');
    throw new functions.https.HttpsError('permission-denied', 'client has invalid role');
  }

  try {
    await Promise.all([deleteUser(uid), deleteAuthUser(uid)]);

    return {
      status: STATUS.SUCCESS
    };
  } catch (error) {
    console.error('user - delete - setCustomUserClaims failed', error);
    throw new functions.https.HttpsError('internal', 'failed');
  }
};
