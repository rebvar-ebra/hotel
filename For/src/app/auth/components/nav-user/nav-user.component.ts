import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css'],
})
export class NavUserComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  logOut() {
    this.accountService.logOut();
  }
}
