import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from './models/booking';

@Pipe({
  name: 'bookingFilter',
})
export class BookingFilterPipe implements PipeTransform {
  transform(value: Booking[], filterText?: string): Booking[] {
    filterText != filterText ? filterText!.toString().toLowerCase() : null;

    return filterText
      ? value.filter(
          (p: Booking) =>
            p.username
              .toString()
              .toLowerCase()
              .indexOf(filterText.toString()) !== -1
        )
      : value;
  }
}
