import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RawUser, User } from '../../models';
import { UserByIdService } from '../../services/user-by-id.service';
import { FormControl } from '@angular/forms';
import { Subject, map, pairwise, startWith, switchMap, tap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})
export class usersDropdownComponent implements OnInit, AfterViewInit {
  initialOptions: any = [];
  result: any;
  selectedUser: any;
  hasFetchedData: boolean = false;
  searchControl = new FormControl('');
  onClick$: Subject<string> = new Subject();

  private savedSearch = new StorageItem<string>('search');

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  inputAutoComplete: MatAutocompleteTrigger | undefined;

  filteredOptions$ = this.searchControl.valueChanges.pipe(
    tap((values) => {
      console.log(values);
    }),
    startWith(''),
    pairwise(),
    switchMap(([prevSearch, currentSearch]) =>
      this.usersService
        .getUsers({
          search: currentSearch ?? '',
          limit: 25,
          getCached: prevSearch === currentSearch,
        })
        .pipe(
          tap(() => {
            this.savedSearch.save(currentSearch ?? '');
          })
        )
    ),
    map((response) => {
      return response.users.map((user) => new User(user));
    })
  );

  constructor(
    private usersService: UsersService,
    private userByIdService: UserByIdService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const search = this.savedSearch.get();

    if (search) {
    }

    if (this.inputAutoComplete && search) {
      this.searchControl.setValue(search);
      this.inputAutoComplete.openPanel();
    }
  }

  click() {
    this.onClick$.next(this.searchControl.value ?? '');
  }

  getInitialOptions() {
    if (!this.hasFetchedData) {
      this.usersService.getUsers().subscribe((response) => {
        this.initialOptions = response.users.map((user: RawUser) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
        }));
        this.setInitialDataToSessionStorage();
        this.hasFetchedData = true;
      });
    }
  }

  onUserSelectionChange(event: any): void {
    const selectedUser = event.value;
    if (selectedUser) {
      const selectedUserId = selectedUser.id;
      this.userByIdService.setSelectedUserId(selectedUserId);
      this.userByIdService.getUserById(selectedUserId).subscribe((result) => {
        this.result = result;
        this.cdRef.detectChanges();
      });
      sessionStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      this.selectedUser = selectedUser;
    }
  }

  setInitialDataToSessionStorage() {
    sessionStorage.setItem(
      'initialOptions',
      JSON.stringify(this.initialOptions)
    );
  }
}
