import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models';
import { FormControl } from '@angular/forms';
import { Subject, map, pairwise, startWith, switchMap, tap } from 'rxjs';
import { StorageItem } from '../../models/storage-item';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-users-dropdown',
  templateUrl: './usersDropdown.component.html',
  styleUrls: ['./usersDropdown.component.css'],
})
export class UsersDropdownComponent implements OnInit, AfterViewInit {
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
}
