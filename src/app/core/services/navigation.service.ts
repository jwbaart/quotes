import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum ROUTE {
  INTRO = 'intro',
  QUOTES = 'quotes',
  USERS = 'users'
}

export enum ROUTE_URL {
  INTRO = '/intro',
  QUOTES = '/quotes',
  USERS = '/users'
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  toIntro() {
    this.router.navigate([ROUTE.INTRO]);
  }

  toUsers() {
    this.router.navigate([ROUTE.INTRO]);
  }

  toQuotesIfOnIntro() {
    const isRouteIntro = this.router.url === ROUTE_URL.INTRO;

    if (isRouteIntro) {
      this.router.navigate([ROUTE.QUOTES]);
    }
  }
}
