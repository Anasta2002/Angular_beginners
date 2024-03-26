import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    CommonModule,
    NgOtpInputModule
  ],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
})
export class InputsComponent implements AfterViewInit {
  otp: string | null = '';
  showSecondInput = false;

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  config = {
    allowNumbersOnly: true,
    length: 8,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputClass: "ogs-otp-input",
    inputStyles: {
      'width': '70px',
      'height': '70px',
    }
  };
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  private _getFirstEmptyInput(inputs: NodeListOf<HTMLInputElement>, currentInputKey: number): null | HTMLInputElement {
    let firstEmptyInput: HTMLInputElement | null = null;

    for (let i = currentInputKey - 1; i >= 0; i--) {
      const currentInput: HTMLInputElement | undefined = inputs[i];

      if (currentInput === undefined) break;

      if (currentInput.value === "") firstEmptyInput = currentInput;
    }

    return firstEmptyInput;
  }

  private _applyHotfixToInputs(querySelector: string): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(querySelector);

    inputs.forEach((input: HTMLInputElement, key: number): void => {
      input.addEventListener("focus", (): void => {
        const firstEmptyInput: HTMLInputElement | null = this._getFirstEmptyInput(inputs, key);

        if (firstEmptyInput === null) return;

        firstEmptyInput.focus();
      });
    });
  }

  public ngAfterViewInit(): void {
    this._applyHotfixToInputs(".container__order .ogs-otp-input");
    this._applyHotfixToInputs(".container__driver .ogs-otp-input");
  }
}