import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { RawUser, User } from '../../models';
import { FormControl } from '@angular/forms';
import { debounceTime, map, merge, of, Subject, switchMap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './users-dropdown.component.html',
  styleUrls: ['./users-dropdown.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDropdownComponent implements OnInit {
  searchControl = new FormControl('');

  onClick$: Subject<string> = new Subject();
  search$: Subject<string> = new Subject();

  private savedUser = new StorageItem<RawUser>('selected-user');
  private usersService = inject(UsersService);

  get user(): User | null {
    const saved = this.savedUser.get();
    return saved ? new User(saved) : null;
  }

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

  ngOnInit(): void {
    const savedUser = this.user;

    if (savedUser) {
      this.searchControl.setValue(savedUser.name);
    }
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
}
