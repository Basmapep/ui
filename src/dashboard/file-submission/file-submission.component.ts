import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SubmissionService } from 'src/services/submission/submission.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface UploadedFile {
  [x: string]: any;
  file: File;
  base64: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-file-submission',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-submission.component.html',
  styleUrls: ['./file-submission.component.scss']
})
export class FileSubmissionComponent implements OnInit {
  isLoading: boolean = false;
  fileForm!: FormGroup;
  // files: File[] = [];
  ArrayFile: any = [];
  userName: string = 'Samsudhan';
  emailId: string = 'samsudhan23@gmail.com';
  phoneNo: number = 9865927380;
  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private submission: SubmissionService) {
    this.fileForm = this.fb.group({
      message: ['']
    })
  }
  ngOnInit(): void {
  }

  // onFileChange(pFileList: any){
  //   this.files = Object.keys(pFileList).map(key => pFileList[key]);
  //   this._snackBar.open("Successfully upload!", 'Close', {
  //     duration: 2000,
  //   });
  // }
  // nameFile: any = '';
  // onFileChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.files = Array.from(input.files);
  //     this.cdr.detectChanges(); // Manually trigger change detection
  //   }
  // }



  // deleteFile(f: any) {
  //   this.files = this.files.filter(function (w) { return w.name != f.name });
  //   this._snackBar.open("Successfully delete!", 'Close', {
  //     duration: 2000,
  //   });
  // }



  files1: UploadedFile[] = [];
  uploadedFiles: File[] = [];
  isDragOver: boolean = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);

      droppedFiles.forEach((file) => {
        const reader = new FileReader();

        // Convert file to Base64
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64String = e.target?.result ?? null;
          this.files1.push({ file, base64: base64String });
          this.ArrayFile = this.files1.map(ite => {
            return {
              userId: localStorage.getItem('userId'),
              files: ite.base64,
              filenames: ite.file.name
            };
          });
        };

        reader.readAsDataURL(file);
      });
    }
  }



  onDragLeave(): void {
    this.isDragOver = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files);

      selectedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const base64String = e.target?.result ?? null;
          this.files1.push({ file, base64: base64String });
          this.ArrayFile = this.files1.map(ite => {
            return {
              userId: localStorage.getItem('userId'),
              files: ite.base64,
              filenames: ite.file.name
            };
          });
        };

        reader.readAsDataURL(file);
      });

      input.value = '';
    }
  }


  uploadFiles(): void {
    this.isLoading = true;
    const mailRequest = {
      "fileData": this.ArrayFile,
      message: `${'Hi Admin' + ' ' + this.fileForm.get('message')?.value}`
    }

    this.submission.uploadSubmission(mailRequest).subscribe((result: any) => {
      if (result.status == "success") {
        this.toast.success(result.message)
        this.ArrayFile = []
        this.files1 = [];
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.toast.error(result.message)
      }

    }, (error) => {
      this.toast.error(error.message)
      this.isLoading = false;
    })


  }
  cancel: boolean[] = []
  over(i: number) {
    this.cancel[i] = true;
  }

  leave(i: number) {
    this.cancel[i] = false;
  }


  openConfirmDialog(pIndex: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs'
    });
    dialogRef.componentInstance.fName = this.files1[pIndex].file.name;
    dialogRef.componentInstance.fIndex = pIndex;


    dialogRef.afterClosed().subscribe((result: undefined) => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index: any) {
    this.files1.splice(index, 1);
  }
  selectedFile: any = null;
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0]; // Get the first file


    const formData = new FormData();
    // formData.append('userId', userId);
    formData.append('file', this.selectedFile);
  }
}
