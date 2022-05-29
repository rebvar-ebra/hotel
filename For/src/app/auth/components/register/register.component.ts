import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AlertifyService } from 'src/app/service/alertify.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // model: Listing = new Listing();
  type = 'customer';

  model: any = {
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    token: '',
    type: '',
  };

  constructor(
    private apolloClient: Apollo,
    private dataService: DataService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.model.type = this.type;
  }

  add(form: NgForm) {
    console.log(form.value.username);
    console.log(this.model.username);
    this.addUser(form);
  }

  addUser(form: NgForm) {
    console.log(form.value);
    this.apolloClient
      .mutate({
        mutation: this.dataService.ADD_USER,
        variables: {
          username: form.value.username,
          firstname: form.value.firstname,
          lastname: form.value.lastname,
          email: form.value.email,
          password: form.value.password,
          type: form.value.type,
        },
      })
      .subscribe(
        (response) => {
          console.log(response);
          this.alertify.success(form.value.username + ' successsfully created');
          setTimeout(() => {
            window.location.href = 'login';
          }, 2000);
        },
        (err) => {
          this.alertify.error('' + err);
          console.log(err);
        }
      );
  }
}
