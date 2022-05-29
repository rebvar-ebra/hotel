import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  storage: any = JSON.parse(localStorage.getItem('isLogged') || '{}').type;

  constructor() {}

  ngOnInit(): void {}

  isloggedInAdmin(): boolean {
    if (this.storage == 'admin') {
      return true;
    }
    return false;
  }

  isloggedInUser(): boolean {
    if (this.storage == 'customer') {
      return true;
    }
    return false;
  }
}
