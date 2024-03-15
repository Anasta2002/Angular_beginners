import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RawUser, User } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  map,
  merge,
  of,
  Subject,
  switchMap,
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { StorageItem } from '../../models/storage-item';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDropdownComponent implements OnInit {
  private usersService = inject(UsersService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  private savedUser = new StorageItem<RawUser>('selected-user');

  testValue: string = '';

  userForm = new FormGroup({
    name: new FormControl('', (formControl) => {
      if (formControl.value.length !== 5) {
        return {
          size: 'must be greater than 5',
        };
      }

      return null;
    }),
    age: new FormControl(100),
    postcode: new FormControl(''),
  });

  searchControl = new FormControl('');
  onClick$: Subject<string> = new Subject();
  loading$: Observable<boolean> = this.usersService.loading$;
  totalUsers: number | null = null;

  users$ = merge(
    this.searchControl.valueChanges.pipe(debounceTime(300)),
    this.onClick$
  ).pipe(
    switchMap((search) => {
      if (search === this.user?.name) {
        return of([new User(this.user.rawUser)]);
      }

      return this.usersService
        .getUsers({
          search: search ?? '',
        })
        .pipe(map((response) => response.users.map((user) => new User(user))));
    })
  );

  get user(): User | null {
    const saved = this.savedUser.get();
    return saved ? new User(saved) : null;
  }

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    const savedUser = this.user;

    if (savedUser) {
      this.searchControl.setValue(savedUser.name);
    }

    this.usersService.getUsers().subscribe((users) => {
      const firstUser = users.users.at(0);

      if (firstUser) {
        // this.userForm.controls.name.setValue(firstUser.first_name);
      }
    });
  }

  click(event: MouseEvent) {
    (event.target as HTMLInputElement).select();

    this.onClick$.next(this.searchControl.value ?? '');
  }

  selectUser(user: RawUser) {
    this.searchControl.setValue(`${user.first_name} ${user.last_name}`, {
      emitEvent: false,
    });
    this.savedUser.save(user);
  }

  deleteCard() {
    this.savedUser.delete();
  }

  submitForm(): void {
    console.log(this.userForm.value);
  }
}
