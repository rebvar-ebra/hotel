import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable()
export class AccountService {
  userLoggedIn: any = [];
  dbUserName: any = '';
  loggedIn = false;

  constructor(private apolloClient: Apollo, private dataService: DataService) {}

  login(user: User) {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_USER_BY_USERNAME,
        variables: {
          username: user.username,
        },
      })
      .valueChanges.subscribe((response) => {
        console.log('Get user by username');
        console.log(response.data.getUserByUsername[0]);
        this.userLoggedIn = response.data.getUserByUsername[0];
      });

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
    }
    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
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
