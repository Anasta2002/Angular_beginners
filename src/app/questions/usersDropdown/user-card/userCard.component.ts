import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './userCard.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() result!: any;

  constructor() {
    console.log('result in the card', this.result)
  }
}
