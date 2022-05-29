import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './auth/components/admin/admin.component';
import { HasRoleGuard } from './auth/components/login/has-role.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { LoginGuard } from './auth/components/login/login.guard';
import { RegisterComponent } from './auth/components/register/register.component';
import { UserComponent } from './auth/components/user/user.component';
import { BookingAllComponent } from './booking/booking-all/booking-all.component';
import { BookingUserComponent } from './booking/booking-user/booking-user.component';
import { BookingComponent } from './booking/booking.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingAddComponent } from './listing/listing-add/listing-add.component';
import { ListingAllComponent } from './listing/listing-all/listing-all.component';
import { ListingComponent } from './listing/listing.component';
import { MainComponent } from './main/main.component';
import { UsersAllComponent } from './users/users-all/users-all.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'listing', component: ListingComponent },
  {
    path: 'listing-add',
    component: ListingAddComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'admin' },
  },
  {
    path: 'listing-all',
    component: ListingAllComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'admin' },
  },

  {
    path: 'booking-user',
    component: BookingUserComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'customer' },
  },

  {
    path: 'booking-all',
    component: BookingAllComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'admin' },
  },

  { path: 'listingdetails/:id', component: ListingDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'admin' },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'customer' },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'customer' },
  },
  {
    path: 'users-all',
    component: UsersAllComponent,
    canActivate: [LoginGuard, HasRoleGuard],
    data: { type: 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
