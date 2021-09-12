import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  isHiddenprogram = true;
  isHiddenreview = true;

  constructor(private _router: Router) { }


  ngOnInit(): void {
  }
  grantprogram() {
    this.isHiddenprogram = false;
    this.isHiddenreview = true;
  }
  reviewprogram() {
    this.isHiddenprogram = true;
    this.isHiddenreview = false;

  }
  logout() {
    localStorage.clear();
    this._router.navigate(['login']);
  }
}
