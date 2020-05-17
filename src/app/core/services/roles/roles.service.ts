import { Injectable } from '@angular/core';
import { ROLE } from '../user/users.interface';
import { HttpClient } from '@angular/common/http';

const rolesUrl = '/custom-claims';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private readonly httpService: HttpClient) {}

  set(uid: string, role: ROLE) {
    return this.httpService.post(rolesUrl, { role });
  }
}
