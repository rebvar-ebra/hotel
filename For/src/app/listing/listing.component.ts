import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataService } from '../service/data.service';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  listing: any = [];
  filterText = '';

  storage: any = JSON.parse(localStorage.getItem('isLogged') || '{}').type;

  constructor(private apolloClient: Apollo, private dataService: DataService) {}

  ngOnInit(): void {
    this.apolloClient
      .watchQuery<any>({
        query: this.dataService.GET_LISTING,
      })
      .valueChanges.pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
      .subscribe((response) => {
        console.log(response.data.getListing);
        this.listing = response.data.getListing;
      });
  }

  isloggedInUser(): boolean {
    if (this.storage == 'customer') {
      return true;
    }
    return false;
  }

  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'An error accured ' + err.error.message;
    } else {
      errorMessage = 'System error';
    }
    return throwError(errorMessage);
  }
}
