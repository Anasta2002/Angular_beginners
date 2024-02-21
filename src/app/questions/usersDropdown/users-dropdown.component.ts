import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RawUser, User } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, map, merge, Subject, switchMap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';

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

  get user(): User | null {
    const saved = this.savedUser.get();
    return saved ? new User(saved) : null;
  }

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  inputAutoComplete: MatAutocompleteTrigger | undefined;

  ngOnInit() {
    const saved = this.savedUser.get();
    if (saved) {
      const fullName = `${saved.first_name} ${saved.last_name}`;
      this.searchControl.setValue(fullName);
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
      return response.users.map((user) => new User(user));
    })
  );

  constructor() {
    this.searchControl.valueChanges;
  }

  click() {
    this.onClick$.next(this.searchControl.value ?? '');
  }

  selectUser(user: RawUser, trigger: MatAutocompleteTrigger, auto: MatAutocomplete) {
    this.searchControl.setValue( `${user.first_name} ${user.last_name}`);
    this.savedUser.save(user);
  }

  deleteCard() {
    this.savedUser.delete()
  }
}
