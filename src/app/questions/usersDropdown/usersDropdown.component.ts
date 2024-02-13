import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})

export class usersDropdownComponent implements OnChanges  {
  @Input() usersNames!: string[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('usersNames' in changes) {
      this.cdr.detectChanges();
    }
  }
}
