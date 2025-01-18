import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeptideService } from 'src/services/peptide.service';
@Component({
  selector: 'app-blast-basma',
  templateUrl: './blast-basma.component.html',
  styleUrls: ['./blast-basma.component.scss']
})
export class BlastBasmaComponent implements OnInit {


  displayedColumns = ['accession', 'peptideSequence', 'score', 'peptidelength', 'avgMass', 'peptideModification'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: boolean = false;
  blastData: any;
  peptide_Form = this.fb.group({
    blastSequence: [
      '',
      [Validators.required, Validators.pattern(/^\S*$/)] // No spaces allowed
    ]
  })


  constructor(
    private fb: FormBuilder,
    private peptide: PeptideService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAnotherData() {
    if (this.peptide_Form.valid) {
      this.isLoading = true;
      if (this.peptide_Form.value.blastSequence != null) {
        this.peptide.getBlastData(this.peptide_Form.value.blastSequence).subscribe(
          (data: string) => {
            this.blastData = data;
            this.isLoading = false;
            this.peptide_Form.reset();
          },
          (error) => {
            console.error('Error fetching BLAST data:', error);
          }
        );
      }
    }
  }

  cancel() {
  }

}
