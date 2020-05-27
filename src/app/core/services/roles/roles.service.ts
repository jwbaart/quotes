import { Injectable } from '@angular/core';
import { ROLE } from '../user/users.interface';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../../../../environments/environment';

const region = 'europe-west1';
const project = environment.firebase.projectId;
const url = `//${region}-${project}.cloudfunctions.net/api/custom-claim`;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private readonly httpService: HttpClient, private af: AngularFireAuth) {}

  set(uid: string, role: ROLE) {
    console.log('set');
    return this.httpService.post(url, { uid, claim: role });
  }
}
