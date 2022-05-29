import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any = [];
  filterText = '';
  constructor(private apolloClient: Apollo, private dataService: DataService) {}

  ngOnInit(): void {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_USER,
      })
      .valueChanges.subscribe((response) => {
        console.log(response.data.getUser);
        this.users = response.data.getUser;
      });
  }
}
