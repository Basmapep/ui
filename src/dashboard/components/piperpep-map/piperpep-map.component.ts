import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeptideService } from 'src/services/peptide.service';

@Component({
  selector: 'app-piperpep-map',
  templateUrl: './piperpep-map.component.html',
  styleUrls: ['./piperpep-map.component.scss']
})
export class PiperpepMapComponent implements OnInit {

  showTable: boolean = false;

  displayedColumns = ['accession', 'peptideSequence', 'score', 'peptidelength', 'avgMass', 'peptideModification'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAnotherData() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    },1000);
    if (this.peptide_Form.valid) {
      this.isLoading = true;
      if (this.peptide_Form.value.categ_pep != null && this.peptide_Form.value.search_pep != null) {
        this.peptide.getPeptide(this.peptide_Form.value.categ_pep, this.peptide_Form.value.search_pep.trim(),'equal').subscribe((data: any[]) => {
          this.showTable = true;
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
    this.showTable = false;
  }
}
