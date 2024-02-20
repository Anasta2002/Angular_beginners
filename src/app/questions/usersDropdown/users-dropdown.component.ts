import { Component, inject, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginatedUsers, RawUser, User } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, map, merge, Subject, switchMap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';
import {
  MatSelect,
  MatSelectChange,
  MatSelectTrigger,
} from '@angular/material/select';

interface ngOnInit {}

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
})
export class UsersDropdownComponent implements ngOnInit {
  searchControl = new FormControl('');
  onClick$: Subject<string> = new Subject();

  private savedUser = new StorageItem<RawUser>('selected-user');
  private usersService = inject(UsersService);

  get user(): User | null {
    const saved = this.savedUser.get();

    return saved ? new User(saved) : null;
  }

  @ViewChild(MatSelectTrigger, { read: MatSelectTrigger })
  inputAutoComplete: MatSelectTrigger | undefined;

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
      console.log('Users recieved:', response);
      const users = response.users.map((user) => new User(user));
      console.log('Users emitted:', users);
      return users;
    })
  );

  constructor() {
    this.searchControl.valueChanges;
  }

  click() {
    this.onClick$.next(this.searchControl.value ?? '');
  }

  selectUser(user: User) {
    console.log('Selecting user:', user);
    if (!user) {
      return;
    }

    this.savedUser.save(user.rawUser);
  }

  deleteCard() {
    this.savedUser.delete();
  }
}
