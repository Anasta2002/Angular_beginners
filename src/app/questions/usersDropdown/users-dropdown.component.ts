import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginatedUsers, RawUser, User } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, map, merge, Subject, switchMap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';
import { MatSelectTrigger } from '@angular/material/select';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
})
export class UsersDropdownComponent implements OnInit {
  searchControl = new FormControl('');
  onClick$: Subject<string> = new Subject();

  private savedUser = new StorageItem<RawUser>('selected-user');
  private usersService = inject(UsersService);
  user: User | null = null;

  @ViewChild(MatSelectTrigger, { read: MatSelectTrigger })
  inputAutoComplete: MatSelectTrigger | undefined;

  ngOnInit() {
    const saved = this.savedUser.get();
    if (saved) {
      this.user = new User(saved);
    }
  }

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
      console.log('Users received:', response);
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

    if (!this.user || user.id !== this.user.id) {
      this.savedUser.save(user.rawUser);
      this.user = user;
    }
  }

  deleteCard() {
    this.savedUser.delete();
    this.user = null;
  }
}
