import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-booking-user',
  templateUrl: './booking-user.component.html',
  styleUrls: ['./booking-user.component.css'],
})
export class BookingUserComponent implements OnInit {
  bookingByUserName: any = [];
  storage: any = JSON.parse(localStorage.getItem('isLogged') || '{}').username;
  filterText = '';
  constructor(private apolloClient: Apollo, private dataService: DataService) {
    this.getBookingByUsername();
  }

  ngOnInit(): void {}

  getBookingByUsername() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_BOOKING_BY_USERNAME,
        variables: {
          username: this.storage,
        },
      })
      .valueChanges.subscribe((response) => {
        console.log('all booking by username');
        console.log(response.data.getBookingByUsername);
        this.bookingByUserName = response.data.getBookingByUsername;
      });
  }
}
