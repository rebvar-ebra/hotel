import { Pipe, PipeTransform } from '@angular/core';
import { Listing } from './models/listing';

@Pipe({
  name: 'listingFilter',
})
export class ListingFilterPipe implements PipeTransform {
  transform(value: Listing[], filterText?: string): Listing[] {
    filterText != filterText ? filterText!.toString().toLowerCase() : null;

    return filterText
      ? value.filter(
          (p: Listing) =>
            p.listing_title
              .toString()
              .toLowerCase()
              .indexOf(filterText.toString()) !== -1
        )
      : value;
  }
}
