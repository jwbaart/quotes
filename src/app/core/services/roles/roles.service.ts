import { Injectable } from '@angular/core';
import { ROLE } from '../user/users.interface';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

const rolesUrl = 'http://localhost:5001/quotes-dev-802a5/europe-west1/api/custom-claim';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private readonly httpService: HttpClient, private af: AngularFireAuth) {}

  set(uid: string, role: ROLE) {
    return this.httpService.post(rolesUrl, { uid, role });
  }
}
