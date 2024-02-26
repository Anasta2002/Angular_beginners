import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FileUploadService} from "../../services/upload.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-image-component',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './image-component.component.html',
  styleUrl: './image-component.component.css'
})
export class ImageComponentComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;

  @ViewChild('uploadedImage') uploadedImage: ElementRef | undefined;

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
    if (this.uploadedImage && this.imageUrl !== null) {
      this.uploadedImage.nativeElement.src = this.imageUrl;
    }
  }

  onUploadAnother(): void {
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
  }

  onDelete(): void {
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
  }
}
