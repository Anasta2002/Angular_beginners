import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UsersService } from "../../services/users.service";
import {RawUser, User} from "../../models";
import {UserByIdService} from "../../services/user-by-id.service";
import {FormControl} from "@angular/forms";
import {debounceTime, map, switchMap} from "rxjs";

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})
export class usersDropdownComponent implements OnInit {
  initialOptions: any = [];
  result: any;
  selectedUser: any;
  hasFetchedData: boolean = false;
  myControl = new FormControl('');
  filteredOptions$ = this.myControl.valueChanges.pipe(
    debounceTime(300),
    switchMap((search) => this.usersService.getAllUsers({
      search: search ?? '',
      limit: 25,
    })),
    map(response => response.users.map(user => new User(user)))
  )

  constructor(
    private usersService: UsersService,
    private userByIdService: UserByIdService,
    private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((value) => {

    })
  }

  getInitialOptions() {
    if (!this.hasFetchedData) {
      this.usersService.getAllUsers().subscribe(
        (data) => {
          this.initialOptions = data.users.map((user: RawUser) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          }));
          this.setInitialDataToSessionStorage();
          this.hasFetchedData = true;
        }
      );
    }
  }

  onUserSelectionChange(event: any): void {
    const selectedUser = event.value;
    if (selectedUser) {
      const selectedUserId = selectedUser.id;
      this.userByIdService.setSelectedUserId(selectedUserId);
      this.userByIdService.getUserById(selectedUserId).subscribe(
        (result) => {
          this.result = result;
          this.cdRef.detectChanges();
        },
      );
      sessionStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      this.selectedUser = selectedUser;
    }
  }

  setInitialDataToSessionStorage() {
    sessionStorage.setItem('initialOptions', JSON.stringify(this.initialOptions));
  }
}
