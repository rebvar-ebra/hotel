import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  storage: any = JSON.parse(localStorage.getItem('isLogged') || '{}').type;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuth = this.storage.includes(route.data['type']);

    if (!isAuth) {
      window.alert('You are not authorized');
    }
    return isAuth;
  }
}
