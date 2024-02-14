import {ChangeDetectorRef, Input, OnChanges, SimpleChanges, Component} from '@angular/core';
import {RawUser} from "../../models";

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})

export class usersDropdownComponent implements OnChanges  {
  @Input() users!: RawUser[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('users' in changes) {
      this.cdr.detectChanges();
    }
  }
}
