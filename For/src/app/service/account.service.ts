import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../models/user';
import { AlertifyService } from './alertify.service';
import { DataService } from './data.service';

@Injectable()
export class AccountService {
  userLoggedIn: any = '';
  allUserFromDB: any = '';
  loggedIn = false;

  constructor(
    private apolloClient: Apollo,
    private dataService: DataService,
    private alertify: AlertifyService
  ) {
    this.getUsers();
  }

  getUsers() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_USER,
      })
      .valueChanges.subscribe((response) => {
        console.log('************sssssssssssss************');
        console.log(response.data.getUser);
        this.allUserFromDB = response.data.getUser;
        console.log('************sssssssssssss************');
      });
  }

  login(user: User) {
    this.userLoggedIn = this.allUserFromDB
      .map((el: any) => el)
      .filter((ele: any) => ele.username == user.username);

    this.userLoggedIn = this.userLoggedIn[0];

    console.log('logged in user');
    console.log(this.userLoggedIn);
    console.log('logged in user');

    if (
      this.userLoggedIn.username &&
      this.userLoggedIn.password == user.password
    ) {
      this.loggedIn = true;

      const person = {
        username: this.userLoggedIn.username,
        type: this.userLoggedIn.type,
        id: this.userLoggedIn.id,
      };

      localStorage.setItem('isLogged', JSON.stringify(person));

      this.alertify.success('Login Success');

      if (this.userLoggedIn.type == 'admin') {
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      } else if (this.userLoggedIn.type == 'customer') {
        setTimeout(() => {
          window.location.href = '/user';
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      }
    } else {
      this.alertify.error('Credentials not valid');
    }
  }

  isLoggedIn() {
    if (localStorage.hasOwnProperty('isLogged')) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem('isLogged');
    this.loggedIn = false;
  }
}
