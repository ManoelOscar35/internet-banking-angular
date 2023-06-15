import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(typeof this.localStorageService.getLocalStorage('token') !== 'object') {
        return true;
      } else {
        return false;
      }

      
  }
}
