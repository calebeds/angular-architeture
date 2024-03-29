import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent implements OnInit {
  isHovering = false;

  files: File[] = [];
  imageFile!: File | false;
  isError = false;

  fileUrls: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList | null): void {
    this.isError = false;

    if (this.data.crop && files && files?.length > 1) {
      this.isError = true;
      return;
    }

    if (
      this.data.crop &&
      files?.length === 1 &&
      files.item(0)?.type.split('/')[0] === 'image'
    ) {
      this.imageFile = files.item(0) as File;
      return;
    }

    for (let i = 0; i < files!.length; i++) {
      const file = files?.item(i);
      if (file) this.files.push(file);
    }

    console.log(files);
  }

  onUploadComplete(url: string): void {
    this.fileUrls.push(url);
  }

  eventToFileList($event: Event): FileList | null {
    const files = ($event.target as HTMLInputElement).files;
    return files;
  }

  onCrop(file: File): void {
    this.imageFile = false;
    this.files.push(file);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onComplete(): void {
    const res = this.data.multiple ? this.fileUrls : this.fileUrls[0];
    this.dialogRef.close(res);
  }
}
