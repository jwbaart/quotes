import * as admin from 'firebase-admin';
import { ROLE } from '../../auth-triggers/onCreate';

// TODO: how to user angular types so we don't have to use copies here
export interface User {
  id: string;
  name: string;
  // createdAt: firebase.firestore.Timestamp; // TODO: how to get typing?
  createdAt: string;
  photoUrl: string;
  role: ROLE;
  uid: string;
  forceRefreshToken: boolean;
}



export const updateUser = (uid: string, userData: Partial<User>): Promise<FirebaseFirestore.WriteResult> => {
  const db = admin.firestore();
  return db
    .collection('users')
    .doc(uid)
    .set(userData, { merge: true });
};

export const deleteUser = (uid: string): Promise<FirebaseFirestore.WriteResult> => {
  const db = admin.firestore();
  return db
    .collection('users')
    .doc(uid)
    .delete();
};
