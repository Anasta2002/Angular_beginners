import {Component, inject, ViewChild} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {RawUser, User} from '../../models';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, map, merge, Subject, switchMap,} from 'rxjs';
import {StorageItem} from '../../models/storage-item';
import {MatAutocomplete, MatAutocompleteTrigger,} from '@angular/material/autocomplete';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
})
export class UsersDropdownComponent {
  searchControl = new FormControl('');
  onClick$: Subject<string> = new Subject();
  fromSudan = false;

  private savedUser = new StorageItem<RawUser>('selected-user');
  private usersService = inject(UsersService);

  get user(): User | null {
    const saved = this.savedUser.get();

    return saved ? new User(saved) : null;
  }

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  inputAutoComplete: MatAutocompleteTrigger | undefined;

  users$ = merge(
    this.searchControl.valueChanges.pipe(debounceTime(300)),
    this.onClick$
  ).pipe(
    switchMap((currentSearch) =>
      this.usersService.getUsers({
        search: currentSearch ?? '',
        limit: 25,
      })
    ),
    map((response) => {
      const users = response.users.map((user) => new User(user));

      if (this.fromSudan) {
        return users.filter((user) => user.fromSudan);
      }

      return users;
    })
  );

  constructor() {
    this.searchControl.valueChanges;
  }

  click() {
    this.onClick$.next(this.searchControl.value ?? '');
  }

  selectUser(
    user: RawUser,
    trigger: MatAutocompleteTrigger,
    auto: MatAutocomplete
  ) {
    this.searchControl.setValue('', { emitEvent: false });
    this.savedUser.save(user);

    auto.options.forEach((item) => {
      item.deselect();
    });
    this.searchControl.reset('');
  }

  deleteCard() {
    this.savedUser.delete()
  }
}
