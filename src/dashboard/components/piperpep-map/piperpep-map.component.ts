import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DialogConfirmComponent } from 'src/dashboard/file-submission/dialog-confirm/dialog-confirm.component';
import { PeptideService } from 'src/services/peptide.service';
import { SubmissionService } from 'src/services/submission/submission.service';

@Component({
  selector: 'app-piperpep-map',
  templateUrl: './piperpep-map.component.html',
  styleUrls: ['./piperpep-map.component.scss']
})
export class PiperpepMapComponent implements OnInit {

  showFirstTable: boolean = false;
  showSecondTable: boolean = false;
  displayedColumns = ['accession', 'peptideSequence', 'score', 'peptidelength', 'avgMass', 'peptideModification'];
  mapDisplayedColumns = ['peptide', 'geneId', 'geneStart', 'geneEnd', 'chrom', 'genomicStart', 'genomicEnd', 'transcriptId', 'description'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  mapDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorMap') paginatorMap!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: boolean = false;

  peptide_Form = this.fb.group({
    categ_pep: ['Peptide sequence', Validators.required],
    search_pep: [
      '',
      [Validators.required] // No spaces allowed  Validators.pattern(/^\S*$/)
    ]
  })


  constructor(
    private fb: FormBuilder,
    private peptide: PeptideService,
    private submission: SubmissionService,
    private toast: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.mapDataSource.paginator = this.paginatorMap;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.mapDataSource.paginator = this.paginatorMap;
    this.dataSource.sort = this.sort;
  }


  files1: any = [];
  uploadedFiles: File[] = [];
  isDragOver: boolean = false;
  ArrayFile: any = [];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      if (droppedFiles[0].type == 'text/csv') {
        droppedFiles.forEach((file) => {
          const reader = new FileReader();

          // Convert file to Base64
          reader.onload = (e: ProgressEvent<FileReader>) => {
            let base64String = e.target?.result ?? null;
            if (typeof base64String === 'string') {
              base64String = base64String.replace(/^data:text\/csv;base64,/, '');
            }
            this.files1 = [{ file, base64: base64String }];
            this.ArrayFile = this.files1.map((ite: { base64: any; file: { name: any; }; }) => {
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
      else {
        this.toast.warning('Allow CSV Format')
      }
    }
  }



  onDragLeave(): void {
    this.isDragOver = false;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const selectedFiles = Array.from(input.files);
      if (selectedFiles[0].type == 'text/csv') {
        selectedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
            let base64String = e.target?.result ?? null;
            if (typeof base64String === 'string') {
              base64String = base64String.replace(/^data:text\/csv;base64,/, '');
            }
            this.files1 = [{ file, base64: base64String }];
            console.log('this.files1: ', this.files1);

            this.ArrayFile = this.files1.map((ite: { base64: any; file: { name: any; }; }) => {
              return {
                userId: localStorage.getItem('userId'),
                files: ite.base64,
                filenames: ite.file.name
              };
            });
            console.log(' this.files1: ', this.ArrayFile);
          };

          reader.readAsDataURL(file);
        });
      } else {
        this.toast.warning('Allow CSV Format')
      }

      input.value = '';
    }
  }
  mapData() {
    this.uploadFiles();
    this.getAnotherData();
  }

  uploadFiles(): void {
    // if (this.peptide_Form.value.search_pep != null || this.ArrayFile.length != 0) {
    //   setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    //   this.mapDataSource.paginator = this.paginatorMap;
    // }, 1000);
    this.isLoading = true;
    var mailRequest = {};
    if (this.peptide_Form?.value?.search_pep) {
      mailRequest = {
        "sequence": this.peptide_Form?.value?.search_pep?.trim() || ''
      }
    } else {
      mailRequest = {
        "base64": this.ArrayFile[0].files,
      }
    }

    this.peptide.uploadMapTool(mailRequest).subscribe((result: any) => {
      if (result.message == "Mapping completed") {
        this.toast.success(result.message)
        this.showSecondTable = true;
        this.ArrayFile = []
        this.files1 = [];
        this.mapDataSource.data = result.results;
        console.log('this.mapDataSource.data: ', this.mapDataSource.data);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.toast.error(result.message)
      }

    }, (error) => {
      this.toast.error(error.message)
      this.isLoading = false;
    })
    // }

  }

  cancels: boolean[] = []
  over(i: number) {
    this.cancels[i] = true;
  }

  leave(i: number) {
    this.cancels[i] = false;
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

  getAnotherData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.mapDataSource.paginator = this.paginatorMap;
    }, 1000);
    if (this.peptide_Form.valid) {
      this.isLoading = true;
      if (this.peptide_Form.value.categ_pep != null && this.peptide_Form.value.search_pep != null) {
        this.peptide.getPeptide(this.peptide_Form.value.categ_pep, this.peptide_Form.value.search_pep.trim(), 'equal').subscribe((data: any[]) => {
          // this.showFirstTable = true;
          this.showSecondTable = true;
          if (data.length > 0) {
            this.dataSource.data = data;
            this.peptide_Form.reset();
            this.peptide_Form.get('categ_pep')?.setValue('Peptide sequence')
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          } else {
            this.dataSource.data = [];
            setTimeout(() => {
              this.isLoading = false;
            }, 500);
          }
        })
      }

    }
  }

  cancel() {
    this.showFirstTable = false;
    this.showSecondTable = false;
  }
}
