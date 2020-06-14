import * as functions from 'firebase-functions';
import { ROLE } from '../auth-triggers/onCreate';
import { updateUser } from '../api/helpers/firebase';
import { setCustomUserClaims } from '../api/helpers/auth';

export enum STATUS {
  FAILED = 'failed',
  SUCCESS = 'success'
}

export default async (data: any, context: functions.https.CallableContext) => {
  console.log(data);
  const { role, uid } = data;

  const isUnknownRole = !Object.values(ROLE).includes(role);
  const isUidInvalid = !(uid && uid.length);
  const isNonAdmin = context.auth?.token.role !== ROLE.ADMIN;

  if (isUnknownRole) {
    console.error('setRole - unknown role: ', role);
    throw new functions.https.HttpsError('invalid-argument', 'setRole - unknown role: ' + role);
  }

  if (isUidInvalid) {
    console.error('setRole -  missing uid: ', uid);
    throw new functions.https.HttpsError('invalid-argument', 'setRole - missing uid');
  }

  if (isNonAdmin) {
    console.error('setRole -  non admin');
    throw new functions.https.HttpsError('permission-denied', 'client has invalid role');
  }

  try {
    const forceRefreshToken = true;
    await Promise.all([updateUser(uid, { role, forceRefreshToken }), setCustomUserClaims(uid, { role })]);

    return {
      status: STATUS.SUCCESS
    };
  } catch (error) {
    console.error('setRole - setCustomUserClaims failed', error);
    throw new functions.https.HttpsError('internal', 'setRole - setCustomUserClaims failed');
  }
};
