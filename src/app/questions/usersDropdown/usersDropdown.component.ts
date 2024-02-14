import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UsersService } from "../../services/users.service";
import { RawUser } from "../../models";
import {UserByIdService} from "../../services/user-by-id.service";

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

  constructor(
    private usersService: UsersService,
    private userByIdService: UserByIdService,
    private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

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





// ngOnInit(): void {
//   const storedUserId = sessionStorage.getItem('selectedUserId');
//   if (storedUserId) {
//     const userId = parseInt(storedUserId, 10);
//     this.loadUserById(userId);
//   }
// }

// onUserSelectionChange(event: any): void {
//   const selectedUser = event.value;
//   if (selectedUser) {
//     const selectedUserId = selectedUser.id;
//     this.userByIdService.setSelectedUserId(selectedUserId);
//     console.log('id', selectedUserId);
//     this.userByIdService.getUserById(selectedUserId).subscribe(
//       (result) => {
//         console.log('Fetched user:', result);
//         this.result = result;
//         this.cdRef.detectChanges();
//       },
//     );
//     sessionStorage.setItem('selectedUser', JSON.stringify(selectedUser));
//     this.loadUserById(selectedUserId);
//     this.selectedUser = selectedUser;
//   }
// }
//
// private loadUserById(userId: number): void {
//   this.userByIdService.setSelectedUserId(userId);
//   this.userByIdService.getUserById(userId).subscribe(
//     (result) => {
//       this.result = result;
//       this.cdRef.detectChanges();
//     }
//   );
// }
