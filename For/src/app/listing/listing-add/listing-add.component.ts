import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Listing } from 'src/app/models/listing';
import { AlertifyService } from 'src/app/service/alertify.service';
import { DataService } from 'src/app/service/data.service';

declare let alerttify: any;

@Component({
  selector: 'app-listing-add',
  templateUrl: './listing-add.component.html',
  styleUrls: ['./listing-add.component.css'],
  providers: [FormBuilder],
})
export class ListingAddComponent implements OnInit {
  // model: Listing = new Listing();
  admin = 'admin';
  username = 'hmzkocadmin';
  date = new Date();
  model: any = {
    listing_id: '',
    listing_title: '',
    description: '',
    street: '',
    city: '',
    postal_code: '',
    price: '',
    email: '',
    username: '',
    type: '',
    id: '',
    created: new Date(),
    token: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private apolloClient: Apollo,
    private dataService: DataService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.model.username = this.username;
    this.model.type = this.admin;
    this.model.created = this.date;
  }

  add(form: NgForm) {
    console.log(form.value.username);
    console.log(this.model.username);
    this.addListing(form);
  }

  addListing(form: NgForm) {
    console.log(form.value);
    this.apolloClient
      .mutate({
        mutation: this.dataService.ADD_LISTING,
        variables: {
          listing_id: form.value.listing_id,
          listing_title: form.value.listing_title,
          description: form.value.description,
          street: form.value.street,
          city: form.value.city,
          postal_code: form.value.postal_code,
          price: form.value.price,
          email: form.value.email,
          username: form.value.username,
          type: form.value.type,
          created: form.value.created,
        },
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.alertify.success(
            form.value.listing_title + ' successsfully added'
          );
          setTimeout(() => {
            window.location.href = 'listing-all';
          }, 3000);
        },
        (err) => {
          this.alertify.error('' + err);
          console.log(err);
        }
      );
  }
}
