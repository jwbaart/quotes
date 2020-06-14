import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ROLE } from '../user/user.service';

export enum HTTPS_CALLABLE {
  USER_DELETE = 'user-delete',
  USER_SET_ROLE = 'user-setRole'
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private readonly fns: AngularFireFunctions) {}

  deleteUser(uid: string) {
    const userDeleteCallable = this.fns.httpsCallable(HTTPS_CALLABLE.USER_DELETE);
    return userDeleteCallable({ uid });
  }

  setRole(uid: string, role: ROLE) {
    const setRoleCallable = this.fns.httpsCallable(HTTPS_CALLABLE.USER_SET_ROLE);
    return setRoleCallable({ uid, role });
  }
}
