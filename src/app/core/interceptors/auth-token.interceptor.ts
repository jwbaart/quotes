import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthTokenHttpInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
      take(1),
      switchMap(idToken => {
        let clone = req.clone();
        if (idToken) {
          clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
        }
        return next.handle(clone);
      })
    );
  }
}
