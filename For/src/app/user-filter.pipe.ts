import { Pipe, PipeTransform } from '@angular/core';
import { User } from './models/user';

@Pipe({
  name: 'userFilter',
})
export class UserFilterPipe implements PipeTransform {
  transform(value: User[], filterText?: string): User[] {
    filterText != filterText ? filterText!.toString().toLowerCase() : null;

    return filterText
      ? value.filter(
          (p: User) =>
            p.username
              .toString()
              .toLowerCase()
              .indexOf(filterText.toString()) !== -1
        )
      : value;
  }
}
