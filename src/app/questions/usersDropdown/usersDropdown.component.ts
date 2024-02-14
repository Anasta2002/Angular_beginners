import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UserByIdService } from "../../services/user-by-id.service";

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})

export class usersDropdownComponent implements OnInit {
  initialOptions = [
    { id: 1, first_name: "Kayla", last_name: "Lopez" },
    { id: 2, first_name: "Tina", last_name: "Patrick" },
    { id: 3, first_name: "Brittany", last_name: "Bradford" },
    { id: 4, first_name: "Lisa", last_name: "Thomas" },
    { id: 5, first_name: "Danielle", last_name: "Taylor" },
  ];
  result: any;
  selectedUser: any;

  constructor(private userByIdService: UserByIdService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const storedUserId = sessionStorage.getItem('selectedUserId');
    if (storedUserId) {
      const userId = parseInt(storedUserId, 10);
      this.loadUserById(userId);
      this.selectedUser = this.initialOptions.find(user => user.id === userId);
    }
  }

  onUserSelectionChange(event: any): void {
    const selectedUser = event.value;
    if (selectedUser) {
      const selectedUserId = selectedUser.id;
      this.userByIdService.setSelectedUserId(selectedUserId);
      console.log('id', selectedUserId);
      this.userByIdService.getUserById(selectedUserId).subscribe(
        (result) => {
          console.log('Fetched user:', result);
          this.result = result;
          this.cdRef.detectChanges();
        }
      );
      sessionStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      this.loadUserById(selectedUserId);
      this.selectedUser = selectedUser;
    }
  }

  private loadUserById(userId: number): void {
    this.userByIdService.setSelectedUserId(userId);
    this.userByIdService.getUserById(userId).subscribe(
      (result) => {
        this.result = result;
        this.cdRef.detectChanges();
      }
    );
  }
}
