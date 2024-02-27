import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css'],
})
export class ImageComponentComponent implements AfterViewInit {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;

  imageForm: FormGroup;

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private fb: FormBuilder) {
    this.imageForm = this.fb.group({
      img: [''],
    });
  }

  ngAfterViewInit(): void {
    this.updateImage();
  }

  onChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
        this.updateImage();
      };

      reader.readAsDataURL(file);
    }
  }

  private updateImage(): void {
    if (this.imgInput) {
      this.imgInput.nativeElement.src = this.imageUrl || '';
    }
  }

  onUploadAnother(): void {
    console.log('Upload Another called');
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
    this.imageForm.reset(); // Reset the form
    console.log('Form reset:', this.imageForm.value);
  }

  onDelete(): void {
    console.log('Delete called');
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
    this.imageForm.reset(); // Reset the form
    console.log('Form reset:', this.imageForm.value);
  }
}
