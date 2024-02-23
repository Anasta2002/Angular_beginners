import { Component, ViewChild, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PaginatedUsers, RawUser, User } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { StorageItem } from '../../models/storage-item';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
})
export class UsersDropdownComponent implements OnInit {
  searchControl = new FormControl('');
  private savedUser = new StorageItem<RawUser>('selected-user');
  private destroy$: Subject<void> = new Subject<void>();
  private isProgrammaticChange: boolean = false;

  loadedUsers: User[] = [];

  get user(): User | null {
    const saved = this.savedUser.get();
    return saved ? new User(saved) : null;
  }

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  inputAutoComplete: MatAutocompleteTrigger | undefined;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    const saved = this.savedUser.get();
    if (saved) {
      const fullName = `${saved.first_name} ${saved.last_name}`;
      this.isProgrammaticChange = true;
      this.searchControl.setValue(fullName);
      this.isProgrammaticChange = false;
    }

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value) => {
        if (this.isProgrammaticChange) {
          return of([]); // Return an empty array for programmatic changes
        }

        return this.usersService.getUsers({
          search: value || '',
          limit: 25,
        });
      }),
      takeUntil(this.destroy$)
    ).subscribe((response: any) => {
      if ('users' in response) {
        this.loadedUsers = response.users.map((user: RawUser) => new User(user));
      } else {
        console.error('Unexpected response format:', response);
      }
    });
  }

  onOptionSelected(event: any) {
    // Prevent triggering a new request when an option is selected
    this.isProgrammaticChange = true;
    const selectedUser: RawUser = event.option.value.rawUser;
    this.searchControl.setValue(`${selectedUser.first_name} ${selectedUser.last_name}`);
    this.savedUser.save(selectedUser);
    this.isProgrammaticChange = false;
    this.inputAutoComplete?.closePanel(); // Close the autocomplete panel after selecting a user
  }

  click() {
    // Prevent triggering a new request when the input is clicked
    this.isProgrammaticChange = true;
    this.searchControl.setValue(this.searchControl.value || '');
    this.isProgrammaticChange = false;
  }

  deleteCard() {
    // Clear loadedUsers array to prevent displaying previous results
    this.loadedUsers = [];
    this.savedUser.delete();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
