import * as admin from 'firebase-admin';

export const deleteAuthUser = (uid: string): Promise<void> => {
  return admin.auth().deleteUser(uid);
};

export const setCustomUserClaims = (uid: string, claims: { [key: string]: boolean }): Promise<void> => {
  return admin.auth().setCustomUserClaims(uid, claims);
};
