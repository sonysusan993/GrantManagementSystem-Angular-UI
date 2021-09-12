// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// export interface CanComponentDeactivate {
//   canDeactivate: () => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
// }

// @Injectable()
// export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

//   canDeactivate(component: CanComponentDeactivate, 
//   route: ActivatedRouteSnapshot, 
//   state: RouterStateSnapshot) {
//     debugger;
//     return component.canDeactivate ? component.canDeactivate() : true;
//   }

// }
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate, 
           route: ActivatedRouteSnapshot, 
           state: RouterStateSnapshot) {

     let url: string = state.url;
     console.log('Url: '+ url);

     return component.canDeactivate ? component.canDeactivate() : true;
  }
} 