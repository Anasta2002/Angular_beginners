import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { ButtonComponent } from '../components/button/button.component';
import { InputsComponent } from '../components/inputs/inputs.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentDialogComponent } from '../components/dialog-window/dialog-window.component';


interface Language {
  id: number;
  viewValue: string;
  icon: string;
}

@Component({
  selector: 'app-order-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    ButtonComponent,
    InputsComponent,
  ],
  templateUrl: './order-registration.component.html',
  styleUrl: './order-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderRegistrationComponent  {
  private formBuilder = inject(FormBuilder);
  private cd = inject(ChangeDetectorRef);

  submitedNumbers = '';

  constructor(private dialog: MatDialog) {}

  showHiddenInputs = false;
  showQRscan = true;
  registrationForm = this.formBuilder.group({
    customerNumber: '',
    orderNumber: '',
  })

  showInputs() {
    this.showHiddenInputs = !this.showHiddenInputs;
    this.showQRscan = !this.showQRscan;
    this.cd.markForCheck();
  }

  languages: Language[] = [
    { id: 1, viewValue: 'Deutsch', icon: 'assets/flags/de.svg' },
    { id: 2, viewValue: 'English', icon: 'assets/flags/us.svg' },
    { id: 3, viewValue: 'Français', icon: 'assets/flags/fr.svg' },
    { id: 4, viewValue: 'Türkçe', icon: 'assets/flags/tr.svg' },
    { id: 5, viewValue: 'Русский', icon: 'assets/flags/ru.svg' },
  ];

  onButtonClicked(id: number) {
    console.log("Selected button id:", id);
  }

  submitAndOpenDialog() {
    const dialogRef = this.dialog.open(DialogContentDialogComponent, {
      data: {
        formData: this.registrationForm.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
