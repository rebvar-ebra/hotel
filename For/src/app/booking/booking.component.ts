import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  booking: any = [];
  filterText = '';
  constructor(private apolloClient: Apollo, private dataService: DataService) {}

  ngOnInit(): void {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_BOOKING,
      })
      .valueChanges.subscribe((response) => {
        console.log('all booking');
        console.log(response.data.getBooking);
        this.booking = response.data.getBooking;
      });
  }
}
