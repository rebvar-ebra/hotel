import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';

import { HttpLink } from 'apollo-angular/http';

import { InMemoryCache } from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { NavbarComponent } from './auth/components/navbar/navbar.component';
import { ListingComponent } from './listing/listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { FooterComponent } from './auth/components/footer/footer.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './auth/components/admin/admin.component';
import { UserComponent } from './auth/components/user/user.component';
import { ListingFilterPipe } from './listing-filter.pipe';
import { ListingAddComponent } from './listing/listing-add/listing-add.component';
import { NavAdminComponent } from './auth/components/nav-admin/nav-admin.component';
import { ListingAllComponent } from './listing/listing-all/listing-all.component';
import { BookingComponent } from './booking/booking.component';
import { BookingAllComponent } from './booking/booking-all/booking-all.component';
import { BookingFilterPipe } from './booking-filter.pipe';
import { UsersComponent } from './users/users.component';
import { UsersAllComponent } from './users/users-all/users-all.component';
import { UserFilterPipe } from './user-filter.pipe';
import { NavUserComponent } from './auth/components/nav-user/nav-user.component';
import { AccountService } from './service/account.service';
import { LoginGuard } from './auth/components/login/login.guard';
import { BookingUserComponent } from './booking/booking-user/booking-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ListingComponent,
    ListingDetailsComponent,
    FooterComponent,
    MainComponent,
    AdminComponent,
    UserComponent,
    ListingFilterPipe,
    ListingAddComponent,
    NavAdminComponent,
    ListingAllComponent,
    BookingComponent,
    BookingAllComponent,
    BookingFilterPipe,
    UsersComponent,
    UsersAllComponent,
    UserFilterPipe,
    NavUserComponent,
    BookingUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            //replace your graphql url http://localhost:3000/graphql
            // uri: 'http://localhost:5000/graphql',
            uri: 'https://angular-hotel-booking-backend.herokuapp.com/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
    AccountService,
    LoginGuard,
  ],
  exports: [LoginComponent, RegisterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
