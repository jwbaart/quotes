import * as functions from 'firebase-functions';
import { ROLE } from '../auth-triggers/onCreate';
import { updateUser, setCustomUserClaims } from '../api/helpers/firebase';

export enum STATUS {
  FAILED = 'failed',
  SUCCESS = 'success'
}

export default async (data: any, context: functions.https.CallableContext) => {
  console.log(data);
  const { role, uid } = data;

  const isUnknownRole = !Object.values(ROLE).includes(role);
  const isUidInvalid = !(uid && uid.length);

  if (isUnknownRole) {
    console.error('setRole - unknown role: ', role);
    throw new functions.https.HttpsError('invalid-argument', 'setRole - unknown role: ' + role);
  }

  if (isUidInvalid) {
    console.error('setRole -  missing uid: ', uid);
    throw new functions.https.HttpsError('invalid-argument', 'setRole - missing uid');
  }

  try {
    await Promise.all([updateUser(uid, { role }), setCustomUserClaims(uid, { role })]);

    return {
      status: STATUS.SUCCESS
    };
  } catch (error) {
    console.error('setRole - setCustomUserClaims failed', error);
    throw new functions.https.HttpsError('internal', 'setRole - setCustomUserClaims failed');
  }
  return { your: 'data' };
};
