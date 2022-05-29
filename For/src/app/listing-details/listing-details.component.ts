import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  model: any = {
    id: '',
    listing_id: '',
    booking_id: '',
    booking_date: new Date(),
    booking_start: '',
    booking_end: '',
    username: '',
  };

  listingDetails: any = [];
  listingDetailsListingId: any = '';

  storage: any = JSON.parse(localStorage.getItem('isLogged') || '{}').username;
  storageListingID: any = JSON.parse(localStorage.getItem('listing') || '{}')
    .listing_id;

  constructor(
    private apolloClient: Apollo,
    private dataService: DataService,
    private router: ActivatedRoute,
    private alertify: AlertifyService
  ) {
    this.makeid();
  }

  ngOnInit(): void {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTING_BY_ID,
        variables: {
          id: this.router.snapshot.params['id'], //Replace with your own values read from textbox
          //title: 'Your title' //Replace with your own values read from textbox
        },
      })
      .valueChanges.subscribe((response) => {
        console.log(response.data.getListingByID);
        this.listingDetails = response.data.getListingByID;
        localStorage.setItem(
          'listing',
          JSON.stringify(response.data.getListingByID)
        );
      });

    this.model.listing_id = this.storageListingID;
    this.model.username = this.storage;
  }

  makeid() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.model.booking_id = result;
  }

  add(form: NgForm) {
    console.log(form);
    console.log(this.model);
    this.bookListing(this.model);
  }

  bookListing(model: any) {
    console.log(model);
    this.apolloClient
      .mutate({
        mutation: this.dataService.ADD_BOOKING,
        variables: {
          username: model.username,
          listing_id: model.listing_id,
          booking_id: model.booking_id,
          booking_start: model.booking_start,
          booking_end: model.booking_end,
          booking_date: model.booking_date,
        },
      })
      .subscribe((response) => {
        console.log(response);
        this.alertify.success(model.booking_id + ' successsfully added');
        setTimeout(() => {
          window.location.href = 'booking-user';
        }, 3000);
      },
      (err) => {
        this.alertify.error('' + err);
        console.log(err);
      });

  
  }
}
