// import {ChangeDetectorRef, Input, OnChanges, SimpleChanges} from '@angular/core';
//
// @Component({
//   selector: 'app-users-dropdown',
//   templateUrl: './usersDropdown.component.html',
//   styleUrls: ['./usersDropdown.component.css'],
// })
//
// interface User {
//
// }
// export class usersDropdownComponent implements OnChanges  {
//   @Input() users!: User[];
//
//   constructor(private cdr: ChangeDetectorRef) {}
//
//   ngOnChanges(changes: SimpleChanges) {
//     if ('users' in changes) {
//       this.cdr.detectChanges();
//     }
//   }
// }
