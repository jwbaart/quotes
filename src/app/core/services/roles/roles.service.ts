import { Injectable } from '@angular/core';
import { ROLE } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../../../../environments/environment';

const region = 'europe-west1';
const project = environment.firebase.projectId;
const url = `//${region}-${project}.cloudfunctions.net/api/user-role`;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private readonly httpService: HttpClient, private af: AngularFireAuth) {}

  set(uid: string, role: ROLE) {
    return this.httpService.post(url, { uid, role });
  }
}
