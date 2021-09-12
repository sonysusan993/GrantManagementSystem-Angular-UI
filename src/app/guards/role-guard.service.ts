import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {


  constructor(private _router: Router,private toastrs: ToastrService) {
  }

  canActivate(next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
    let role =  localStorage.getItem('Role');;

    if (role === next.data.role) {
      return true;
    }

    // navigate to not found page
    this.toastrs.error("You dont have the permission to view this.Please login");
    localStorage.clear();
    this._router.navigate(['/login']);
    return false;
  }

}