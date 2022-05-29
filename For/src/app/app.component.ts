import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '101274109_comp3133_assig2';
  users: any = [];
  listing: any = [];
  booking: any = [];
  listingByAdmin: any = [];
  listingByName: any = [];
  listingByCity: any = [];

  constructor(private apolloClient: Apollo, private dataService: DataService) {
    this.getUsers();
    this.getListing();
    this.getBooking();
    this.getListingCreatedByAdmin();
    this.getListingByName();
    this.getListingByCity();
  }

  getUsers() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_USER,
      })
      .valueChanges.subscribe((response) => {
        // console.log(response.data.getUser);
        this.users = response.data.getUser;
      });
  }

  getListing() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTING,
      })
      .valueChanges.subscribe((response) => {
        // console.log(response.data.getListing);
        this.listing = response.data.getListing;
      });
  }

  getBooking() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_BOOKING,
      })
      .valueChanges.subscribe((response) => {
        // console.log('all booking');
        // console.log(response.data.getBooking);
        this.booking = response.data.getBooking;
      });
  }

  getListingCreatedByAdmin() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTING_CREATED_BY_ADMIN,
        variables: {
          type: 'admin', 
        },
      })
      .valueChanges.subscribe((response) => {
        // console.log('all listing by Admin');
        // console.log(response.data.getListingCreatedByAdmin);
        this.listingByAdmin = response.data.getListingCreatedByAdmin;
      });
  }

  getListingByName() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTIN_BY_NAME,
        variables: {
          listing_title: 'sea face home for rent', 
        },
      })
      .valueChanges.subscribe((response) => {
        // console.log('all listing by Name');
        // console.log(response.data.getListingByName);
        this.listingByName = response.data.getListingByName;
      });
  }

  getListingByCity() {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTING_BY_CITY,
        variables: {
          city: 'toronto', 
        },
      })
      .valueChanges.subscribe((response) => {
        // console.log('all listing by City');
        // console.log(response.data.getListingByCity);
        this.listingByName = response.data.getListingByCity;
      });
  }


}
