import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from "../../services/image-upload.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('uploadButton') uploadButton?: ElementRef;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  preview = '';

  imageInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) {}

  handleFileInput(event: any): void {
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);

        setTimeout(() => {
          if (this.uploadButton) {
            this.uploadButton.nativeElement.click();
          }
        }, 0);
      }
    }
  }

  upload(): void {
    this.progress = 0;

    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;
          this.currentFile = undefined;
        },
      });

      this.selectedFiles = undefined;
    }
  }

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }
}
